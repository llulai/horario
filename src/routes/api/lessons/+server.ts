import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// import { read, utils } from 'xlsx';
//
// type RawLesson = {
//   PROFESOR: string;
//   CURSO: string;
//   ASIGNATURA: string;
//   HORAS: number;
// };
//
// type ParsedLesson = {
//   weeklyLoad: number;
//   teacherName: string;
//   gradeName: string;
//   subjectName: string;
// };

// FIXME: get suggested subject and classGroup names using openAI
// FIXME: do a lot of checks

// export const POST: RequestHandler = async ({ request }) => {
//   const buffer = await request.arrayBuffer();
//   const nodeBuffer = Buffer.from(buffer);
//
//   const workbook = read(nodeBuffer, { type: 'buffer' });
//
//   const sheetName = workbook.SheetNames[0]; // Get the first sheet name
//   const sheet = workbook.Sheets[sheetName]; // Get the sheet data
//
//   const jsonData: RawLesson[] = utils.sheet_to_json(sheet);
//
//   const parsedLessons: ParsedLesson[] = jsonData.map((rawLesson) => ({
//     weeklyLoad: rawLesson.HORAS,
//     teacherName: rawLesson.PROFESOR,
//     gradeName: rawLesson.CURSO,
//     subjectName: rawLesson.ASIGNATURA
//   }));
//
//   return json(parsedLessons);
// };

export const GET: RequestHandler = async () => {
  // Create a single supabase client for interacting with your database

  return json([
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '1MA', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '1MB', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '2M', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '3M', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '4M', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '6ºA', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '6ºB', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '7ºA', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '7ºB', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '8ºA', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '8ºB', subjectName: 'ArV' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MA', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MB', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '3M', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '4M', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '7ºA', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '7ºB', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '8ºA', subjectName: 'BIO' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '8ºB', subjectName: 'BIO' },
    { weeklyLoad: 3, teacherName: 'Romina Zúñiga', gradeName: '6ºA', subjectName: 'CsN' },
    { weeklyLoad: 3, teacherName: 'Romina Zúñiga', gradeName: '6ºB', subjectName: 'CsN' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '1MA', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '1MB', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '2M', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '6ºA', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '6ºB', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '7ºA', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '7ºB', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '8ºA', subjectName: 'EdF' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '8ºB', subjectName: 'EdF' },
    { weeklyLoad: 1, teacherName: 'Roberto González', gradeName: '1MA', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Roberto González', gradeName: '1MB', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '6ºA', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '6ºB', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '7ºA', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '7ºB', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Jessica Escobar', gradeName: '8ºA', subjectName: 'TEC' },
    { weeklyLoad: 1, teacherName: 'Jessica Escobar', gradeName: '8ºB', subjectName: 'TEC' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '3M', subjectName: 'FIL' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '4M', subjectName: 'FIL' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MA', subjectName: 'FIS' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MB', subjectName: 'FIS' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'FIS' },
    { weeklyLoad: 2, teacherName: 'Javiera Yañez', gradeName: '3M', subjectName: 'CIU' },
    { weeklyLoad: 2, teacherName: 'Javiera Yañez', gradeName: '4M', subjectName: 'CIU' },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '6ºA', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '6ºB', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '7ºA', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '7ºB', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '8ºA', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Yuri Quintupurrai', gradeName: '8ºB', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '1MA', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '1MB', subjectName: 'HIS' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '2M', subjectName: 'HIS' },
    { weeklyLoad: 6, teacherName: 'Yuri Quintupurrai', gradeName: '3M', subjectName: 'ELE' },
    { weeklyLoad: 6, teacherName: 'Roberto González', gradeName: '4M', subjectName: 'ELE' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '1MA', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '1MB', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '2M', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '3M', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '4M', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '6ºA', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '6ºB', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '7ºA', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '7ºB', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '8ºA', subjectName: 'ING' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '8ºB', subjectName: 'ING' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '1MA', subjectName: 'LEN' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '1MB', subjectName: 'LEN' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '2M', subjectName: 'LEN' },
    { weeklyLoad: 2, teacherName: 'Mauro Lucero', gradeName: '6ºA', subjectName: 'LEN' },
    { weeklyLoad: 4, teacherName: 'Fabiola Reyes', gradeName: '6ºA', subjectName: 'LEN' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '6ºB', subjectName: 'LEN' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '7ºA', subjectName: 'LEN' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '7ºB', subjectName: 'LEN' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '8ºA', subjectName: 'LEN' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '8ºB', subjectName: 'LEN' },
    { weeklyLoad: 3, teacherName: 'Liliana Barraza', gradeName: '4M', subjectName: 'LCM' },
    { weeklyLoad: 3, teacherName: 'Liliana Barraza', gradeName: '3M', subjectName: 'LCM' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '3M', subjectName: 'LEL' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '4M', subjectName: 'LEL' },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '1MA', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '2M', subjectName: 'MAT' },
    { weeklyLoad: 9, teacherName: 'Valentin  Araya', gradeName: '3M', subjectName: 'MAT' },
    { weeklyLoad: 9, teacherName: 'Valentin  Araya', gradeName: '4M', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Teresa Dittus', gradeName: '6ºA', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '6ºB', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Teresa Dittus', gradeName: '7ºB', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '8ºA', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '8ºB', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '7ºA', subjectName: 'MAT' },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '1MB', subjectName: 'MAT' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6ºA', subjectName: 'MUS' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6ºB', subjectName: 'MUS' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '7ºA', subjectName: 'MUS' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '7ºB', subjectName: 'MUS' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '8ºA', subjectName: 'MUS' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '8ºB', subjectName: 'MUS' },
    { weeklyLoad: 1, teacherName: 'Roberto González', gradeName: '1MA', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Loreto Jorquera', gradeName: '1MB', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Javiera Yañez', gradeName: '3M', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Yuri Quintupurrai', gradeName: '4M', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Diego Cortés', gradeName: '6ºA', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6ºB', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Francia Miranda', gradeName: '7ºA', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Sara Oñate', gradeName: '7ºB', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Paula Arévalo', gradeName: '8ºA', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Alicia Huerta', gradeName: '8ºB', subjectName: 'ORI' },
    { weeklyLoad: 1, teacherName: 'Valentin  Araya', gradeName: '2M', subjectName: 'ORI' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '1MA', subjectName: 'QUI' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '1MB', subjectName: 'QUI' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '2M', subjectName: 'QUI' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '7ºA', subjectName: 'QUI' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '7ºB', subjectName: 'QUI' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '8ºA', subjectName: 'QUI' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '8ºB', subjectName: 'QUI' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '1MA', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '1MB', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '2M', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '6ºA', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '6ºB', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '7ºA', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '7ºB', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '8ºA', subjectName: 'PEN' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '8ºB', subjectName: 'PEN' }
  ]);
};
