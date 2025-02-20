import {
  type Day,
  type Lesson,
  type Block,
  type BlockedTimeslot,
  lessons,
  blockedTimeslots,
  periods,
  type Period,
  Time
} from '$lib/state/Timetable.svelte';

export type ByTimeslot<T> = Record<Day, Partial<Record<Block, T>>>;

////////////////
//// UTILS ////
//////////////

const getFullDayAvailability = <T>(maxBlocks: Block, fillWith: T): Partial<Record<Block, T>> => {
  return Object.fromEntries(
    Array(maxBlocks)
      .fill(fillWith)
      .map((t, idx) => [(idx + 1) as Block, t])
  );
};

export const getByTimeslot = <T>(maxBlocks: Block, fillWith: T): ByTimeslot<T> => {
  return {
    1: getFullDayAvailability(maxBlocks, fillWith),
    2: getFullDayAvailability(maxBlocks, fillWith),
    3: getFullDayAvailability(maxBlocks, fillWith),
    4: getFullDayAvailability(maxBlocks, fillWith),
    5: getFullDayAvailability(maxBlocks, fillWith)
  };
};

const getOverlappingBlocks = (period: Period, start: Time, end: Time): Block[] => {
  return Object.values(period)
    .filter((block) => {
      const [blockStart, blockEnd] = [block[1], block[2]];
      return (start >= blockStart && start <= blockEnd) || (end >= blockStart && end <= blockEnd);
    })
    .map((block) => block[0] as Block);
};

const getLessonAvailability = (
  gradeAvailability: ByTimeslot<boolean>,
  gradePeriod: Period,
  teacherAvailability: Record<string, ByTimeslot<boolean>>,
  teacherPeriods: Record<string, Period>
): ByTimeslot<boolean> => {
  const maxBlock = Object.keys(gradePeriod).length as Block;
  const lessonAvailability = getByTimeslot(maxBlock, true);

  return lessonAvailability;
};

///////////////////////
//// AVAILABILITY ////
/////////////////////

type Availability = {
  byTeacher: Record<string, Record<string, ByTimeslot<boolean>>>;
  byGrade: Record<string, ByTimeslot<boolean>>;
  byLesson: Record<string, ByTimeslot<boolean>>;
};

const [byTeacher, byGrade, byLesson] = $derived.by<
  [Availability['byTeacher'], Availability['byGrade'], Availability['byLesson']]
>(() => {
  const availabilityByTeacher: Availability['byTeacher'] = {};
  const teachers = Object.keys(lessons.byTeacher);
  const availabilityByGrade: Availability['byGrade'] = {};
  const gradeNames = Object.keys(lessons.byGrade);
  const availabilityByLesson: Availability['byLesson'] = {};

  teachers.forEach((teacher) => {
    availabilityByTeacher[teacher] = {};
    Object.entries(periods.byTeacher[teacher]).forEach(([periodId, period]) => {
      const maxBlock = Object.keys(period).length as Block;
      availabilityByTeacher[teacher][periodId] = getByTimeslot(maxBlock, true);
    });
  });

  gradeNames.forEach((grade) => {
    const maxBlock = Object.keys(periods.byGrade[grade] ?? {}).length as Block;
    availabilityByGrade[grade] = getByTimeslot(maxBlock, true);
  });

  // mark assigned lessons as unavailable timeslots for teachers and classes
  lessons.list.forEach((lesson: Lesson) => {
    const { teacherName, gradeName, timeslot } = lesson;
    if (timeslot) {
      const [day, block] = timeslot;
      availabilityByGrade[gradeName][day][block] = false;

      //block the availabiliy on each period of the teacher that overlaps with the timeslot
      Object.entries(periods.byTeacher[teacherName]).forEach(([periodId, period]) => {
        const overlappingBlocks = getOverlappingBlocks(period, timeslot[2], timeslot[3]);
        overlappingBlocks.forEach((overlappingBlock) => {
          availabilityByTeacher[teacherName][periodId][day][overlappingBlock] = false;
        });
      });
    }
  });

  // mark blocked timeslots as unavailable timeslots for teachers and classes
  blockedTimeslots.list.forEach((blockedTimeslot: BlockedTimeslot) => {
    const {
      kind,
      name,
      timeslot: [day, block]
    } = blockedTimeslot;

    if (kind === 'teacher') {
      //availabilityByTeacher[name][day][block] = false;
    }
    if (kind === 'grade') {
      availabilityByGrade[name][day][block] = false;
    }
  });

  lessons.list.forEach((lesson: Lesson) => {
    const { id, teacherName, gradeName } = lesson;

    availabilityByLesson[id] = getLessonAvailability(
      availabilityByGrade[gradeName],
      periods.byGrade[gradeName] ?? { 1: [1, new Time(8, 0), new Time(8, 45)] },
      availabilityByTeacher[teacherName],
      periods.byTeacher[teacherName]
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
