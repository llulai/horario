import { lessons, type Lesson } from '$lib/state/Timetable.svelte';
import type { AvailableTimeslots } from './Availability.svelte';

type Tag = 'priority' | 'conflict' | 'low-availability' | 'completed';
type Tags = Record<string, Tag[]>;

const reduceSum = (a: number, b: number): number => a + b;

const isAssigned = (lesson: Lesson): boolean => lesson.timeslot !== null;
const allLecturesAssigned = (lessons: Lesson[]): boolean => lessons.every(isAssigned);

export const isConflict = (availability: AvailableTimeslots): boolean =>
  Object.values(availability)
    .map((dayAvailability) => Object.values(dayAvailability).map(Number).reduce(reduceSum))
    .reduce(reduceSum) === 0;

const getTags = (kind: 'teachers' | 'grades'): Tags => {
  const tags: Tags = {};

  if (kind === 'teachers') {
    Object.keys(lessons.byTeacher).forEach((teacher) => {
      tags[teacher] = [];
    });

    // set completed tags
    for (const [teacherName, teacherLessons] of Object.entries(lessons.byTeacher)) {
      if (allLecturesAssigned(teacherLessons)) {
        tags[teacherName].push('completed');
      }
    }

    // set conflict tags
  }

  return tags;
};

export const getTeachersTags = (): Tags => {
  return getTags('teachers');
};
export const getClassesTags = (): Tags => {
  return getTags('grades');
};
