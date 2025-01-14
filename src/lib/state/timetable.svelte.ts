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

let lessons = $state<Record<string, Lesson>>({});
let lectures = $state<Record<string, Lecture>>({});
let blockedPeriods = $state<Record<string, BlockedPeriod>>({});

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

      if (lecture.timeslot !== undefined) {
        lecByTeach[lecture.teacher].assignedSchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = lecture;
        lecByTeach[lecture.teacher].availabilitySchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = false;
      } else {
        lecByTeach[lecture.teacher].unassignedLectures.push(lecture);
      }

      return lecByTeach;
    },
    {}
  );

  Object.values(blockedPeriods).forEach((blockedPeriod: BlockedPeriod) => {
    if (blockedPeriod.kind === 'teacher') {
      lecturesByTeacher[blockedPeriod.name].blockedSchedule[blockedPeriod.timeslot.day][
        blockedPeriod.timeslot.period
      ] = blockedPeriod;
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
        lecByCourse[lecture.classGroup].assignedSchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = lecture;
        lecByCourse[lecture.classGroup].availabilitySchedule[lecture.timeslot.day][
          lecture.timeslot.period
        ] = false;
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

/************************/
/****** timetable ******/
/**********************/

const timetable = {
  get byTeacher() {
    return byTeacher;
  },
  get byClass() {
    return byClass;
  },
  setLessons(newLessons: Lesson[]) {
    lessons = newLessons.reduce((nLessons: Record<string, Lesson>, nLesson: Lesson) => {
      nLessons[nLesson.id] = nLesson;
      return nLessons;
    }, {});

    // update lectures
    lectures = newLessons.reduce((lec: Record<string, Lecture>, lesson) => {
      for (let i = 0; i < lesson.hours; i++) {
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

  addBlockedPeriod(blockedPeriod: BlockedPeriod) {
    const id = uuidv4();
    blockedPeriods[id] = { ...blockedPeriod, id };
  },

  removeBlockedPeriod(id: string) {
    delete blockedPeriods[id];
  }
};

export default timetable;
