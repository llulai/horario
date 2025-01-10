import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { createClient } from '@supabase/supabase-js';

type RawLesson = {
  id: number;
  hours: number;
  lesson_teacher: {
    name: string;
  };
  lesson_course: {
    name: string;
  };
  lesson_subject: {
    name: string;
  };
};

export const GET: RequestHandler = async () => {
  // Create a single supabase client for interacting with your database
  const supabase = createClient(
    'https://qqvucinbvvblpxyefynp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxdnVjaW5idnZibHB4eWVmeW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0Nzc0OTMsImV4cCI6MjA1MjA1MzQ5M30.n2d0-FmshLTin7mcIlwAm_IVuOy6b6d0e-Toe1K8qw0'
  );

  const lessonsQuery = supabase.from('lessons').select(`
		id,
		lesson_teacher:teachers (name),
		lesson_subject:subjects (name),
		lesson_course:courses (name),
		hours`);

  const { data, error } = await lessonsQuery;

  if (error) throw error;

  return json(
    data.map((lesson: RawLesson) => {
      return {
        id: lesson.id,
        hours: lesson.hours,
        teacher: lesson.lesson_teacher.name,
        course: lesson.lesson_course.name,
        subject: lesson.lesson_subject.name
      };
    })
  );
};
