import { v4 as uuidv4 } from 'uuid';

/********************/
/****** types ******/
/******************/

export type Lesson = {
  id: number;
  teacher: string;
  classGroup: string;
  subject: string;
  hours: number;
};

export type Day = 1 | 2 | 3 | 4 | 5;
export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Timeslot = {
  day: Day;
  period: Period;
};

export type Lecture = {
  id: string;
  teacher: string;
  classGroup: string;
  subject: string;
  duration: 1 | 2;
  timeslot?: Timeslot;
};

export type BlockedPeriod = {
  id: string | null;
  kind: 'teacher' | 'classGroup';
  name: string;
  duration: 1 | 2;
  timeslot: Timeslot;
};

export type AssignedSchedule = Record<Day, Record<Period, Lecture | null>>;
export type BlockedSchedule = Record<Day, Record<Period, BlockedPeriod | null>>;
export type AvailabilitySchedule = Record<Day, Record<Period, boolean>>;

export type ClassSchedule = {
  assignedLectures: Lecture[];
  unassignedLectures: Lecture[];
  assignedSchedule: AssignedSchedule;
  blockedSchedule: BlockedSchedule;
  assignedLoad: number;
  unassignedLoad: number;
  totalLoad: number;
  availableLoad: number;
};

type ScheduleByCourse = Record<string, ClassSchedule>;
type ScheduleByTeacher = Record<string, ClassSchedule>;

type LectureExport = {
  teacher: string;
  className: string;
  subject: string;
  possibleTimeslots: Timeslot[];
};

type ProblemScale = {
  total: bigint;
  byTeacher: Record<string, bigint>;
  byClass: Record<string, bigint>;
  byLecture: Record<string, number>;
};

type Timetable = {
  byTeacher: ScheduleByTeacher;
  byClass: ScheduleByCourse;
  availabilityByLecture: Record<string, AvailabilitySchedule>;
  setLessons: (lessons: Lesson[]) => void;
  setLectureTimeslot: (lectureId: string, timeslot: Timeslot) => void;
  removeLectureTimeslot: (lectureId: string) => void;
  splitLecture: (lectureId: string) => void;
  addBlockedPeriod: (blockedPeriod: BlockedPeriod) => void;
  setBlockedPeriodTimeslot: (blockedPeriodId: string, timeslot: Timeslot) => void;
  removeBlockedPeriod: (blockedPeriodId: string) => void;
  exportLectures: () => LectureExport[];
  problemScale: ProblemScale;
};

export const getEmptySchedule: <T>(val: T) => Record<Day, Record<Period, T>> = (val) => {
  return {
    1: { 1: val, 2: val, 3: val, 4: val, 5: val, 6: val, 7: val },
    2: { 1: val, 2: val, 3: val, 4: val, 5: val, 6: val, 7: val },
    3: { 1: val, 2: val, 3: val, 4: val, 5: val, 6: val, 7: val },
    4: { 1: val, 2: val, 3: val, 4: val, 5: val, 6: val, 7: val },
    5: { 1: val, 2: val, 3: val, 4: val, 5: val, 6: val, 7: val }
  };
};

/***************************/
/****** interactions ******/
/*************************/

let lectures = $state<Record<string, Lecture>>({});
const blockedPeriods = $state<Record<string, BlockedPeriod>>({});

