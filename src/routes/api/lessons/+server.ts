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
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '1MA',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '1MB',
      subjectName: 'Artes Visuales'
    },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '2M', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '3M', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '4M', subjectName: 'Artes Visuales' },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '6ºA',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '6ºB',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '7ºA',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '7ºB',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '8ºA',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '8ºB',
      subjectName: 'Artes Visuales'
    },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MA', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MB', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '3M', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '4M', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '7ºA', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '7ºB', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '8ºA', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '8ºB', subjectName: 'Biología' },
    {
      weeklyLoad: 3,
      teacherName: 'Romina Zúñiga',
      gradeName: '6ºA',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Romina Zúñiga',
      gradeName: '6ºB',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '1MA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '1MB',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '2M',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '6ºA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '6ºB',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '7ºA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '7ºB',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '8ºA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Diego Cortés',
      gradeName: '8ºB',
      subjectName: 'Educación Física'
    },
    { weeklyLoad: 1, teacherName: 'Roberto González', gradeName: '1MA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Roberto González', gradeName: '1MB', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '6ºA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '6ºB', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '7ºA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '7ºB', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Jessica Escobar', gradeName: '8ºA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Jessica Escobar', gradeName: '8ºB', subjectName: 'Tecnología' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '3M', subjectName: 'Filosofía' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '4M', subjectName: 'Filosofía' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MA', subjectName: 'Física' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1MB', subjectName: 'Física' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'Física' },
    {
      weeklyLoad: 2,
      teacherName: 'Javiera Yañez',
      gradeName: '3M',
      subjectName: 'Ciencias para la Ciudadanía'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Javiera Yañez',
      gradeName: '4M',
      subjectName: 'Ciencias para la Ciudadanía'
    },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '6ºA', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '6ºB', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '7ºA', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '7ºB', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '8ºA', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Yuri Quintupurrai', gradeName: '8ºB', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '1MA', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '1MB', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '2M', subjectName: 'Historia' },
    { weeklyLoad: 6, teacherName: 'Yuri Quintupurrai', gradeName: '3M', subjectName: 'Electivo' },
    { weeklyLoad: 6, teacherName: 'Roberto González', gradeName: '4M', subjectName: 'Electivo' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '1MA', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '1MB', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '2M', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '3M', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '4M', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '6ºA', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '6ºB', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '7ºA', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '7ºB', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '8ºA', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '8ºB', subjectName: 'Inglés' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '1MA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '1MB', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '2M', subjectName: 'Lenguaje' },
    { weeklyLoad: 2, teacherName: 'Mauro Lucero', gradeName: '6ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 4, teacherName: 'Fabiola Reyes', gradeName: '6ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '6ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '7ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '7ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '8ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '8ºB', subjectName: 'Lenguaje' },
    {
      weeklyLoad: 3,
      teacherName: 'Liliana Barraza',
      gradeName: '4M',
      subjectName: 'Lenguaje Común'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Liliana Barraza',
      gradeName: '3M',
      subjectName: 'Lenguaje Común'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Loreto Jorquera',
      gradeName: '3M',
      subjectName: 'Lenguaje Electivo'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Loreto Jorquera',
      gradeName: '4M',
      subjectName: 'Lenguaje Electivo'
    },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '1MA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '2M', subjectName: 'Matemática' },
    { weeklyLoad: 9, teacherName: 'Valentin  Araya', gradeName: '3M', subjectName: 'Matemática' },
    { weeklyLoad: 9, teacherName: 'Valentin  Araya', gradeName: '4M', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Teresa Dittus', gradeName: '6ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '6ºB', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Teresa Dittus', gradeName: '7ºB', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '8ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '8ºB', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '7ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '1MB', subjectName: 'Matemática' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6ºA', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6ºB', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '7ºA', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '7ºB', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '8ºA', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '8ºB', subjectName: 'Música' },
    {
      weeklyLoad: 1,
      teacherName: 'Roberto González',
      gradeName: '1MA',
      subjectName: 'Orientación'
    },
    { weeklyLoad: 1, teacherName: 'Loreto Jorquera', gradeName: '1MB', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Javiera Yañez', gradeName: '3M', subjectName: 'Orientación' },
    {
      weeklyLoad: 1,
      teacherName: 'Yuri Quintupurrai',
      gradeName: '4M',
      subjectName: 'Orientación'
    },
    { weeklyLoad: 1, teacherName: 'Diego Cortés', gradeName: '6ºA', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6ºB', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Francia Miranda', gradeName: '7ºA', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Sara Oñate', gradeName: '7ºB', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Paula Arévalo', gradeName: '8ºA', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Alicia Huerta', gradeName: '8ºB', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Valentin  Araya', gradeName: '2M', subjectName: 'Orientación' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '1MA', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '1MB', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '2M', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '7ºA', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '7ºB', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '8ºA', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '8ºB', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '1MA', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '1MB', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '2M', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '6ºA', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '6ºB', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '7ºA', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '7ºB', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '8ºA', subjectName: 'Pensamiento' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '8ºB', subjectName: 'Pensamiento' }
  ]);
};
