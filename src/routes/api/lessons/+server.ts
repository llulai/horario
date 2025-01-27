import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  // Create a single supabase client for interacting with your database

  return json([
    { weeklyLoad: 3, teacherName: 'Romina Zúñiga', gradeName: '6ºA', subjectName: 'Ciencias' },
    { weeklyLoad: 3, teacherName: 'Romina Zúñiga', gradeName: '6ºB', subjectName: 'Ciencias' },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '7ºA',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '7ºB',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '6ºA',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '6ºB',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '5ºA',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '5ªB',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '1ºA',
      subjectName: 'Ed. Tecnológica'
    },
    { weeklyLoad: 8, teacherName: 'Romina Zúñiga', gradeName: '2ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Romina Zúñiga', gradeName: '2ºA', subjectName: 'Matemática' },
    { weeklyLoad: 3, teacherName: 'Romina Zúñiga', gradeName: '2ºA', subjectName: 'Historia' },
    {
      weeklyLoad: 1,
      teacherName: 'Romina Zúñiga',
      gradeName: '2ºA',
      subjectName: 'Ed. Tecnológica'
    },
    { weeklyLoad: 3, teacherName: 'Romina Zúñiga', gradeName: '2ºA', subjectName: 'Cs. Naturales' },
    { weeklyLoad: 1, teacherName: 'Romina Zúñiga', gradeName: '2ºA', subjectName: 'Orientación' },
    { weeklyLoad: 8, teacherName: 'Jessica Escobar', gradeName: '2ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Jessica Escobar', gradeName: '2ºB', subjectName: 'Matemática' },
    { weeklyLoad: 3, teacherName: 'Jessica Escobar', gradeName: '2ºB', subjectName: 'Historia' },
    {
      weeklyLoad: 3,
      teacherName: 'Jessica Escobar',
      gradeName: '2ºB',
      subjectName: 'Ciencias Naturales'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Jessica Escobar',
      gradeName: '4ºA',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Jessica Escobar',
      gradeName: '4ºA',
      subjectName: 'Ed. Tecnológica'
    },
    { weeklyLoad: 1, teacherName: 'Jessica Escobar', gradeName: '2ºB', subjectName: 'Orientación' },
    {
      weeklyLoad: 1,
      teacherName: 'Jessica Escobar',
      gradeName: '2ºB',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Jessica Escobar',
      gradeName: '8ºA',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Jessica Escobar',
      gradeName: '8ºB',
      subjectName: 'Ed. Tecnológica'
    },
    { weeklyLoad: 17, teacherName: 'Paola Cofré', gradeName: 'Pre Kínder A' },
    { weeklyLoad: 3, teacherName: 'Paola Cofré', gradeName: '1ºA', subjectName: 'Historia' },
    { weeklyLoad: 8, teacherName: 'Paola Cofré', gradeName: '1ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Paola Cofré', gradeName: '1ºA', subjectName: 'Matemática' },
    { weeklyLoad: 3, teacherName: 'Paola Cofré', gradeName: '1ºA', subjectName: 'Cs. Naturales' },
    { weeklyLoad: 1, teacherName: 'Paola Cofré', gradeName: '1ºA', subjectName: 'Orientación' },
    { weeklyLoad: 22, teacherName: 'Jacqueline Castro', gradeName: 'Kínder A' },
    { weeklyLoad: 8, teacherName: 'Fabiola Reyes', gradeName: '3°A', subjectName: 'Lenguaje' },
    { weeklyLoad: 8, teacherName: 'Fabiola Reyes', gradeName: '3°B', subjectName: 'Lenguaje' },
    { weeklyLoad: 8, teacherName: 'Fabiola Reyes', gradeName: '4°A', subjectName: 'Lenguaje' },
    { weeklyLoad: 8, teacherName: 'Fabiola Reyes', gradeName: '4°B', subjectName: 'Lenguaje' },
    { weeklyLoad: 4, teacherName: 'Fabiola Reyes', gradeName: '6ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 1, teacherName: 'Fabiola Reyes', gradeName: '3ºB', subjectName: 'Orientación' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '5ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '5°B ', subjectName: 'Lenguaje' },
    { weeklyLoad: 2, teacherName: 'Mauro Lucero', gradeName: '6°A', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '6ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '7ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '7ºB', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Mauro Lucero', gradeName: '8ºA', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '8°B', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '1M A', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '1M B', subjectName: 'Lenguaje' },
    { weeklyLoad: 6, teacherName: 'Loreto Jorquera', gradeName: '2M', subjectName: 'Lenguaje' },
    {
      weeklyLoad: 6,
      teacherName: 'Loreto Jorquera',
      gradeName: '3M',
      subjectName: 'Lenguaje electivo'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Loreto Jorquera',
      gradeName: '4M',
      subjectName: 'Lenguaje electivo'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Loreto Jorquera',
      gradeName: '1M B',
      subjectName: 'Orientación'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Liliana Barraza',
      gradeName: '3M',
      subjectName: 'Lenguaje común'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Liliana Barraza',
      gradeName: '4M',
      subjectName: 'Lenguaje  común'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Francia Miranda',
      gradeName: '1ºM B',
      subjectName: 'Matemática'
    },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '5°B', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '6ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '6ºB', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '8ºA', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Francia Miranda', gradeName: '8ºB', subjectName: 'Matemática' },
    { weeklyLoad: 1, teacherName: 'Francia Miranda', gradeName: '7ºA', subjectName: 'Orientación' },
    {
      weeklyLoad: 6,
      teacherName: 'Katherine Rubilar',
      gradeName: '3°A',
      subjectName: 'Matemática'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Katherine Rubilar',
      gradeName: '3°B',
      subjectName: 'Matemática'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Katherine Rubilar',
      gradeName: '4°A',
      subjectName: 'Matemática'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Katherine Rubilar',
      gradeName: '4°B',
      subjectName: 'Matemática'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Katherine Rubilar',
      gradeName: '5ºA',
      subjectName: 'Matemática'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Katherine Rubilar',
      gradeName: '4ºB',
      subjectName: 'Orientación'
    },
    { weeklyLoad: 6, teacherName: 'Teresa Dittus', gradeName: '6°A', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Teresa Dittus', gradeName: '7°B', subjectName: 'Matemática' },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '1M A', subjectName: 'Matemática' },
    {
      weeklyLoad: 3,
      teacherName: 'Valentin  Araya',
      gradeName: '1M B',
      subjectName: 'Matemática '
    },
    { weeklyLoad: 6, teacherName: 'Valentin  Araya', gradeName: '2M', subjectName: 'Matemática' },
    { weeklyLoad: 9, teacherName: 'Valentin  Araya', gradeName: '3M', subjectName: 'Matemática' },
    { weeklyLoad: 9, teacherName: 'Valentin  Araya', gradeName: '4M', subjectName: 'Matemática' },
    { weeklyLoad: 1, teacherName: 'Valentin  Araya', gradeName: '2ºM', subjectName: 'Orientación' },
    { weeklyLoad: 3, teacherName: 'Alejandra Herrera', gradeName: '3ºA', subjectName: 'Historia' },
    { weeklyLoad: 3, teacherName: 'Alejandra Herrera', gradeName: '3ºB', subjectName: 'Historia' },
    { weeklyLoad: 3, teacherName: 'Alejandra Herrera', gradeName: '4°A', subjectName: 'Historia' },
    { weeklyLoad: 3, teacherName: 'Alejandra Herrera', gradeName: '4°B', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '5°A', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '5°B', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '6°B', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Alejandra Herrera', gradeName: '6ºA', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '7°A', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '7°B', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '8°A', subjectName: 'Historia' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '1M A', subjectName: 'Historia ' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '1M B', subjectName: 'Historia ' },
    { weeklyLoad: 4, teacherName: 'Javiera Yañez', gradeName: '2M', subjectName: 'Historia ' },
    {
      weeklyLoad: 2,
      teacherName: 'Javiera Yañez',
      gradeName: '3M',
      subjectName: 'Formación Ciudadana'
    },
    { weeklyLoad: 1, teacherName: 'Javiera Yañez', gradeName: '3º M', subjectName: 'Orientación' },
    { weeklyLoad: 4, teacherName: 'Yuri Quintupurrai', gradeName: '8°B', subjectName: 'Historia' },
    {
      weeklyLoad: 2,
      teacherName: 'Yuri Quintupurrai',
      gradeName: '4ºM',
      subjectName: 'Formación Ciudadana'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Yuri Quintupurrai',
      gradeName: '3M/4M',
      subjectName: 'Electivo'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Yuri Quintupurrai',
      gradeName: '4M',
      subjectName: 'Orientación'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '3ºA',
      subjectName: 'Cs. Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '3ºB',
      subjectName: 'Cs. Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '4°A',
      subjectName: 'Cs. Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '4°B',
      subjectName: 'Cs. Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '5°A',
      subjectName: 'Cs. Naturales'
    },
    {
      weeklyLoad: 3,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '5°B',
      subjectName: 'Cs. Naturales'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '4ºA',
      subjectName: 'Orientación'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '6°A',
      subjectName: 'Matemática'
    },
    {
      weeklyLoad: 6,
      teacherName: 'Ana Luisa Barraza',
      gradeName: '7°B',
      subjectName: 'Matemática'
    },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '7ºA', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '7ºB', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '8ºA', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '8°B', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '1M A', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '1M B', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Pamela Díaz', gradeName: '2M', subjectName: 'Química' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '7°A', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '7°B', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '8°A', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '8°B', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1M A', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1M B', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '3M', subjectName: 'Biología' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '4M', subjectName: 'Biología' },
    {
      weeklyLoad: 6,
      teacherName: 'Roberto González',
      gradeName: '3M/4M',
      subjectName: 'Biología electivo'
    },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1M A', subjectName: 'Fisica' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '1M B', subjectName: 'Fisica' },
    { weeklyLoad: 2, teacherName: 'Roberto González', gradeName: '2M', subjectName: 'Fisica' },
    {
      weeklyLoad: 1,
      teacherName: 'Roberto González',
      gradeName: '1M A',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Roberto González',
      gradeName: '1M B',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Roberto González',
      gradeName: '2M',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Roberto González',
      gradeName: '1M A',
      subjectName: 'Orientación'
    },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '7ºB', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '6ºB', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '6ºA', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '5ºA', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Fernando Agurto', gradeName: '5ºB', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Fernando Agurto', gradeName: '4ºA', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Fernando Agurto', gradeName: '4ºB', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Fernando Agurto', gradeName: '3ºB', subjectName: 'Inglés' },
    { weeklyLoad: 2, teacherName: 'Fernando Agurto', gradeName: '3ºA', subjectName: 'Inglés' },
    { weeklyLoad: 1, teacherName: 'Fernando Agurto', gradeName: '2ºB', subjectName: 'Inglés' },
    { weeklyLoad: 1, teacherName: 'Fernando Agurto', gradeName: '2ºA', subjectName: 'Inglés' },
    { weeklyLoad: 1, teacherName: 'Fernando Agurto', gradeName: '1ºA', subjectName: 'Inglés' },
    { weeklyLoad: 1, teacherName: 'Fernando Agurto', gradeName: '5ºA', subjectName: 'Orientación' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '4M', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '3M', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '2M', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '1M A', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '1M B', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '8°A', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '8°B', subjectName: 'Inglés' },
    { weeklyLoad: 3, teacherName: 'Paula Arévalo', gradeName: '7ºA', subjectName: 'Inglés' },
    { weeklyLoad: 1, teacherName: 'Paula Arévalo', gradeName: '8ºA', subjectName: 'Orientación' },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '5°A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '5°B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '4°A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '4°B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '3°A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '3°B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '2°A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Bernardita Contardo',
      gradeName: '2°B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Bernardita Contardo',
      gradeName: '3ºA',
      subjectName: 'Ed. Tecnológica'
    },
    {
      weeklyLoad: 1,
      teacherName: 'Bernardita Contardo',
      gradeName: '3ºB',
      subjectName: 'Ed. Tecnológica'
    },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '4M', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '3M', subjectName: 'Artes Visuales' },
    { weeklyLoad: 2, teacherName: 'Alicia Huerta', gradeName: '2M', subjectName: 'Artes Visuales' },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '1M A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '1M B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '8°A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '8°B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '7°A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '7°B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '6°A',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '6°B',
      subjectName: 'Artes Visuales'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Alicia Huerta',
      gradeName: '1°A',
      subjectName: 'Artes Visuales'
    },
    { weeklyLoad: 1, teacherName: 'Alicia Huerta', gradeName: '8ºB', subjectName: 'Orientación' },
    { weeklyLoad: 3, teacherName: 'Isabel Paillao', gradeName: '2°A', subjectName: 'Ed. Física' },
    { weeklyLoad: 3, teacherName: 'Isabel Paillao', gradeName: '2°B', subjectName: 'Ed. Física' },
    { weeklyLoad: 3, teacherName: 'Isabel Paillao', gradeName: '3°A', subjectName: 'Ed. Física' },
    { weeklyLoad: 3, teacherName: 'Isabel Paillao', gradeName: '3°B', subjectName: 'Ed. Física' },
    { weeklyLoad: 3, teacherName: 'Isabel Paillao', gradeName: '4°A', subjectName: 'Ed. Física' },
    { weeklyLoad: 3, teacherName: 'Isabel Paillao', gradeName: '4°B', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Isabel Paillao', gradeName: '5°A', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Isabel Paillao', gradeName: '5°B', subjectName: 'Ed. Física' },
    { weeklyLoad: 1, teacherName: 'Isabel Paillao', gradeName: '3ºA', subjectName: 'Orientación' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '6°A', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '6°B', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '7°A', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '7°B', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '8°B', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '8°A', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '1M A', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '1M B', subjectName: 'Ed. Física' },
    { weeklyLoad: 2, teacherName: 'Diego Cortés', gradeName: '2M', subjectName: 'Ed. Física' },
    { weeklyLoad: 1, teacherName: 'Diego Cortés', gradeName: '6ºA', subjectName: 'Orientación' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '8°A', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '8°B', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '7°A', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '7°B', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6°A', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6°B', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '5°A', subjectName: 'Música' },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '5°B', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: '4°A', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: '4°B', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: '3°A', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: '3°B', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: '2°A', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: '2°B', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: '1°A', subjectName: 'Música' },
    { weeklyLoad: 2, teacherName: 'Néstor Cayupán', gradeName: 'KÍNDER', subjectName: 'Música' },
    {
      weeklyLoad: 2,
      teacherName: 'Néstor Cayupán',
      gradeName: 'PRE KÍNDER',
      subjectName: 'Música'
    },
    { weeklyLoad: 1, teacherName: 'Néstor Cayupán', gradeName: '6ºB', subjectName: 'Orientación' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '1ºA', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '2°A', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '2°B', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '3°A', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '3°B', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '4°A', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '4°B', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '5°A', subjectName: 'Religión' },
    { weeklyLoad: 2, teacherName: 'Jaime Quintana', gradeName: '5°B', subjectName: 'Religión' },
    { weeklyLoad: 1, teacherName: 'Jaime Quintana', gradeName: '5°B', subjectName: 'Orientación' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '4M', subjectName: 'Filosofía' },
    { weeklyLoad: 2, teacherName: 'Sara Oñate', gradeName: '3M', subjectName: 'Filosofía' },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '2M',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '1M A',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '1M B',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '8°A',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '8°B',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '7°A',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '7°B',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '6°A',
      subjectName: 'Taller de pensamiento'
    },
    {
      weeklyLoad: 2,
      teacherName: 'Sara Oñate',
      gradeName: '6°B',
      subjectName: 'Taller de pensamiento'
    },
    { weeklyLoad: 1, teacherName: 'Sara Oñate', gradeName: '7ºB', subjectName: 'Orientación' }
  ]);
};
