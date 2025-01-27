import type { TimeTable } from '$lib/state/timetable.svelte';

export const getGrades = (timetable: Pick<TimeTable, 'lessons'>): Set<string> => {
  const gradesSet = new Set<string>();
  Object.values(timetable.lessons).forEach((lesson) => {
    gradesSet.add(lesson.className);
  });
  return gradesSet;
};
