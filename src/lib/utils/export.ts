// this module exports the timetable into an excel file with two sheets
// one for teachers and another for grades

import { getByTimeslot, type ByTimeslot } from '$lib/state/Availability.svelte';
import {
  Time,
  type Block,
  type Day,
  type DBLesson,
  type Grade,
  type Lesson,
  type Period
} from '$lib/state/Timetable.svelte';

const parseLessons = (lessons: Record<string, DBLesson>): Record<string, Lesson> => {
  const parsedLessons: Record<string, Lesson> = {};

  Object.entries(lessons).forEach(([id, lesson]) => {
    const { timeslot } = lesson;
    const parsedTimeslot =
      timeslot === null
        ? null
        : ([
            timeslot[0],
            timeslot[1],
            new Time(timeslot[2].hour, timeslot[2].minute),
            new Time(timeslot[3].hour, timeslot[3].minute)
          ] as const);
    parsedLessons[id] = { ...lesson, timeslot: parsedTimeslot };
  });

  return parsedLessons;
};

const parsePeriods = (
  periods: Record<
    string,
    Partial<
      Record<Block, [Block, { hour: number; minute: number }, { hour: number; minute: number }]>
    >
  >
) => {
  const parsedPeriods: Record<string, Period> = {};

  Object.entries(periods).forEach(([name, period]) => {
    parsedPeriods[name] = {};
    Object.values(period).forEach(([block, start, end]) => {
      parsedPeriods[name][block] = [
        block,
        new Time(start.hour, start.minute),
        new Time(end.hour, end.minute)
      ];
    });
  });
  return parsedPeriods;
};

const byGrade = (lessons: Record<string, Lesson>) => {
  const byGrade: Record<string, Lesson[]> = {};

  Object.values(lessons).forEach((lesson) => {
    const { gradeName } = lesson;
    if (byGrade[gradeName]) {
      byGrade[gradeName].push(lesson);
    } else {
      byGrade[gradeName] = [lesson];
    }
  });

  return byGrade;
};

const byTeacher = (lessons: Record<string, Lesson>) => {
  const byTeacher: Record<string, Lesson[]> = {};
  Object.values(lessons).forEach((lesson) => {
    const { teacherName } = lesson;
    if (byTeacher[teacherName]) {
      byTeacher[teacherName].push(lesson);
    } else {
      byTeacher[teacherName] = [lesson];
    }
  });

  return byTeacher;
};

const getPeriodsByTeacher = (
  lessons: Record<string, Lesson>,
  grades: Record<string, Grade>,
  periods: Record<string, Period>
) => {
  const periodIdsByTeacher: Record<string, Set<string>> = {};
  Object.values(lessons).forEach((lesson) => {
    const { teacherName, gradeName } = lesson;

    if (!(teacherName in periodIdsByTeacher)) {
      periodIdsByTeacher[teacherName] = new Set();
    }

    if (gradeName in grades) {
      const periodId = grades[gradeName].periodId;

      if (periodId) {
        periodIdsByTeacher[teacherName].add(periodId);
      }
    }
  });

  return Object.fromEntries(
    Object.entries(periodIdsByTeacher).map(([teacherName, periodIds]) => [
      teacherName,
      Object.fromEntries(Array.from(periodIds).map((periodId) => [periodId, periods[periodId]]))
    ])
  );
};

export const exportTimetable = (
  grades: Record<string, Grade>,
  dbLessons: Record<string, DBLesson>,

  dbPeriods: Record<
    string,
    Partial<
      Record<Block, [Block, { hour: number; minute: number }, { hour: number; minute: number }]>
    >
  >
) => {
  //exports the given timetable

  const periods = parsePeriods(dbPeriods);
  const lessons = parseLessons(dbLessons);

  const timetableByGrades: string[][] = [];
  const timetableByTeachers: string[][] = [];
  const periodsByTeacher = getPeriodsByTeacher(lessons, grades, periods);

  Object.entries(byGrade(lessons)).forEach(([gradeName, gradeLessons]) => {
    const grade = grades[gradeName];
    const period = periods[grade.periodId];
    const maxBlocks = Object.keys(period).length as Block;
    const lessonsByTimeslot: ByTimeslot<Lesson | null> = getByTimeslot(maxBlocks, null);

    gradeLessons.forEach((lesson) => {
      if (lesson.timeslot) {
        const [day, block] = lesson.timeslot;
        lessonsByTimeslot[day][block] = lesson;
      }
    });

    // add grade name
    timetableByGrades.push([grade.name]);

    timetableByGrades.push(['p', 'L', 'M', 'M', 'J', 'V']);
    for (let block = 1; block <= maxBlocks; block++) {
      const row = [];
      row.push(`${block}`);
      for (let day = 1; day <= 5; day++) {
        const lesson = lessonsByTimeslot[day as Day][block as Block];
        if (lesson) {
          row.push(lesson.subjectName);
        } else {
          row.push('');
        }
      }
      timetableByGrades.push(row);
    }

    timetableByGrades.push([]);
  });

  Object.entries(byTeacher(lessons)).forEach(([teacherName, teacherLessons]) => {
    const lessonsByPeriod: Record<string, ByTimeslot<Lesson | null>> = {};

    Object.entries(periodsByTeacher[teacherName]).forEach(([periodId, period]) => {
      const maxBlocks = Object.keys(period).length as Block;
      lessonsByPeriod[periodId] = getByTimeslot(maxBlocks, null);
    });

    teacherLessons.forEach((lesson) => {
      const { gradeName, timeslot } = lesson;
      if (timeslot) {
        const [day, block] = timeslot;
        const { periodId } = grades[gradeName];
        lessonsByPeriod[periodId][day][block] = lesson;
      }
    });

    // add teacher name
    Object.entries(periodsByTeacher[teacherName]).forEach(([periodId, period]) => {
      timetableByTeachers.push([teacherName, periodId]);
      timetableByTeachers.push(['p', 'L', 'M', 'M', 'J', 'V']);
      const maxBlocks = Object.keys(period).length as Block;

      for (let block = 1; block <= maxBlocks; block++) {
        const row = [];
        row.push(`${block}`);
        for (let day = 1; day <= 5; day++) {
          const lesson = lessonsByPeriod[periodId][day as Day][block as Block];
          if (lesson) {
            row.push(lesson.gradeName);
          } else {
            row.push('');
          }
        }
        timetableByTeachers.push(row);
      }

      timetableByTeachers.push([]);
    });
  });

  return { timetableByGrades, timetableByTeachers };
};
