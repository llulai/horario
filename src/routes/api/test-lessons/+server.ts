import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  // Create a single supabase client for interacting with your database

  return json([
    {
      weeklyLoad: 1,
      teacherName: 'Fernanda Cataldo',
      gradeName: '2ºA',
      subjectName: 'Orientación'
    },
    { weeklyLoad: 1, teacherName: 'Laura Escobar', gradeName: '2ºB', subjectName: 'Orientación' },
    {
      weeklyLoad: 1,
      teacherName: 'Felipe Contreras',
      gradeName: '3ºA',
      subjectName: 'Orientación'
    },
    { weeklyLoad: 1, teacherName: 'María Rojas', gradeName: '3ºB', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Claudia Pino', gradeName: '4ºA', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Juan Fuentes', gradeName: '4ºB', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Carolina Muñoz', gradeName: '5ºA', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Patricio Soto', gradeName: '5ºB', subjectName: 'Orientación' },
    { weeklyLoad: 3, teacherName: 'Rodrigo Valenzuela', gradeName: '3ºA', subjectName: 'Historia' },
    { weeklyLoad: 3, teacherName: 'Rodrigo Valenzuela', gradeName: '3ºB', subjectName: 'Historia' },
    { weeklyLoad: 3, teacherName: 'Rodrigo Valenzuela', gradeName: '4ºA', subjectName: 'Historia' },
    { weeklyLoad: 3, teacherName: 'Rodrigo Valenzuela', gradeName: '4ºB', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Rodrigo Valenzuela', gradeName: '5ºA', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Rodrigo Valenzuela', gradeName: '5ºB', subjectName: 'Historia' },
    {
      weeklyLoad: 3,
      teacherName: 'Claudia Pino',
      gradeName: '3ºA',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Claudia Pino',
      gradeName: '3ºB',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Claudia Pino',
      gradeName: '4ºA',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Claudia Pino',
      gradeName: '4ºB',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Claudia Pino',
      gradeName: '5ºA',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Claudia Pino',
      gradeName: '5ºB',
      subjectName: 'Ciencias Naturales'
    },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '2ºA', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '2ºB', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '3ºA', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '3ºB', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '4ºA', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '4ºB', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '5ºA', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Paola Jara', gradeName: '5ºB', subjectName: 'Artes Visuales' },
    { weeklyLoad: 1, teacherName: 'Paola Jara', gradeName: '3ºA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Paola Jara', gradeName: '3ºB', subjectName: 'Tecnología' },
    { weeklyLoad: 8, teacherName: 'María Rojas', gradeName: '3ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 8, teacherName: 'María Rojas', gradeName: '3ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 8, teacherName: 'María Rojas', gradeName: '4ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 8, teacherName: 'María Rojas', gradeName: '4ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 1, teacherName: 'Carolina Muñoz', gradeName: '2ºA', subjectName: 'Inglés' },
    { weeklyLoad: 1, teacherName: 'Carolina Muñoz', gradeName: '2ºB', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Carolina Muñoz', gradeName: '3ºA', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Carolina Muñoz', gradeName: '3ºB', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Carolina Muñoz', gradeName: '4ºA', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Carolina Muñoz', gradeName: '4ºB', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Carolina Muñoz', gradeName: '5ºA', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Carolina Muñoz', gradeName: '5ºB', subjectName: 'Inglés' },
    { weeklyLoad: 6, teacherName: 'Catalina Herrera', gradeName: '5ºB', subjectName: 'Matemática' },
    {
      weeklyLoad: 3,
      teacherName: 'Felipe Contreras',
      gradeName: '2ºA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Felipe Contreras',
      gradeName: '2ºB',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Felipe Contreras',
      gradeName: '3ºA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Felipe Contreras',
      gradeName: '3ºB',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Felipe Contreras',
      gradeName: '4ºA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Felipe Contreras',
      gradeName: '4ºB',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Felipe Contreras',
      gradeName: '5ºA',
      subjectName: 'Educación Física'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Felipe Contreras',
      gradeName: '5ºB',
      subjectName: 'Educación Física'
    },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '2ºA', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '2ºB', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '3ºA', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '3ºB', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '4ºA', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '4ºB', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '5ºA', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Patricio Soto', gradeName: '5ºB', subjectName: 'Religión' },
    {
      weeklyLoad: 3,
      teacherName: 'Laura Escobar',
      gradeName: '2ºB',
      subjectName: 'Ciencias Naturales'
    },
    { weeklyLoad: 3, teacherName: 'Laura Escobar', gradeName: '2ºB', subjectName: 'Historia' },
    { weeklyLoad: 8, teacherName: 'Laura Escobar', gradeName: '2ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Laura Escobar', gradeName: '2ºB', subjectName: 'Matemática' },
    { weeklyLoad: 1, teacherName: 'Laura Escobar', gradeName: '2ºB', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Laura Escobar', gradeName: '4ºA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Laura Escobar', gradeName: '4ºB', subjectName: 'Tecnología' },
    { weeklyLoad: 6, teacherName: 'Juan Fuentes', gradeName: '3ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Juan Fuentes', gradeName: '3ºB', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Juan Fuentes', gradeName: '4ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Juan Fuentes', gradeName: '4ºB', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Juan Fuentes', gradeName: '5ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Maura Carrasco', gradeName: '5ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Maura Carrasco', gradeName: '5ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 2, teacherName: 'Cristián Gutiérrez', gradeName: '2ºA', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Cristián Gutiérrez', gradeName: '2ºB', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Cristián Gutiérrez', gradeName: '3ºA', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Cristián Gutiérrez', gradeName: '3ºB', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Cristián Gutiérrez', gradeName: '4ºA', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Cristián Gutiérrez', gradeName: '4ºB', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Cristián Gutiérrez', gradeName: '5ºA', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Cristián Gutiérrez', gradeName: '5ºB', subjectName: 'Música' },
    {
      weeklyLoad: 3,
      teacherName: 'Fernanda Cataldo',
      gradeName: '2ºA',
      subjectName: 'Ciencias Naturales'
    },
    { weeklyLoad: 3, teacherName: 'Fernanda Cataldo', gradeName: '2ºA', subjectName: 'Historia' },
    { weeklyLoad: 8, teacherName: 'Fernanda Cataldo', gradeName: '2ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Fernanda Cataldo', gradeName: '2ºA', subjectName: 'Matemática' },
    { weeklyLoad: 1, teacherName: 'Fernanda Cataldo', gradeName: '2ºA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Fernanda Cataldo', gradeName: '5ºA', subjectName: 'Tecnología' },
    { weeklyLoad: 1, teacherName: 'Fernanda Cataldo', gradeName: '5ºB', subjectName: 'Tecnología' }
  ]);
};
