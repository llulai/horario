import { exportTimetable } from '$lib/utils/export';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { utils, write } from 'xlsx';

export const GET: RequestHandler = async ({ locals }) => {
  const { data: responseData } = await locals.supabase.from('timetable').select().limit(1);

  if (responseData?.length === 0) {
    return json(null);
  }

  if (responseData && responseData.length === 1) {
    const { grades, periods, lessons } = responseData[0];
    const timetable = exportTimetable(grades, lessons, periods);
    const workbook = utils.book_new();
    const gradesSheet = utils.aoa_to_sheet(timetable.timetableByGrades);
    const teachersSheet = utils.aoa_to_sheet(timetable.timetableByTeachers);

    utils.book_append_sheet(workbook, gradesSheet, 'Cursos');
    utils.book_append_sheet(workbook, teachersSheet, 'Profesores');

    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Uint8Array(excelBuffer);

    return new Response(blob, {
      headers: {
        'Content-Type': 'application/xlsx',
        'Content-Disposition': `attachment; filename="horario.xlsx"`
      }
    });
  }

  return error(500, { message: 'Failed to fetch the data' });
};
