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

export type Schedule = Record<Day, Record<Period, Lecture | null>>;

export type TeacherSchedule = {
  unassigned: Lecture[];
  assigned: Schedule;
};

export type ClassSchedule = {
  unassigned: Lecture[];
  assigned: Schedule;
};

export type CurrentlySelected = {
  kind: 'teacher' | 'classGroup';
  name: string;
};

export type LecturesByCourse = Record<string, ClassSchedule>;
export type LecturesByTeacher = Record<string, ClassSchedule>;
