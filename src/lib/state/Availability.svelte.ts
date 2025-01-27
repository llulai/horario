import {
  type Day,
  type Lesson,
  type Period,
  type BlockedTimeslot,
  lessons,
  timetable,
  blockedTimeslots
} from '$lib/state/Timetable.svelte';

export type AvailableTimeslots = Record<Day, Partial<Record<Period, boolean>>>;

////////////////
//// UTILS ////
//////////////

const getFullDayAvailability = (maxPeriods: Period): Partial<Record<Period, boolean>> => {
  return new Object(
    Array(maxPeriods)
      .fill(true)
      .map((t, idx) => [(idx + 1) as Period, t])
  );
};

const getFullAvailability = (maxPeriods: Period): AvailableTimeslots => {
  return {
    1: getFullDayAvailability(maxPeriods),
    2: getFullDayAvailability(maxPeriods),
    3: getFullDayAvailability(maxPeriods),
    4: getFullDayAvailability(maxPeriods),
    5: getFullDayAvailability(maxPeriods)
  };
};

const combineAvailability = (
  availabilityA: AvailableTimeslots,
  availabilityB: AvailableTimeslots,
  maxPeriods: Period
): AvailableTimeslots => {
  const combinedAvailability: AvailableTimeslots = {
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
  byTeacher: Record<string, AvailableTimeslots>;
  byGrade: Record<string, AvailableTimeslots>;
  byLesson: Record<string, AvailableTimeslots>;
};

const availabilityByTeacher: Availability['byTeacher'] = $derived.by(() => {
  const byTeacher: Availability['byTeacher'] = {};
  const teachers = Object.keys(lessons.byTeacher);

  teachers.forEach((teacher) => {
    availabilityByTeacher[teacher] = getFullAvailability(timetable.maxPeriods);
  });

  // mark assigned lectures as unavailable timeslots for teachers and classes
  lessons.list.forEach((lesson: Lesson) => {
    const { teacherName, timeslot } = lesson;
    if (timeslot) {
      const [day, period] = timeslot;
      byTeacher[teacherName][day][period] = false;
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
      byTeacher[name][day][period] = false;
    }
  });

  return byTeacher;
});

const availabilityByGrade: Availability['byGrade'] = $derived.by(() => {
  const byGrade: Availability['byTeacher'] = {};
  const grades = Object.keys(lessons.byGrade);

  grades.forEach((grade) => {
    availabilityByTeacher[grade] = getFullAvailability(timetable.maxPeriods);
  });

  // mark assigned lectures as unavailable timeslots for teachers and classes
  lessons.list.forEach((lesson: Lesson) => {
    const { gradeName, timeslot } = lesson;
    if (timeslot) {
      const [day, period] = timeslot;
      byGrade[gradeName][day][period] = false;
    }
  });

  // mark blocked timeslots as unavailable timeslots for teachers and classes
  blockedTimeslots.list.forEach((blockedTimeslot: BlockedTimeslot) => {
    const {
      kind,
      name,
      timeslot: [day, period]
    } = blockedTimeslot;

    if (kind === 'grade') {
      byGrade[name][day][period] = false;
    }
  });

  return byGrade;
});

const availabilityByLesson: Availability['byLesson'] = $derived.by(() => {
  const byLesson: Availability['byLesson'] = {};

  lessons.list.forEach((lesson: Lesson) => {
    const { id, teacherName, gradeName } = lesson;
    byLesson[id] = combineAvailability(
      availabilityByTeacher[teacherName],
      availabilityByGrade[gradeName],
      timetable.maxPeriods
    );
  });

  return byLesson;
});

const availability: Availability = {
  get byTeacher() {
    return availabilityByTeacher;
  },
  get byGrade() {
    return availabilityByGrade;
  },
  get byLesson() {
    return availabilityByLesson;
  }
};

export default availability;
