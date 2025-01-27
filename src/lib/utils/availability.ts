import type { Day, Lesson, Period, TimeTable, BlockedTimeslot } from '$lib/state/timetable.svelte';
import { getGrades } from './grades';
import { getTeachers } from './teachers';

type Availability = Record<Day, Partial<Record<Period, boolean>>>;

const getFullDayAvailability = (maxPeriods: Period): Partial<Record<Period, boolean>> => {
  return new Object(
    Array(maxPeriods)
      .fill(true)
      .map((t, idx) => [(idx + 1) as Period, t])
  );
};

const getFullAvailability = (maxPeriods: Period): Availability => {
  return {
    1: getFullDayAvailability(maxPeriods),
    2: getFullDayAvailability(maxPeriods),
    3: getFullDayAvailability(maxPeriods),
    4: getFullDayAvailability(maxPeriods),
    5: getFullDayAvailability(maxPeriods)
  };
};

const combineAvailability = (
  availabilityA: Availability,
  availabilityB: Availability,
  maxPeriods: Period
): Availability => {
  const combinedAvailability: Availability = {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {}
  };

  const days = [1, 2, 3, 4, 5] as const;

  days.forEach((day) => {
    const availabilityADay = availabilityA[day];
    const availabilityBDay = availabilityB[day];

    if (availabilityADay && availabilityBDay) {
      for (let p = 1; p <= maxPeriods; p++) {
        combinedAvailability[day][p as Period] =
          availabilityADay[p as Period] && availabilityBDay[p as Period];
      }
    }
  });

  return combinedAvailability;
};

export const getAvailabilityByLesson = (
  timetable: Pick<TimeTable, 'lessons' | 'blockedTimeslots' | 'maxPeriods'>
): Record<string, Availability> => {
  const teachers = getTeachers(timetable);
  const availabilityByTeacher: Record<string, Availability> = {};
  const grades = getGrades(timetable);
  const availabilityByGrade: Record<string, Availability> = {};

  teachers.forEach((teacher) => {
    availabilityByTeacher[teacher] = getFullAvailability(timetable.maxPeriods);
  });

  grades.forEach((grade) => {
    availabilityByGrade[grade] = getFullAvailability(timetable.maxPeriods);
  });

  // mark assigned lectures as unavailable timeslots for teachers and classes
  Object.values(timetable.lessons).forEach((lesson: Lesson) => {
    const { className, teacherName, timeslot } = lesson;
    if (timeslot) {
      const [day, period] = timeslot;
      availabilityByTeacher[teacherName][day][period] = false;
      availabilityByGrade[className][day][period] = false;
    }
  });

  // mark blocked timeslots as unavailable timeslots for teachers and classes
  Object.values(timetable.blockedTimeslots).forEach((blockedTimeslot: BlockedTimeslot) => {
    const {
      kind,
      name,
      timeslot: [day, period]
    } = blockedTimeslot;

    if (kind === 'teacher') {
      availabilityByTeacher[name][day][period] = false;
    } else if (kind === 'class') {
      availabilityByGrade[name][day][period] = false;
    }
  });

  const availabilityByLesson: Record<string, Availability> = {};

  // combine teacher and class availability
  Object.values(timetable.lessons).forEach((lesson: Lesson) => {
    const { id, teacherName, className } = lesson;
    availabilityByLesson[id] = combineAvailability(
      availabilityByTeacher[teacherName],
      availabilityByGrade[className],
      timetable.maxPeriods
    );
  });

  return availabilityByLesson;
};
