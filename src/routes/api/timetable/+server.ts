import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
  const { data: responseData } = await locals.supabase.from('timetable').select().limit(1);

  if (responseData?.length === 0) {
    return json(null);
  }

  if (responseData && responseData.length === 1) {
    const { grades, periods, subjects, lessons, blocked_timeslots } = responseData[0];
    return json({
      grades,
      periods,
      subjects,
      lessons,
      blockedTimeslots: blocked_timeslots
    });
  }

  return error(500, { message: 'Failed to fetch the data' });
};

export const POST: RequestHandler = async ({ request, locals }) => {
  const { grades, periods, lessons, subjects, blockedTimeslots } = await request.json();
  const { user } = await locals.safeGetSession();

  if (user) {
    const { data: responseData, error: responseError } = await locals.supabase
      .from('timetable')
      .upsert({
        id: user.id,
        grades,
        periods,
        subjects,
        lessons,
        blocked_timeslots: blockedTimeslots
      })
      .select();

    if (responseError) {
      return error(500, { message: 'Failed to create the data' });
    }

    return json(responseData);
  }

  return json({ error: 'User not authenticated' });
};

export const DELETE: RequestHandler = async ({ locals }) => {
  const { user } = await locals.safeGetSession();
  if (user) {
    const { error: responseError } = await locals.supabase
      .from('timetable')
      .delete()
      .eq('id', user.id);

    if (responseError === null) {
      return new Response('ok');
    }
  }

  return error(500, { message: 'Failed to delete the data' });
};