const byTeacher = $derived.by<ScheduleByTeacher>(() => {
  const lecturesByTeacher = Object.values(lectures).reduce(
    (lecByTeach: Record<string, ClassSchedule>, lecture: Lecture) => {
      const { teacher, timeslot } = lecture;
      if (!(teacher in lecByTeach)) {
        lecByTeach[teacher] = {
          assignedLectures: [],
          unassignedLectures: [],
          assignedSchedule: getEmptySchedule(null),
          blockedSchedule: getEmptySchedule(null),
          assignedLoad: 0,
          unassignedLoad: 0,
          totalLoad: 0,
          availableLoad: 35
        };
      }

      if (timeslot) {
        // assign lecture to schedule
        lecByTeach[teacher].assignedSchedule[timeslot.day][timeslot.period] = lecture;
        lecByTeach[teacher].assignedLectures.push(lecture);
        lecByTeach[teacher].assignedLoad += lecture.duration;
      } else {
        lecByTeach[teacher].unassignedLectures.push(lecture);
        lecByTeach[teacher].unassignedLoad += lecture.duration;
      }
      lecByTeach[teacher].totalLoad += lecture.duration;

      return lecByTeach;
    },
    {}
  );

  Object.values(blockedPeriods).forEach((blockedPeriod: BlockedPeriod) => {
    const {
      kind,
      name,
      timeslot: { day, period }
    } = blockedPeriod;
    if (kind === 'teacher') {
      // add blocked period
      lecturesByTeacher[name].blockedSchedule[day][period] = blockedPeriod;
      lecturesByTeacher[name].availableLoad += 1;
    }
  });

  return lecturesByTeacher;
});

const byClass = $derived.by<ScheduleByCourse>(() => {
  const lecturesByClass = Object.values(lectures).reduce(
    (lecByCourse: Record<string, ClassSchedule>, lecture: Lecture) => {
      const { classGroup, timeslot } = lecture;
      if (!(classGroup in lecByCourse)) {
        lecByCourse[classGroup] = {
          assignedLectures: [],
          unassignedLectures: [],
          assignedSchedule: getEmptySchedule(null),
          blockedSchedule: getEmptySchedule(null),
          assignedLoad: 0,
          unassignedLoad: 0,
          totalLoad: 0,
          availableLoad: 35
        };
      }

      if (timeslot) {
        // assign lecture to schedule
        lecByCourse[classGroup].assignedSchedule[timeslot.day][timeslot.period] = lecture;
        lecByCourse[classGroup].assignedLectures.push(lecture);
        lecByCourse[classGroup].assignedLoad += lecture.duration;
      } else {
        lecByCourse[classGroup].unassignedLectures.push(lecture);
        lecByCourse[classGroup].unassignedLoad += lecture.duration;
      }

      lecByCourse[classGroup].totalLoad += lecture.duration;

      return lecByCourse;
    },
    {}
  );

  Object.values(blockedPeriods).forEach((blockedPeriod: BlockedPeriod) => {
    const {
      kind,
      name,
      timeslot: { day, period }
    } = blockedPeriod;
    if (kind === 'classGroup') {
      lecturesByClass[name].blockedSchedule[day][period] = blockedPeriod;
      lecturesByClass[name].availableLoad -= 1;
    }
  });

  return lecturesByClass;
});

