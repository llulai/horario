import { v4 as uuidv4 } from 'uuid';
import type { RawGrade, RawSubject, RawWeeklyLoad } from './WeeklyLoad.svelte';

////////////////
//// TYPES ////
//////////////

export const DAY = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5
} as const;

export type Day = (typeof DAY)[keyof typeof DAY];
export type Block = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export class Time {
  hour: number;
  minute: number;

  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }

  valueOf(): number {
    return this.hour * 60 + this.minute;
  }
}
export type Period = Partial<Record<Block, readonly [block: Block, start: Time, end: Time]>>;
type Timeslot = readonly [day: Day, block: Block, start: Time, end: Time];

//////////////////
//// PERIODS ////
////////////////

type PeriodEvent = {
  event: 'addPeriod';
  payload: { period: Period; id: string };
};

type Periods = {
  byId: Record<string, Period>;
  byTeacher: Record<string, Record<string, Period>>;
  byGrade: Record<string, Period | null>;
  dispatch: (event: PeriodEvent) => void;
};

const Speriods = $state<Record<string, Period>>({});

export const periods: Periods = {
  get byId() {
    return Speriods;
  },
  get byGrade() {
    return Object.fromEntries(
      Object.values(Sgrades).map((grade) => [
        grade.name,
        grade.periodId ? Speriods[grade.periodId] : null
      ])
    );
  },
  get byTeacher() {
    const periodIdsByTeacher: Record<string, Set<string>> = {};
    Object.values(Slessons).forEach((lesson) => {
      const { teacherName, gradeName } = lesson;

      if (!(teacherName in periodIdsByTeacher)) {
        periodIdsByTeacher[teacherName] = new Set();
      }

      if (gradeName in Sgrades) {
        const periodId = Sgrades[gradeName].periodId;

        if (periodId) {
          periodIdsByTeacher[teacherName].add(periodId);
        }
      }
    });

    return Object.fromEntries(
      Object.entries(periodIdsByTeacher).map(([teacherName, periodIds]) => [
        teacherName,
        Object.fromEntries(Array.from(periodIds).map((periodId) => [periodId, Speriods[periodId]]))
      ])
    );
  },
  dispatch(event: PeriodEvent) {
    if (event.event === 'addPeriod') {
      const { id, period } = event.payload;
      Speriods[id] = period;

      return { data: { id } };
    }
  }
};

//////////////////
//// LESSONS ////
////////////////

export type Lesson = {
  id: string;
  teacherName: string;
  gradeName: string;
  subjectName: string;
  timeslot: Timeslot | null;
};

type LessonEvent =
  | {
      event: 'setLessonTimeslot';
      payload: { lessonId: string; timeslot: Timeslot };
    }
  | {
      event: 'removeLessonTimeslot';
      payload: { lessonId: string };
    };

type Lessons = {
  list: Lesson[];
  byId: Record<string, Lesson>;
  byTeacher: Record<string, Lesson[]>;
  byGrade: Record<string, Lesson[]>;
  dispatch: (event: LessonEvent) => void;
};

let Slessons = $state<Record<string, Lesson>>({});

export const lessons: Lessons = {
  get list() {
    return Object.values(Slessons);
  },

  get byId() {
    return Slessons;
  },

  get byTeacher() {
    return Object.values(Slessons).reduce(
      (acc, lesson) => {
        const { teacherName } = lesson;
        if (!(teacherName in acc)) {
          acc[teacherName] = [];
        }
        acc[lesson.teacherName].push(lesson);
        return acc;
      },
      {} as Record<string, Lesson[]>
    );
  },

  get byGrade() {
    return Object.values(Slessons).reduce(
      (acc, lesson) => {
        const { gradeName } = lesson;
        if (!(gradeName in acc)) {
          acc[gradeName] = [];
        }
        acc[lesson.gradeName].push(lesson);
        return acc;
      },
      {} as Record<string, Lesson[]>
    );
  },

  dispatch(dispatchedEvent: LessonEvent) {
    const { event, payload } = dispatchedEvent;
    switch (event) {
      case 'setLessonTimeslot': {
        Slessons[payload.lessonId].timeslot = payload.timeslot;
        break;
      }
      case 'removeLessonTimeslot': {
        Slessons[payload.lessonId].timeslot = null;
        break;
      }
      default:
        throw new Error(`Invalid event type: ${event}`);
    }
  }
};

///////////////////
//// SUBJECTS ////
/////////////////

type Subject = {
  name: string;
  code: string;
};

type Subjects = {
  list: Subject[];
  byName: Record<string, Subject>;
  byCode: Record<string, Subject>;
};

let Ssubjects = $state<Record<string, Subject>>({});

export const subjects: Subjects = {
  get list() {
    return Object.values(Ssubjects);
  },

  get byName() {
    return Object.fromEntries(Object.values(Ssubjects).map((subject) => [subject.name, subject]));
  },

  get byCode() {
    return Object.fromEntries(Object.values(Ssubjects).map((subject) => [subject.code, subject]));
  }
};

