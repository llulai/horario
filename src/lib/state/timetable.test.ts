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

  const initialAvailability = {
    1: { 1: true, 2: true, 3: true },
    2: { 1: true, 2: true, 3: true },
    3: { 1: true, 2: true, 3: true },
    4: { 1: true, 2: true, 3: true },
    5: { 1: true, 2: true, 3: true }
  };

  timetable.fromWeeklyLoad(weeklyLoads, maxPeriods);

  const { lessons, classMap, teacherMap, subjectMap } = timetable;

  expect(Object.keys(lessons)).toHaveLength(15);
  expect(Object.keys(classMap)).toHaveLength(3);
  expect(Object.keys(teacherMap)).toHaveLength(2);
  expect(Object.keys(subjectMap)).toHaveLength(2);

  Object.values(classMap).forEach((classGroup) => {
    expect(classGroup.availableTimeslots).toEqual(initialAvailability);
  });

  Object.values(teacherMap).forEach((teacher) => {
    expect(teacher.availableTimeslots).toEqual(initialAvailability);
  });
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
    payload: { lessonId, timeslot: { day: 1, period: 1 } }
  });

  expect(timetable.lessons[lessonId].timeslot).toEqual({ day: 1, period: 1 });
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
    payload: { lessonId, timeslot: { day: 1, period: 1 } }
  });

  // assert
  expect(timetable.lessons[lessonId].timeslot).toEqual({ day: 1, period: 1 });

  timetable.dispatch({ event: 'removeLectureTimeslot', payload: { lessonId } });
  expect(timetable.lessons[lessonId].timeslot).toBeNull();
});