const availabilityByLecture = $derived.by(() => {
  const availabilityByTeacher: Record<string, AvailabilitySchedule> = Object.values(
    lectures
  ).reduce((abt: Record<string, AvailabilitySchedule>, lecture: Lecture) => {
    const { teacher, timeslot } = lecture;
    if (!(teacher in abt)) {
      abt[teacher] = getEmptySchedule(true);
    }

    if (timeslot) {
      abt[teacher][timeslot.day][timeslot.period] = false;

      if (lecture.duration === 2) {
        // @ts-expect-error lectures with duration 2 start at periods 1, 3 or 5
        abt[teacher][timeslot.day][timeslot.period + 1] = false;
      }
    }

    return abt;
  }, {});

  const availabilityByClass: Record<string, AvailabilitySchedule> = Object.values(lectures).reduce(
    (abc: Record<string, AvailabilitySchedule>, lecture: Lecture) => {
      const { classGroup, timeslot, duration } = lecture;
      if (!(classGroup in abc)) {
        abc[classGroup] = getEmptySchedule(true);
      }

      if (timeslot) {
        abc[classGroup][timeslot.day][timeslot.period] = false;

        if (duration === 2) {
          // @ts-expect-error lectures with duration 2 start at periods 1, 3 or 5
          abc[classGroup][timeslot.day][timeslot.period + 1] = false;
        }
      }

      return abc;
    },
    {}
  );

  Object.values(blockedPeriods).forEach((blockedPeriod: BlockedPeriod) => {
    const {
      name,
      kind,
      duration,
      timeslot: { day, period }
    } = blockedPeriod;
    if (kind === 'teacher') {
      availabilityByTeacher[name][day][period] = false;
      if (duration === 2) {
        // @ts-expect-error if blocked period duration is 2 it starts on period 1, 3 or 5
        availabilityByTeacher[name][day][period + 1] = false;
      }
    } else {
      availabilityByClass[name][day][period] = false;
      if (duration === 2) {
        // @ts-expect-error if blocked period duration is 2 it starts on period 1, 3 or 5
        availabilityByClass[name][day][period + 1] = false;
      }
    }
  });

  return Object.fromEntries(
    Object.values(lectures).map((lecture) => {
      const days = [1, 2, 3, 4, 5] as const;
      const periods = [1, 2, 3, 4, 5, 6, 7] as const;
      const doublePeriods = [
        [1, 2],
        [3, 4],
        [5, 6]
      ] as const;

      const availability = getEmptySchedule(false);
      const { teacher, classGroup, duration } = lecture;

      days.forEach((day) => {
        if (duration === 1) {
          periods.forEach((period) => {
            availability[day][period] =
              availabilityByTeacher[teacher][day][period] &&
              availabilityByClass[classGroup][day][period];
          });
        } else {
          doublePeriods.forEach(([firstPeriod, secondPeriod]) => {
            availability[day][firstPeriod] =
              availabilityByTeacher[teacher][day][firstPeriod] &&
              availabilityByTeacher[teacher][day][secondPeriod] &&
              availabilityByClass[classGroup][day][firstPeriod] &&
              availabilityByClass[classGroup][day][secondPeriod];
            availability[day][secondPeriod] =
              availabilityByTeacher[teacher][day][firstPeriod] &&
              availabilityByTeacher[teacher][day][secondPeriod] &&
              availabilityByClass[classGroup][day][firstPeriod] &&
              availabilityByClass[classGroup][day][secondPeriod];
          });
        }
      });

      return [lecture.id, availability];
    })
  );
});

const problemScale = $derived.by(() => {
  const days = [1, 2, 3, 4, 5] as const;
  const singlePeriods = [1, 2, 3, 4, 5, 6, 7] as const;
  const doublePeriods = [1, 3, 5] as const;

  const byLecture: ProblemScale['byLecture'] = Object.values(lectures).reduce(
    (scaleByLecture: Record<string, number>, lecture) => {
      scaleByLecture[lecture.id] = days.reduce((t, day) => {
        if (lecture.timeslot) return 1;
        if (lecture.duration === 1)
          t += singlePeriods.reduce(
            (acc, period) => (acc += availabilityByLecture[lecture.id][day][period] ? 1 : 0),
            0
          );
        else
          t += doublePeriods.reduce(
            (acc, period) =>
              (acc +=
                availabilityByLecture[lecture.id][day][period] &&
                // @ts-expect-error double duration lectures
                availabilityByLecture[lecture.id][day][period + 1]
                  ? 1
                  : 0),
            0
          );
        return t;
      }, 0);
      return scaleByLecture;
    },
    {}
  );

  const byTeacher: ProblemScale['byTeacher'] = Object.values(lectures).reduce(
    (scaleByTeacher: Record<string, bigint>, lecture) => {
      const { teacher, id } = lecture;

      if (!(teacher in scaleByTeacher)) {
        scaleByTeacher[teacher] = BigInt(1);
      }

      scaleByTeacher[teacher] *= BigInt(byLecture[id]);
      return scaleByTeacher;
    },
    {}
  );

  const byClass: ProblemScale['byClass'] = Object.values(lectures).reduce(
    (scaleByClass: Record<string, bigint>, lecture) => {
      const { classGroup, id } = lecture;

      if (!(classGroup in scaleByClass)) {
        scaleByClass[classGroup] = BigInt(1);
      }

      scaleByClass[classGroup] *= BigInt(byLecture[id]);
      return scaleByClass;
    },
    {}
  );

  const totalByTeacher = Object.values(byTeacher).reduce((acc, num) => {
    acc *= num;
    return acc;
  }, BigInt(1));

  const totalByClass = Object.values(byClass).reduce((acc, num) => {
    acc *= num;
    return acc;
  }, BigInt(1));

  if (totalByTeacher !== totalByClass)
    throw new Error('total problem scale should be the same if calculated by teacher or by class');

  return {
    byTeacher,
    byClass,
    byLecture,
    total: totalByTeacher
  };
});

