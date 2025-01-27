import { expect, test } from 'vitest';
import timetable from './timetable.svelte';

test('fromWeeklyLoad function creates lessons and maps them correctly', () => {
  const weeklyLoads = [
    { className: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { className: '2A', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 },
    { className: '2B', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { className: '2B', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 },
    { className: '3A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 },
    { className: '3A', teacherName: 'Liliana', subjectName: 'LEN', weeklyLoad: 3 }
  ];

  const maxPeriods = 3;

  timetable.fromWeeklyLoad(weeklyLoads, maxPeriods);

  const { lessons, classMap, subjectMap, blockedTimeslots } = timetable;

  expect(Object.keys(lessons)).toHaveLength(15);
  expect(Object.keys(classMap)).toHaveLength(3);
  expect(Object.keys(subjectMap)).toHaveLength(2);
  expect(Object.keys(blockedTimeslots)).toHaveLength(0);
});

test('timetable implements setLessonTimeslot correctly', () => {
  const weeklyLoads = [
    { className: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 }
  ];

  const maxPeriods = 3;

  timetable.fromWeeklyLoad(weeklyLoads, maxPeriods);

  const lessonId = Object.values(timetable.lessons)[0].id;

  timetable.dispatch({
    event: 'setLectureTimeslot',
    payload: { lessonId, timeslot: [1, 1] }
  });

  expect(timetable.lessons[lessonId].timeslot).toEqual([1, 1]);
});

test('timetable implements removeLessonTimeslot correctly', () => {
  // setup
  const weeklyLoads = [
    { className: '2A', teacherName: 'Viviana', subjectName: 'MAT', weeklyLoad: 2 }
  ];

  const maxPeriods = 3;

  timetable.fromWeeklyLoad(weeklyLoads, maxPeriods);

  // send dispatch action
  const lessonId = Object.values(timetable.lessons)[0].id;
  timetable.dispatch({
    event: 'setLectureTimeslot',
    payload: { lessonId, timeslot: [1, 1] }
  });

  // assert
  expect(timetable.lessons[lessonId].timeslot).toEqual([1, 1]);

  timetable.dispatch({ event: 'removeLectureTimeslot', payload: { lessonId } });
  expect(timetable.lessons[lessonId].timeslot).toBeNull();
});
