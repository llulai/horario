import type { Availability, Lesson, TimeTable } from '$lib/state/timetable.svelte';
import _ from 'underscore';
import { byTeacher } from './teachers';

type Tag = 'priority' | 'conflict' | 'low-availability' | 'completed';

type DayAvailability = Availability[keyof Availability];

type Tags = Record<string, Tag[]>;

const sum = (numbers: number[]): number => numbers.reduce((a, b) => a + b, 0);

const isAssigned = (lesson: Lesson): boolean => lesson.timeslot !== null;
const allLecturesAssigned = (lessons: Lesson[]): boolean => lessons.every(isAssigned);

const numberOfAvailableSlotsOnDay = _.compose(sum, _.partial(_.map, _, Number), _.values);
const numberOfAvailableSlots = _.compose(sum, _.partial(_.map, _, numberOfAvailableSlotsOnDay));

export const isConflict = (availability: Availability): boolean =>
  numberOfAvailableSlots(availability) === 0;

const combineAvailability = (
  availabilityA: Availability,
  availability: Availability
): Availability => {
  const combinedAvailability: Availability = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {}
  };

  const days = [1, 2, 3, 4, 5] as const;
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

  days.forEach((day) => {
    periods.forEach((period) => {
      combinedAvailability[day][period] = availabilityA[day][period] && availability[day][period];
    });
  });

  return combinedAvailability;
};

const getTags = ({
  _for,
  timetable
}:
  | {
      _for: 'teacher';
      timetable: Pick<TimeTable, 'lessons' | 'teacherMap' | 'classMap'>;
    }
  | { _for: 'class'; timetable: Pick<TimeTable, 'lessons' | 'classMap'> }): Tags => {
  const tags: Tags = {};

  if (_for === 'teacher') {
    const lessonsByTeacher = byTeacher(timetable.lessons);

    Object.keys(lessonsByTeacher).forEach((teacherName) => {
      tags[teacherName] = [];
    });

    // set completed tags
    for (const [teacherName, lessons] of Object.entries(lessonsByTeacher)) {
      if (allLecturesAssigned(lessons)) {
        tags[teacherName].push('completed');
      }
    }

    // set conflict tags
  }

  return tags;
};

export const getTeachersTags = (timetable: Pick<TimeTable, 'lessons' | 'teacherMap'>): Tags => {
  return getTags({ _for: 'teacher', timetable });
};
export const getClassesTags = (timetable: Pick<TimeTable, 'lessons' | 'classMap'>): Tags => {};