/************************/
/****** timetable ******/
/**********************/

const timetable: Timetable = {
  get byTeacher() {
    return byTeacher;
  },
  get byClass() {
    return byClass;
  },
  get problemScale() {
    return problemScale;
  },
  get availabilityByLecture() {
    return availabilityByLecture;
  },
  setLessons(lessons: Lesson[]) {
    // update lectures
    lectures = lessons.reduce((lec: Record<string, Lecture>, lesson) => {
      for (let i = 0; i < Math.floor(lesson.hours / 2); i++) {
        const uuid = uuidv4();
        lec[uuid] = {
          id: uuid,
          teacher: lesson.teacher,
          classGroup: lesson.classGroup,
          subject: lesson.subject,
          duration: 2
        };
      }

      for (let i = 0; i < lesson.hours % 2; i++) {
        const uuid = uuidv4();
        lec[uuid] = {
          id: uuid,
          teacher: lesson.teacher,
          classGroup: lesson.classGroup,
          subject: lesson.subject,
          duration: 1
        };
      }

      return lec;
    }, {});
  },

  setLectureTimeslot(lectureId: string, timeslot: Timeslot) {
    lectures[lectureId] = { ...lectures[lectureId], timeslot };
  },

  removeLectureTimeslot(id: string) {
    const lecture = lectures[id];
    delete lecture.timeslot;
  },

  splitLecture(id: string) {
    const lecture = lectures[id];
    if (lecture.duration === 2) {
      const id1 = uuidv4();
      const id2 = uuidv4();

      lectures[id1] = { ...lecture, id: id1, duration: 1, timeslot: undefined };
      lectures[id2] = { ...lecture, id: id2, duration: 1, timeslot: undefined };

      delete lectures[id];
    }
  },

  addBlockedPeriod(blockedPeriod: BlockedPeriod) {
    const id = uuidv4();
    blockedPeriods[id] = { ...blockedPeriod, id };
  },

  setBlockedPeriodTimeslot(id: string, timeslot: Timeslot) {
    blockedPeriods[id] = { ...blockedPeriods[id], timeslot };
  },

  removeBlockedPeriod(id: string) {
    delete blockedPeriods[id];
  },

  exportLectures() {
    return Object.values(lectures).map((lecture) => {
      if (lecture.timeslot === undefined) {
        const possibleTimeslots: Timeslot[] = [];

        const days = [1, 2, 3, 4, 5] as const;
        const periods = [1, 2, 3, 4, 5, 6, 7] as const;

        days.forEach((day) => {
          periods.forEach((period) => {
            if (availabilityByLecture[lecture.id][day][period]) {
              possibleTimeslots.push({ day, period });
            }
          });
        });

        return {
          teacher: lecture.teacher,
          subject: lecture.subject,
          className: lecture.classGroup,
          possibleTimeslots
        };
      } else {
        return {
          teacher: lecture.teacher,
          subject: lecture.subject,
          className: lecture.classGroup,
          possibleTimeslots: [{ day: lecture.timeslot.day, period: lecture.timeslot.period }]
        };
      }
    });
  }
};

export default timetable;
