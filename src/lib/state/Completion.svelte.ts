import { lessons } from '$lib/state/Timetable.svelte';

type Completion = {
  byTeacher: Record<string, [assigned: number, total: number]>;
  byGrade: Record<string, [assigned: number, total: number]>;
};

const byTeacher = $derived.by(() => {
  const completionByTeacher: Record<string, [assigned: number, total: number]> = {};

  // assign completion
  for (const [teacherName, teacherLessons] of Object.entries(lessons.byTeacher)) {
    const assigned = teacherLessons.filter((lesson) => lesson.timeslot).length;
    const load = teacherLessons.reduce((sum) => sum + 1, 0);

    completionByTeacher[teacherName] = [assigned, load];
  }

  return completionByTeacher;
});

const byGrade = $derived.by(() => {
  const completionByGrade: Record<string, [assigned: number, total: number]> = {};

  // assign completion
  for (const [gradeName, gradeLessons] of Object.entries(lessons.byGrade)) {
    const assigned = gradeLessons.filter((lesson) => lesson.timeslot).length;
    const total = gradeLessons.reduce((sum) => sum + 1, 0);

    completionByGrade[gradeName] = [assigned, total];
  }

  return completionByGrade;
});
export const completion: Completion = {
  get byTeacher() {
    return byTeacher;
  },
  get byGrade() {
    return byGrade;
  }
};
