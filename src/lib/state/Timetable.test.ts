import { expect, test } from 'vitest';
import { blockedTimeslots, lessons, timetable, subjects } from '$lib/state/Timetable.svelte';

test('fromWeeklyLoad function creates lessons and maps them correctly', () => {
  const weeklyLoads = [
    { gradeName: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { gradeName: '2A', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 },
    { gradeName: '2B', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { gradeName: '2B', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 },
    { gradeName: '3A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { gradeName: '3A', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 }
  ];

  const maxBlocks = 3;

  timetable.fromWeeklyLoad(weeklyLoads, maxBlocks);

  expect(Object.keys(lessons.list)).toHaveLength(15);
  expect(Object.keys(subjects.list)).toHaveLength(2);
  expect(Object.keys(blockedTimeslots.list)).toHaveLength(0);
});

test('timetable implements setLessonTimeslot correctly', () => {
  const weeklyLoads = [
    { gradeName: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 }
  ];

  const maxBlocks = 3;

  timetable.fromWeeklyLoad(weeklyLoads, maxBlocks);

  const lessonId = lessons.list[0].id;

  lessons.dispatch({
    event: 'setLessonTimeslot',
    payload: { lessonId, timeslot: [1, 1, [8, 0], [8, 45]] }
  });

  expect(lessons.byId[lessonId].timeslot).toEqual([1, 1]);
});

test('timetable implements removeLessonTimeslot correctly', () => {
  // setup
  const weeklyLoads = [
    { gradeName: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 }
  ];

  const maxBlocks = 3;

  timetable.fromWeeklyLoad(weeklyLoads, maxBlocks);

  // send dispatch action
  const lessonId = lessons.list[0].id;
  lessons.dispatch({
    event: 'setLessonTimeslot',
    payload: { lessonId, timeslot: [1, 1, [8, 0], [8, 45]] }
  });

  // assert
  expect(lessons.byId[lessonId].timeslot).toEqual([1, 1]);

  lessons.dispatch({ event: 'removeLessonTimeslot', payload: { lessonId } });
  expect(lessons.byId[lessonId].timeslot).toBeNull();
});
