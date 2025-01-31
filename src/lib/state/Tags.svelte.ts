import { lessons, type Lesson } from '$lib/state/Timetable.svelte';
import type { ByTimeslot } from './Availability.svelte';
import availability from './Availability.svelte';

type Tag = 'priority' | 'conflict' | 'low-availability' | 'completed';
type Tags = {
  byTeacher: Record<string, Tag[]>;
  byGrade: Record<string, Tag[]>;
};

const reduceSum = (a: number, b: number): number => a + b;

const isAssigned = (lesson: Lesson): boolean => lesson.timeslot !== null;
const allLecturesAssigned = (lessons: Lesson[]): boolean => lessons.every(isAssigned);

export const isConflict = (availability: ByTimeslot<boolean>): boolean =>
  Object.values(availability)
    .map((dayAvailability) => Object.values(dayAvailability).map(Number).reduce(reduceSum))
    .reduce(reduceSum) === 0;

const byTeacher = $derived.by(() => {
  const tagsByTeacher: Record<string, Tag[]> = {};

  Object.keys(lessons.byTeacher).forEach((teacher) => {
    tagsByTeacher[teacher] = [];
  });

  // set completed tags
  for (const [teacherName, teacherLessons] of Object.entries(lessons.byTeacher)) {
    if (allLecturesAssigned(teacherLessons)) {
      tagsByTeacher[teacherName].push('completed');
    }
  }

  // set priority tags

  for (const [teacherName, teacherLessons] of Object.entries(lessons.byTeacher)) {
    const teacherLoad = teacherLessons.reduce((sum) => sum + 1, 0);
    const teacherAvailability = Object.values(availability.byTeacher[teacherName]).reduce(
      (sum, dailyAvailability) =>
        sum +
        Object.values(dailyAvailability).reduce(
          (sum, periodAvailability) => sum + Number(periodAvailability),
          0
        ),
      0
    );

    if (teacherLoad / teacherAvailability > 0.75) {
      tagsByTeacher[teacherName].push('priority');
    }
  }

  return tagsByTeacher;
});

const byGrade = $derived.by(() => {
  const tagsByGrade: Record<string, Tag[]> = {};

  Object.keys(lessons.byGrade).forEach((grade) => {
    tagsByGrade[grade] = [];
  });

  // set completed tags
  for (const [gradeName, gradeLessons] of Object.entries(lessons.byGrade)) {
    if (allLecturesAssigned(gradeLessons)) {
      tagsByGrade[gradeName].push('completed');
    }
  }

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
