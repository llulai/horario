import { expect, test } from 'vitest';
import { blockedTimeslots, lessons, timetable, subjects, Time } from '$lib/state/Timetable.svelte';

test('fromWeeklyLoad function creates lessons and maps them correctly', () => {
  const weeklyLoads = [
    { gradeName: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { gradeName: '2A', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 },
    { gradeName: '2B', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { gradeName: '2B', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 },
    { gradeName: '3A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { gradeName: '3A', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 }
  ];

  const rawGrades = [
    { name: '2A', code: '2A', periodId: 'tarde' },
    { name: '2B', code: '2B', periodId: 'tarde' },
    { name: '3A', code: '3A', periodId: 'tarde' }
  ];

  const rawSubjects = [
    { name: 'MAT', code: 'MAT' },
    { name: 'LEN', code: 'LEN' }
  ];

  timetable.fromWeeklyLoad(weeklyLoads, rawGrades, rawSubjects, true);

  expect(Object.keys(lessons.list)).toHaveLength(15);
  expect(Object.keys(subjects.list)).toHaveLength(2);
  expect(Object.keys(blockedTimeslots.list)).toHaveLength(0);
});

test('timetable implements setLessonTimeslot correctly', () => {
  const weeklyLoads = [
    { gradeName: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 }
  ];

  const rawGrades = [{ name: '2A', code: '2A', periodId: 'tarde' }];

  const rawSubjects = [{ name: 'MAT', code: 'MAT' }];

  timetable.fromWeeklyLoad(weeklyLoads, rawGrades, rawSubjects, true);

  const lessonId = lessons.list[0].id;

  lessons.dispatch({
    event: 'setLessonTimeslot',
    payload: { lessonId, timeslot: [1, 1, new Time(8, 0), new Time(8, 45)] }
  });

  expect(lessons.byId[lessonId].timeslot).toEqual([1, 1, [8, 0], [8, 45]]);
});

test('timetable implements removeLessonTimeslot correctly', () => {
  // setup
  const weeklyLoads = [
    { gradeName: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 }
  ];

  const rawGrades = [{ name: '2A', code: '2A', periodId: 'tarde' }];

  const rawSubjects = [{ name: 'MAT', code: 'MAT' }];

  timetable.fromWeeklyLoad(weeklyLoads, rawGrades, rawSubjects, true);

  // send dispatch action
  const lessonId = lessons.list[0].id;
  lessons.dispatch({
    event: 'setLessonTimeslot',
    payload: { lessonId, timeslot: [1, 1, new Time(8, 0), new Time(8, 45)] }
  });

  // assert
  expect(lessons.byId[lessonId].timeslot).toEqual([1, 1, new Time(8, 0), new Time(8, 45)]);

  lessons.dispatch({ event: 'removeLessonTimeslot', payload: { lessonId } });
  expect(lessons.byId[lessonId].timeslot).toBeNull();
});
