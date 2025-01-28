import {
  type Day,
  type Lesson,
  type Period,
  type BlockedTimeslot,
  lessons,
  timetable,
  blockedTimeslots
} from '$lib/state/Timetable.svelte';

export type ByTimeslot<T> = Record<Day, Partial<Record<Period, T>>>;

////////////////
//// UTILS ////
//////////////

const getFullDayAvailability = <T>(maxPeriods: Period, fillWith: T): Partial<Record<Period, T>> => {
  return Object.fromEntries(
    Array(maxPeriods)
      .fill(fillWith)
      .map((t, idx) => [(idx + 1) as Period, t])
  );
};

export const getByTimeslot = <T>(maxPeriods: Period, fillWith: T): ByTimeslot<T> => {
  return {
    1: getFullDayAvailability(maxPeriods, fillWith),
    2: getFullDayAvailability(maxPeriods, fillWith),
    3: getFullDayAvailability(maxPeriods, fillWith),
    4: getFullDayAvailability(maxPeriods, fillWith),
    5: getFullDayAvailability(maxPeriods, fillWith)
  };
};

const combineAvailability = (
  availabilityA: ByTimeslot<boolean>,
  availabilityB: ByTimeslot<boolean>,
  maxPeriods: Period
): ByTimeslot<boolean> => {
  const combinedAvailability: ByTimeslot<boolean> = {
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

///////////////////////
//// AVAILABILITY ////
/////////////////////

type Availability = {
  byTeacher: Record<string, ByTimeslot<boolean>>;
  byGrade: Record<string, ByTimeslot<boolean>>;
  byLesson: Record<string, ByTimeslot<boolean>>;
};

const [byTeacher, byGrade, byLesson] = $derived.by<
  [Availability['byTeacher'], Availability['byGrade'], Availability['byLesson']]
>(() => {
  const availabilityByTeacher: Availability['byTeacher'] = {};
  const teachers = Object.keys(lessons.byTeacher);
  const availabilityByGrade: Availability['byTeacher'] = {};
  const grades = Object.keys(lessons.byGrade);
  const availabilityByLesson: Availability['byLesson'] = {};

  teachers.forEach((teacher) => {
    availabilityByTeacher[teacher] = getByTimeslot(timetable.maxPeriods, true);
  });

  grades.forEach((grade) => {
    availabilityByGrade[grade] = getByTimeslot(timetable.maxPeriods, true);
  });

  // mark assigned lectures as unavailable timeslots for teachers and classes
  lessons.list.forEach((lesson: Lesson) => {
    const { teacherName, gradeName, timeslot } = lesson;
    if (timeslot) {
      const [day, period] = timeslot;
      availabilityByTeacher[teacherName][day][period] = false;
      availabilityByGrade[gradeName][day][period] = false;
    }
  });

  // mark blocked timeslots as unavailable timeslots for teachers and classes
  blockedTimeslots.list.forEach((blockedTimeslot: BlockedTimeslot) => {
    const {
      kind,
      name,
      timeslot: [day, period]
    } = blockedTimeslot;

    if (kind === 'teacher') {
      availabilityByTeacher[name][day][period] = false;
    }
    if (kind === 'grade') {
      availabilityByGrade[name][day][period] = false;
    }
  });

  lessons.list.forEach((lesson: Lesson) => {
    const { id, teacherName, gradeName } = lesson;
    availabilityByLesson[id] = combineAvailability(
      availabilityByTeacher[teacherName],
      availabilityByGrade[gradeName],
      timetable.maxPeriods
    );
  });

  return [availabilityByTeacher, availabilityByGrade, availabilityByLesson];
});

const availability: Availability = {
  get byTeacher() {
    return byTeacher;
  },
  get byGrade() {
    return byGrade;
  },
  get byLesson() {
    return byLesson;
  }
};

export default availability;
