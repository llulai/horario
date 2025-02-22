import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { read, utils } from 'xlsx';

type RawLesson = {
  PROFESOR: string;
  CURSO: string;
  ASIGNATURA: string;
  HORAS: number;
};

type ParsedLesson = {
  weeklyLoad: number;
  teacherName: string;
  gradeName: string;
  subjectName: string;
};

// FIXME: get suggested subject and classGroup names using openAI
// FIXME: do a lot of checks

export const POST: RequestHandler = async ({ request }) => {
  const buffer = await request.arrayBuffer();
  const nodeBuffer = Buffer.from(buffer);

  const workbook = read(nodeBuffer, { type: 'buffer' });

  const sheetName = workbook.SheetNames[0]; // Get the first sheet name
  const sheet = workbook.Sheets[sheetName]; // Get the sheet data

  const jsonData: RawLesson[] = utils.sheet_to_json(sheet);

  const parsedLessons: ParsedLesson[] = jsonData.map((rawLesson) => ({
    weeklyLoad: rawLesson.HORAS,
    teacherName: rawLesson.PROFESOR,
    gradeName: rawLesson.CURSO,
    subjectName: rawLesson.ASIGNATURA
  }));

  return json(parsedLessons);
};
