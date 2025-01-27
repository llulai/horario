import type { TimeTable } from '$lib/state/timetable.svelte';
import _ from 'underscore';

export const byTeacher = _.partial(_.groupBy, _, 'teacherName');

export const getTeachers = (timetable: Pick<TimeTable, 'lessons'>): Set<string> => {
  const teacherSet = new Set<string>();
  Object.values(timetable.lessons).forEach((lesson) => {
    teacherSet.add(lesson.teacherName);
  });
  return teacherSet;
};
