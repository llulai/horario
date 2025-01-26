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

enum Day {
  'MONDAY' = 1,
  'TUESDAY' = 2,
  'WEDNESDAY' = 3,
  'THURSDAY' = 4,
  'FRIDAY' = 5
}

type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Timeslot = {
  day: Day;
  period: Period;
};

type Availability = Record<Day, Partial<Record<Period, boolean>>>;

type Lesson = {
  id: string;
  teacherName: string;
  className: string;
  subjectName: string;
  timeslot: Timeslot | null;
};

type ClassMapKeys = WeeklyLoad['className'];
type SubjectMapKeys = WeeklyLoad['subjectName'];
type TeacherMapKeys = WeeklyLoad['teacherName'];

type ClassMap = Record<
  ClassMapKeys,
  { code: string; color: string; availableTimeslots: Availability }
>;

type SubjectMap = Record<SubjectMapKeys, { code: string; color: string }>;

type TeacherMap = Record<
  TeacherMapKeys,
  { code: string; color: string; availableTimeslots: Availability }
>;

type Event =
  | {
      event: 'setLectureTimeslot';
      payload: { lessonId: string; timeslot: Timeslot };
    }
  | {
      event: 'removeLectureTimeslot';
      payload: { lessonId: string };
    };

type TimeTable = {
  lessons: Record<string, Lesson>;
  classMap: ClassMap;
  subjectMap: SubjectMap;
  teacherMap: TeacherMap;
  fromWeeklyLoad: (weeklyLoads: WeeklyLoad[], maxPeriods: Period) => void;
  dispatch: (event: Event) => void;
  // loadFromJSON: (json: string) => void;
  // saveToJSON: () => string;
};

/////////////////////////////////
//// STATE CHANGE FUNCTIONS ////
///////////////////////////////

// generate availability for a day
const generateDayAvailability = (maxPeriods: Period): Partial<Record<Period, true>> => {
  return [...Array(maxPeriods).fill(true)].reduce((av, val, index) => {
    av[index + 1] = val;
    return av;
  }, {});
};

const generateAvailability = (maxPeriods: Period): Availability => {
  return {
    1: generateDayAvailability(maxPeriods),
    2: generateDayAvailability(maxPeriods),
    3: generateDayAvailability(maxPeriods),
    4: generateDayAvailability(maxPeriods),
    5: generateDayAvailability(maxPeriods)
  };
};

////////////////
//// STATE ////
//////////////

let lessons = $state<Record<string, Lesson>>({});
let classMap = $state<ClassMap>({});
let subjectMap = $state<SubjectMap>({});
let teacherMap = $state<TeacherMap>({});

// this function loads the timetable from a list of weekly loads
const fromWeeklyLoad = (weeklyLoads: WeeklyLoad[], maxPeriods: Period) => {
  // clear existing state
  lessons = {};
  classMap = {};
  subjectMap = {};
  teacherMap = {};

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
        color: '',
        availableTimeslots: generateAvailability(maxPeriods)
      };
    }

    // update subjectMap
    if (!(load.subjectName in subjectMap)) {
      subjectMap[load.subjectName] = { code: '', color: '' };
    }

    // update teacherMap
    if (!(load.teacherName in teacherMap)) {
      teacherMap[load.teacherName] = {
        code: '',
        color: '',
        availableTimeslots: generateAvailability(maxPeriods)
      };
    }
  });
};

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
  get lessons() {
    return lessons;
  },
  get classMap() {
    return classMap;
  },
  get subjectMap() {
    return subjectMap;
  },
  get teacherMap() {
    return teacherMap;
  }
};

export default timetable;
