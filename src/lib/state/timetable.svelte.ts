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
  duration: number;
  timeslot?: Timeslot;
};

export type BlockedPeriod = {
  id: string;
  kind: 'teacher' | 'classGroup';
  name: string;
  timeslot: Timeslot;
};

export type AssignedSchedule = Record<Day, Record<Period, Lecture | null>>;
export type BlockedSchedule = Record<Day, Record<Period, BlockedPeriod | null>>;
export type AvailabilitySchedule = Record<Day, Record<Period, boolean>>;

export type ClassSchedule = {
  unassignedLectures: Lecture[];
  assignedSchedule: AssignedSchedule;
  blockedSchedule: BlockedSchedule;
  availabilitySchedule: AvailabilitySchedule;
};

type ScheduleByCourse = Record<string, ClassSchedule>;
type ScheduleByTeacher = Record<string, ClassSchedule>;

type LectureExport = {
  teacher: string;
  className: string;
  subject: string;
  possibleTimeslots: Timeslot[];
};

type Timetable = {
  byTeacher: ScheduleByTeacher;
  byClass: ScheduleByCourse;
  setLessons: (lessons: Lesson[]) => void;
  setLectureTimeslot: (lectureId: string, timeslot: Timeslot) => void;
  removeLectureTimeslot: (lectureId: string) => void;
  splitLecture: (lectureId: string) => void;
  addBlockedPeriod: (blockedPeriod: BlockedPeriod) => void;
  removeBlockedPeriod: (blockedPeriodId: string) => void;
  exportLectures: () => LectureExport[];
  problemScale: bigint;
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
      if (!(lecture.teacher in lecByTeach)) {
        lecByTeach[lecture.teacher] = {
          assignedSchedule: getEmptySchedule(null),
          unassignedLectures: [],
          blockedSchedule: getEmptySchedule(null),
          availabilitySchedule: getEmptySchedule(true)
        };
      }

      if (lecture.timeslot) {
        // assign lecture to schedule
        lecByTeach[lecture.teacher].assignedSchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = lecture;

        // update availability
        lecByTeach[lecture.teacher].availabilitySchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = false;
        if (lecture.duration === 2) {
          //@ts-expect-error: the first period in a lecture of duration 2 is either 1, 3, 5
          lecByTeach[lecture.teacher].availabilitySchedule[lecture.timeslot.day][
            lecture.timeslot.period + 1
          ] = false;
        }
      } else {
        lecByTeach[lecture.teacher].unassignedLectures.push(lecture);
      }

      return lecByTeach;
    },
    {}
  );

  Object.values(blockedPeriods).forEach((blockedPeriod: BlockedPeriod) => {
    if (blockedPeriod.kind === 'teacher') {
      // add blocked period
      lecturesByTeacher[blockedPeriod.name].blockedSchedule[blockedPeriod.timeslot.day][
        blockedPeriod.timeslot.period
      ] = blockedPeriod;

      // update availability
      lecturesByTeacher[blockedPeriod.name].availabilitySchedule[blockedPeriod.timeslot.day][
        blockedPeriod.timeslot.period
      ] = false;
    }
  });

  return lecturesByTeacher;
});

const byClass = $derived.by<ScheduleByCourse>(() => {
  const lecturesByClass = Object.values(lectures).reduce(
    (lecByCourse: Record<string, ClassSchedule>, lecture: Lecture) => {
      if (!(lecture.classGroup in lecByCourse)) {
        lecByCourse[lecture.classGroup] = {
          assignedSchedule: getEmptySchedule(null),
          unassignedLectures: [],
          blockedSchedule: getEmptySchedule(null),
          availabilitySchedule: getEmptySchedule(true)
        };
      }

      if (lecture.timeslot !== undefined) {
        // assign lecture to schedule
        lecByCourse[lecture.classGroup].assignedSchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = lecture;

        // update availability
        lecByCourse[lecture.classGroup].availabilitySchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = false;

        if (lecture.duration === 2) {
          //@ts-expect-error: the first period in a lecture of duration 2 is either 1, 3, 5
          lecByCourse[lecture.classGroup].availabilitySchedule[lecture.timeslot.day][
            lecture.timeslot.period + 1
          ] = false;
        }
      } else {
        lecByCourse[lecture.classGroup].unassignedLectures.push(lecture);
      }

      return lecByCourse;
    },
    {}
  );

  Object.values(blockedPeriods).forEach((blockedPeriod: BlockedPeriod) => {
    if (blockedPeriod.kind === 'classGroup') {
      lecturesByClass[blockedPeriod.name].blockedSchedule[blockedPeriod.timeslot.day][
        blockedPeriod.timeslot.period
      ] = blockedPeriod;
      lecturesByClass[blockedPeriod.name].availabilitySchedule[blockedPeriod.timeslot.day][
        blockedPeriod.timeslot.period
      ] = false;
    }
  });

  return lecturesByClass;
});

const problemScale = $derived.by(() => {
  const scale: Record<number, number> = {};
  const days = [1, 2, 3, 4, 5] as const;
  const singlePeriods = [1, 2, 3, 4, 5, 6, 7] as const;
  const doublePeriods = [1, 3, 5] as const;

  Object.values(lectures).forEach((lecture) => {
    if (lecture.timeslot === undefined) {
      const options = days.reduce((accDays: number, day: Day) => {
        if (lecture.duration == 1) {
          accDays += singlePeriods.reduce((accPeriods: number, period) => {
            accPeriods +=
              byTeacher[lecture.teacher].availabilitySchedule[day][period] &&
              byClass[lecture.classGroup].availabilitySchedule[day][period]
                ? 1
                : 0;

            return accPeriods;
          }, 0);
        } else {
          accDays += doublePeriods.reduce((accPeriods: number, period) => {
            accPeriods +=
              byTeacher[lecture.teacher].availabilitySchedule[day][period] &&
              byClass[lecture.classGroup].availabilitySchedule[day][period]
                ? 1
                : 0;

            return accPeriods;
          }, 0);
        }

        return accDays;
      }, 0);

      if (!(options in scale)) {
        scale[options] = 0;
      }

      scale[options] += 1;
    }
  });

  return Object.entries(scale).reduce((acc: bigint, [k, v]) => {
    acc = acc * BigInt(k) ** BigInt(v);
    return acc;
  }, BigInt(1));
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
            if (
              byTeacher[lecture.teacher].availabilitySchedule[day][period] &&
              byClass[lecture.classGroup].availabilitySchedule[day][period]
            ) {
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
