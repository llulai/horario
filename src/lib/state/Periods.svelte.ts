import { grades, lessons } from './Timetable.svelte';

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
export type Timeslot = readonly [day: Day, block: Block, start: Time, end: Time];

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
      grades.list.map((grade) => [grade.name, grade.periodId ? Speriods[grade.periodId] : null])
    );
  },
  get byTeacher() {
    const periodIdsByTeacher: Record<string, Set<string>> = {};
    lessons.list.forEach((lesson) => {
      const { teacherName, gradeName } = lesson;

      if (!(teacherName in periodIdsByTeacher)) {
        periodIdsByTeacher[teacherName] = new Set();
      }

      const periodId = grades.byName[gradeName].periodId;
      periodIdsByTeacher[teacherName].add(periodId);
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
