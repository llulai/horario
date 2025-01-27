import { expect, test } from 'vitest';
import { byTeacher } from './teachers';
import type { TimeTable } from '$lib/state/timetable.svelte';

test('find lectures by teacher', async () => {
  const lessonA = {
    id: 'a',
    teacherName: 'Liliana',
    className: '2A',
    subjectName: 'Lenguaje',
    timeslot: [1, 1]
  } as const;
  const lessonB = {
    id: 'b',
    teacherName: 'Liliana',
    className: '2A',
    subjectName: 'Lenguaje',
    timeslot: [1, 2]
  } as const;

  const lessons: TimeTable['lessons'] = {
    a: lessonA,
    b: lessonB
  };

  const lessonsByTeacher = {
    Liliana: [lessonA, lessonB]
  };

  expect(byTeacher(lessons)).toEqual(lessonsByTeacher);
});
