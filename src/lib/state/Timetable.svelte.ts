import { v4 as uuidv4 } from 'uuid';

////////////////
//// TYPES ////
//////////////

export type WeeklyLoad = {
  gradeName: string;
  teacherName: string;
  subjectName: string;
  weeklyLoad: number;
};

export const DAY = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5
} as const;

export type Day = (typeof DAY)[keyof typeof DAY];
export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Timeslot = readonly [day: Day, period: Period];

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
    return Object.fromEntries(Object.values(Slessons).map((lesson) => [lesson.id, lesson]));
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
  color: string;
};

type SubjectEvent =
  | {
      event: 'setColor';
      payload: { name: string; color: string };
    }
  | {
      event: 'setCode';
      payload: { name: string; code: string };
    };

type Subjects = {
  list: Subject[];
  byName: Record<string, Subject>;
  byCode: Record<string, Subject>;
  dispatch: (event: SubjectEvent) => void;
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
  },
  dispatch(dispatchedEvent: SubjectEvent) {
    console.warn('dispatchedEvent', dispatchedEvent);
  }
};

/////////////////
//// GRADES ////
///////////////

type Grade = {
  name: string;
  code: string;
  color: string;
};

type GradeEvent =
  | {
      event: 'setColor';
      payload: { name: string; color: string };
    }
  | {
      event: 'setCode';
      payload: { name: string; code: string };
    };

type Grades = {
  list: Grade[];
  byName: Record<string, Grade>;
  byCode: Record<string, Grade>;
  dispatch: (event: GradeEvent) => void;
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
  },
  dispatch(dispatchedEvent: GradeEvent) {
    console.warn('dispatchedEvent', dispatchedEvent);
  }
};

/////////////////////////////
//// BLOCKED TIMESLOSTS ////
///////////////////////////

export type BlockedTimeslot = {
  id: string;
  kind: 'teacher' | 'grade';
  name: string;
  timeslot: Timeslot;
};

type BlockedTimeslotEvent =
  | {
      event: 'addBlockedTimeslot';
      payload: { kind: 'teacher' | 'grade'; name: string; timeslot: Timeslot };
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
        const { name, kind, timeslot } = payload;
        SblockedTimeslots[id] = { id, kind, name, timeslot };
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
  maxPeriods: Period;
  fromWeeklyLoad: (weeklyLoads: WeeklyLoad[], maxPeriods: Period) => void;
  // loadFromJSON: (json: string) => void;
  // saveToJSON: () => string;
};

let SmaxPeriods = $state<Period>(7);

// this function loads the timetable from a list of weekly loads
const fromWeeklyLoad = (weeklyLoads: WeeklyLoad[], newMaxPeriods: Period) => {
  // clear existing state
  //Slessons = {};
  //Ssubjects = {};
  //Sgrades = {};

  const newLessons: Record<string, Lesson> = {};
  const newGrades: Record<string, Grade> = {};
  const newSubjects: Record<string, Subject> = {};

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

    // update grades
    if (!(load.gradeName in newGrades)) {
      newGrades[load.gradeName] = {
        name: load.gradeName,
        code: '',
        color: ''
      };
    }

    // update subjects
    if (!(load.subjectName in newSubjects)) {
      newSubjects[load.subjectName] = { name: load.subjectName, code: '', color: '' };
    }
  });

  Slessons = newLessons;
  Sgrades = newGrades;
  Ssubjects = newSubjects;
  SblockedTimeslots = {};
  SmaxPeriods = newMaxPeriods;
};

export const timetable: TimeTable = {
  fromWeeklyLoad,
  get maxPeriods() {
    return SmaxPeriods;
  }
};
