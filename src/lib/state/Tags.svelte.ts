import {
  blockedTimeslots,
  grades,
  lessons,
  periods,
  type Block,
  type Lesson
} from '$lib/state/Timetable.svelte';
import type { ByTimeslot } from './Availability.svelte';
import availability, { getByTimeslot } from './Availability.svelte';

type Tag = 'priority' | 'conflict' | 'low-availability' | 'completed';
type Tags = {
  byTeacher: Record<string, Set<Tag>>;
  byGrade: Record<string, Set<Tag>>;
};

const reduceSum = (a: number, b: number): number => a + b;

const isAssigned = (lesson: Lesson): boolean => lesson.timeslot !== null;
const allLecturesAssigned = (lessons: Lesson[]): boolean => lessons.every(isAssigned);

export const isConflict = (availability: ByTimeslot<boolean>): boolean =>
  Object.values(availability)
    .map((dayAvailability) => Object.values(dayAvailability).map(Number).reduce(reduceSum))
    .reduce(reduceSum) === 0;

const byTeacher = $derived.by(() => {
  const tagsByTeacher: Record<string, Set<Tag>> = {};
  const availabilityByTeacher: Record<string, Record<string, ByTimeslot<boolean>>> = {};

  Object.keys(lessons.byTeacher).forEach((teacher) => {
    // set tabsByTeacher to initial state
    tagsByTeacher[teacher] = new Set<Tag>();

    // set availabilityByTeacher to initial state
    availabilityByTeacher[teacher] = {};
    Object.entries(periods.byTeacher[teacher]).forEach(([periodId, period]) => {
      const maxBlock = Object.keys(period).length as Block;
      availabilityByTeacher[teacher][periodId] = getByTimeslot(maxBlock, true);
    });

    // update availabilityByTeacher with blocked timeslots
    Object.entries(blockedTimeslots.byTeacher).forEach(([teacherName, blockedTimeslots]) => {
      blockedTimeslots.forEach((blockedTimeslot) => {
        const {
          periodId,
          timeslot: [day, block]
        } = blockedTimeslot;
        availabilityByTeacher[teacherName][periodId][day][block] = false;
      });
    });
  });

  // set completed tags
  for (const [teacherName, teacherLessons] of Object.entries(lessons.byTeacher)) {
    if (allLecturesAssigned(teacherLessons)) {
      tagsByTeacher[teacherName].add('completed');
    }
  }

  // set priority tags
  Object.entries(lessons.byTeacher).forEach(([teacherName, teacherLessons]) => {
    const availableSlotsByPeriod: Record<string, number> = {};
    const lessonsByPeriod: Record<string, number> = {};

    Object.keys(periods.byTeacher[teacherName]).forEach((periodId) => {
      lessonsByPeriod[periodId] = Object.values(teacherLessons).filter(
        (lesson) => grades.byName[lesson.gradeName].periodId === periodId
      ).length;
      availableSlotsByPeriod[periodId] = Object.values(
        availabilityByTeacher[teacherName][periodId]
      ).reduce(
        (sum, dailyAvailability) =>
          sum +
          Object.values(dailyAvailability).reduce(
            (sum, blockAvailability) => sum + Number(blockAvailability),
            0
          ),
        0
      );

      if (lessonsByPeriod[periodId] / availableSlotsByPeriod[periodId] > 0.75) {
        tagsByTeacher[teacherName].add('priority');
      }
    });
  });

  // set low-availability and conflict tags
  lessons.list.forEach((lesson: Lesson) => {
    const availableTimeslots = Object.values(availability.byLesson[lesson.id]).reduce(
      (sum, dailyAvailability) =>
        sum + Object.values(dailyAvailability).reduce((sum, block) => sum + Number(block), 0),
      0
    );

    if (availableTimeslots === 0 && !lesson.timeslot) {
      tagsByTeacher[lesson.teacherName].add('conflict');
    } else if (availableTimeslots <= 3 && !lesson.timeslot) {
      tagsByTeacher[lesson.teacherName].add('low-availability');
    }
  });

  return tagsByTeacher;
});

const byGrade = $derived.by(() => {
  const tagsByGrade: Record<string, Set<Tag>> = {};

  Object.keys(lessons.byGrade).forEach((grade) => {
    tagsByGrade[grade] = new Set();
  });

  // set completed tags
  for (const [gradeName, gradeLessons] of Object.entries(lessons.byGrade)) {
    if (allLecturesAssigned(gradeLessons)) {
      tagsByGrade[gradeName].add('completed');
    }
  }

  // set low-availability tags
  lessons.list.forEach((lesson: Lesson) => {
    const availableTimeslots = Object.values(availability.byLesson[lesson.id]).reduce(
      (sum, dailyAvailability) =>
        sum + Object.values(dailyAvailability).reduce((sum, block) => sum + Number(block), 0),
      0
    );

    if (availableTimeslots === 0 && !lesson.timeslot) {
      tagsByGrade[lesson.gradeName].add('conflict');
    } else if (availableTimeslots <= 3 && !lesson.timeslot) {
      tagsByGrade[lesson.gradeName].add('low-availability');
    }
  });

  return tagsByGrade;
});

export const tags: Tags = {
  get byTeacher() {
    return byTeacher;
  },
  get byGrade() {
    return byGrade;
  }
};
