import { expect, test } from 'vitest';

import { getTeachersTags, isConflict } from './tags';
import type { Availability, TimeTable } from '$lib/state/timetable.svelte';
import { Timeslot } from '$lib/state/_old_timetable.svelte';

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

const lessonC = {
  id: 'c',
  teacherName: 'Viviana',
  className: '2A',
  subjectName: 'Matemática',
  timeslot: null
} as const;

const lessonD = {
  id: 'd',
  teacherName: 'Liliana',
  className: '2A',
  subjectName: 'Lenguaje',
  timeslot: [2, 1]
} as const;

const lessonE = {
  id: 'e',
  teacherName: 'Liliana',
  className: '2A',
  subjectName: 'Lenguaje',
  timeslot: [2, 2]
} as const;

const lessonF = {
  id: 'f',
  teacherName: 'Viviana',
  className: '2A',
  subjectName: 'Matemática',
  timeslot: [3, 1]
} as const;

const lessonG = {
  id: 'g',
  teacherName: 'Viviana',
  className: '2A',
  subjectName: 'Matemática',
  timeslot: [3, 2]
} as const;

const lessonH = {
  id: 'h',
  teacherName: 'Viviana',
  className: '2A',
  subjectName: 'Matemática',
  timeslot: [4, 1]
} as const;

const lessonI = {
  id: 'i',
  teacherName: 'Viviana',
  className: '2A',
  subjectName: 'Matemática',
  timeslot: [4, 2]
} as const;

const lessonJ = {
  id: 'j',
  teacherName: 'Liliana',
  className: '2A',
  subjectName: 'Lenguaje',
  timeslot: null
} as const;

const teacherMap = {
  Liliana: {
    availableTimeslots: {
      1: { 1: true, 2: true },
      2: { 1: true, 2: true },
      3: { 1: true, 2: true },
      4: { 1: true, 2: true },
      5: { 1: true, 2: true }
    }
  },
  Vivivana: {
    availableTimeslots: {
      1: { 1: true, 2: true },
      2: { 1: true, 2: true },
      3: { 1: true, 2: true },
      4: { 1: true, 2: true },
      5: { 1: true, 2: true }
    }
  }
};

test('getTeachersTags function returns completed tags for teachers', () => {
  const timetable: Pick<TimeTable, 'lessons' | 'teacherMap'> = {
    lessons: {
      a: lessonA,
      b: lessonB,
      c: lessonC
    },
    teacherMap
  };

  const teachersTags = getTeachersTags(timetable);

  expect(teachersTags['Liliana']).toContain('completed');
  expect(teachersTags['Viviana']).not.toContain('completed');
});

test('isConflict function returns true for conflicting lessons', () => {
  const availabilityWithConflict: Availability = {
    1: { 1: false, 2: false },
    2: { 1: false, 2: false },
    3: { 1: false, 2: false },
    4: { 1: false, 2: false },
    5: { 1: false, 2: false }
  };

  const availabilityWithNoConflict: Availability = {
    1: { 1: true, 2: true },
    2: { 1: false, 2: false },
    3: { 1: true, 2: true },
    4: { 1: true, 2: true },
    5: { 1: true, 2: true }
  };

  expect(isConflict(availabilityWithConflict)).toBe(true);
  expect(isConflict(availabilityWithNoConflict)).not.toBe(true);
});

// test('getTeachersTags function returns conflict tags for teachers', () => {
//   const timetable: Pick<TimeTable, 'lessons' | 'teacherMap'> = {
//     lessons: {
//       a: lessonA,
//       b: lessonB,
//       c: lessonC,
//       d: lessonD,
//       e: lessonE,
//       f: lessonF,
//       g: lessonG,
//       h: lessonH,
//       i: lessonI,
//       j: lessonJ
//     },
//     teacherMap
//   };
//
//   const teachersTags = getTeachersTags(timetable);
//
//   expect(teachersTags['Liliana']).toContain('conflict');
//   expect(teachersTags['Viviana']).not.toContain('conflict');
// });