/////////////////
//// GRADES ////
///////////////

type Grade = {
  name: string;
  code: string;
  periodId: string;
};

type Grades = {
  list: Grade[];
  byName: Record<string, Grade>;
  byCode: Record<string, Grade>;
};

let Sgrades = $state<Record<string, Grade>>({});

export const grades: Grades = {
  get list() {
    return Object.values(Sgrades);
  },
  get byName() {
    return Object.fromEntries(Object.values(Sgrades).map((grade) => [grade.name, grade]));
  },
  get byCode() {
    return Object.fromEntries(Object.values(Sgrades).map((grade) => [grade.code, grade]));
  }
};

/////////////////////////////
//// BLOCKED TIMESLOSTS ////
///////////////////////////

export type BlockedTimeslot = {
  id: string;
  kind: 'grade' | 'teacher';
  name: string;
  timeslot: Timeslot;
  periodId: string;
};

type BlockedTimeslotEvent =
  | {
      event: 'addBlockedTimeslot';
      payload: { kind: 'grade' | 'teacher'; name: string; timeslot: Timeslot; periodId: string };
    }
  | {
      event: 'removeBlockedTimeslot';
      payload: { id: string };
    };

type BlockedTimeslots = {
  list: BlockedTimeslot[];
  byId: Record<string, BlockedTimeslot>;
  byTeacher: Record<string, BlockedTimeslot[]>;
  byGrade: Record<string, BlockedTimeslot[]>;
  dispatch: (event: BlockedTimeslotEvent) => void;
};

let SblockedTimeslots = $state<Record<string, BlockedTimeslot>>({});

export const blockedTimeslots: BlockedTimeslots = {
  get list() {
    return Object.values(SblockedTimeslots);
  },
  get byId() {
    return Object.fromEntries(
      Object.values(SblockedTimeslots).map((blockedTimeslot) => [
        blockedTimeslot.id,
        blockedTimeslot
      ])
    );
  },
  get byTeacher() {
    return Object.values(SblockedTimeslots).reduce(
      (acc, blockedTimeslot) => {
        const { name, kind } = blockedTimeslot;
        if (kind === 'teacher') {
          if (!(name in acc)) {
            acc[name] = [];
          }
          acc[name].push(blockedTimeslot);
        }
        return acc;
      },
      {} as Record<string, BlockedTimeslot[]>
    );
  },
  get byGrade() {
    return Object.values(SblockedTimeslots).reduce(
      (acc, blockedTimeslot) => {
        const { name, kind } = blockedTimeslot;
        if (kind === 'grade') {
          if (!(name in acc)) {
            acc[name] = [];
          }
          acc[name].push(blockedTimeslot);
        }
        return acc;
      },
      {} as Record<string, BlockedTimeslot[]>
    );
  },
  dispatch(dispatchedEvent: BlockedTimeslotEvent) {
    const { event, payload } = dispatchedEvent;
    switch (event) {
      case 'addBlockedTimeslot': {
        const id = uuidv4();
        const { name, kind, timeslot, periodId } = payload;
        SblockedTimeslots[id] = { id, kind, name, timeslot, periodId };
        break;
      }
      case 'removeBlockedTimeslot': {
        delete SblockedTimeslots[payload.id];
        break;
      }
      default:
        throw new Error(`Invalid event type: ${event}`);
    }
  }
};

////////////////////
//// TIMETABLE ////
//////////////////

export type TimeTable = {
  fromWeeklyLoad: (
    weeklyLoads: RawWeeklyLoad[],
    grades: RawGrade[],
    subjects: RawSubject[]
  ) => void;
  // loadFromJSON: (json: string) => void;
  // saveToJSON: () => string;
};

// this function loads the timetable from a list of weekly loads
const fromWeeklyLoad = (
  weeklyLoads: RawWeeklyLoad[],
  grades: RawGrade[],
  subjects: RawSubject[]
) => {
  const newLessons: Record<string, Lesson> = {};

  if (
    grades.filter((grade) => grade.code === undefined || grade.periodId === undefined).length > 0
  ) {
    throw new Error('All grades must have a code and periodId');
  }

  if (subjects.filter((subject) => subject.code === undefined).length > 0) {
    throw new Error('All subjects must have a code');
  }

  weeklyLoads.forEach((load) => {
    // create lessons
    for (let i = 0; i < load.weeklyLoad; i++) {
      const id = uuidv4();
      newLessons[id] = {
        id,
        teacherName: load.teacherName,
        gradeName: load.gradeName,
        subjectName: load.subjectName,
        timeslot: null
      };
    }
  });

  Slessons = newLessons;
  // @ts-expect-error: all grades will have a code and periodId
  Sgrades = Object.fromEntries(grades.map((grade) => [grade.name, grade]));
  // @ts-expect-error: all subjects will have a code
  Ssubjects = Object.fromEntries(subjects.map((subject) => [subject.name, subject]));
  SblockedTimeslots = {};
};

export const timetable: TimeTable = {
  fromWeeklyLoad
};
