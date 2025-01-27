import { v4 as uuidv4 } from 'uuid';

////////////////
//// TYPES ////
//////////////

type WeeklyLoad = {
  className: string;
  teacherName: string;
  subjectName: string;
  weeklyLoad: number;
};

export enum Day {
  'MONDAY' = 1,
  'TUESDAY' = 2,
  'WEDNESDAY' = 3,
  'THURSDAY' = 4,
  'FRIDAY' = 5
}

export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Timeslot = readonly [day: Day, period: Period];

export type Lesson = {
  id: string;
  teacherName: string;
  className: string;
  subjectName: string;
  timeslot: Timeslot | null;
};

export type BlockedTimeslot = {
  id: string;
  kind: 'teacher' | 'class';
  name: string;
  timeslot: Timeslot;
};

type ClassMapKeys = WeeklyLoad['className'];
type SubjectMapKeys = WeeklyLoad['subjectName'];

type ClassMap = Record<ClassMapKeys, { code: string; color: string }>;

type SubjectMap = Record<SubjectMapKeys, { code: string; color: string }>;

type Event =
  | {
      event: 'setLectureTimeslot';
      payload: { lessonId: string; timeslot: Timeslot };
    }
  | {
      event: 'removeLectureTimeslot';
      payload: { lessonId: string };
    };

export type TimeTable = {
  maxPeriods: Period;
  lessons: Record<string, Lesson>;
  blockedTimeslots: Record<string, BlockedTimeslot>;
  classMap: ClassMap;
  subjectMap: SubjectMap;
  fromWeeklyLoad: (weeklyLoads: WeeklyLoad[], maxPeriods: Period) => void;
  dispatch: (event: Event) => void;
  // loadFromJSON: (json: string) => void;
  // saveToJSON: () => string;
};

////////////////
//// STATE ////
//////////////

let maxPeriods = $state<Period>(7);
let lessons = $state<Record<string, Lesson>>({});
let blockedTimeslots = $state<Record<string, BlockedTimeslot>>({});
let classMap = $state<ClassMap>({});
let subjectMap = $state<SubjectMap>({});

// this function loads the timetable from a list of weekly loads
const fromWeeklyLoad = (weeklyLoads: WeeklyLoad[], newMaxPeriods: Period) => {
  // clear existing state
  lessons = {};
  blockedTimeslots = {};
  classMap = {};
  subjectMap = {};
  maxPeriods = newMaxPeriods;

  weeklyLoads.forEach((load) => {
    // create lessons
    for (let i = 0; i < load.weeklyLoad; i++) {
      const id = uuidv4();
      lessons[id] = {
        id,
        teacherName: load.teacherName,
        className: load.className,
        subjectName: load.subjectName,
        timeslot: null
      };
    }

    // update classMap
    if (!(load.className in classMap)) {
      classMap[load.className] = {
        code: '',
        color: ''
      };
    }

    // update subjectMap
    if (!(load.subjectName in subjectMap)) {
      subjectMap[load.subjectName] = { code: '', color: '' };
    }
  });
};

/////////////////////////////////
//// STATE CHANGE FUNCTIONS ////
///////////////////////////////

const dispatch = (dispatchedEvent: Event): void => {
  const { event, payload } = dispatchedEvent;
  switch (event) {
    case 'setLectureTimeslot': {
      lessons[payload.lessonId].timeslot = payload.timeslot;
      break;
    }
    case 'removeLectureTimeslot': {
      lessons[payload.lessonId].timeslot = null;
      break;
    }
    default:
      throw new Error(`Invalid event type: ${event}`);
  }
};

//////////////////
//// EXPORTS ////
////////////////

const timetable: TimeTable = {
  fromWeeklyLoad,
  dispatch,
  get maxPeriods() {
    return maxPeriods;
  },
  get lessons() {
    return lessons;
  },
  get blockedTimeslots() {
    return blockedTimeslots;
  },
  get classMap() {
    return classMap;
  },
  get subjectMap() {
    return subjectMap;
  }
};

export default timetable;
