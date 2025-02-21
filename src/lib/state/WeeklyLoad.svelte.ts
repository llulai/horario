export type RawWeeklyLoad = {
  gradeName: string;
  teacherName: string;
  subjectName: string;
  weeklyLoad: number;
};

///////////////////
//// SUBJECTS ////
/////////////////

export type RawSubject = {
  name: string;
  code?: string;
};

let Ssubjects = $state<Record<string, RawSubject>>({});

/////////////////
//// GRADES ////
///////////////

export type RawGrade = {
  name: string;
  code?: string;
  periodId?: string;
};

let Sgrades = $state<Record<string, RawGrade>>({});

//////////////////////
//// WEEKLY LOAD ////
////////////////////

type WeeklyLoadEvent =
  | {
      event: 'setSubjectCode';
      payload: { name: string; code: string };
    }
  | {
      event: 'setGradeCode';
      payload: { name: string; code: string };
    }
  | {
      event: 'setGradePeriod';
      payload: { name: string; periodId: string };
    }
  | {
      event: 'loadWeeklyLoad';
      payload: { weeeklyLoads: RawWeeklyLoad[] };
    };

export type WeeklyLoad = {
  subjects: RawSubject[];
  grades: RawGrade[];
  subjectsReady: boolean;
  gradesReady: boolean;
  dispatch: (event: WeeklyLoadEvent) => void;
};

// this function loads the timetable from a list of weekly loads
const fromWeeklyLoad = (weeklyLoads: RawWeeklyLoad[]) => {
  const newGrades: Record<string, RawGrade> = {};
  const newSubjects: Record<string, RawSubject> = {};

  weeklyLoads.forEach((load) => {
    // update grades
    if (!(load.gradeName in newGrades)) {
      newGrades[load.gradeName] = {
        name: load.gradeName
      };
    }

    // update subjects
    if (!(load.subjectName in newSubjects)) {
      newSubjects[load.subjectName] = { name: load.subjectName };
    }
  });

  Sgrades = newGrades;
  Ssubjects = newSubjects;
};

export const weeklyLoad: WeeklyLoad = {
  get subjects() {
    return Object.values(Ssubjects);
  },
  get grades() {
    return Object.values(Sgrades);
  },
  get subjectsReady() {
    return Object.values(Ssubjects).filter((subject) => subject.code === undefined).length === 0;
  },
  get gradesReady() {
    return (
      Object.values(Sgrades).filter(
        (grade) => grade.code === undefined || grade.periodId === undefined
      ).length === 0
    );
  },
  dispatch(dispatchedEvent: WeeklyLoadEvent) {
    const { event, payload } = dispatchedEvent;
    switch (event) {
      case 'loadWeeklyLoad': {
        const { weeeklyLoads } = dispatchedEvent.payload;
        fromWeeklyLoad(weeeklyLoads);
        break;
      }
      case 'setGradePeriod': {
        const { name, periodId } = payload;
        Sgrades[name].periodId = periodId;
        break;
      }
      case 'setSubjectCode': {
        const { name, code } = payload;
        Ssubjects[name].code = code;
        break;
      }
      case 'setGradeCode': {
        const { name, code } = payload;
        Sgrades[name].code = code;
        break;
      }
    }
  }
};
