import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  if (!session) {
    redirect(303, '/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`full_name, school_name, job_title`)
    .eq('id', session.user.id)
    .single();

  return { session, profile };
};

export const actions: Actions = {
  update: async ({ request, locals: { supabase, safeGetSession } }) => {
    const formData = await request.formData();
    const fullName = formData.get('fullName') as string;
    const schoolName = formData.get('schoolName') as string;
    const jobTitle = formData.get('jobTitle') as string;

    const { session } = await safeGetSession();

    const { error } = await supabase.from('profiles').upsert({
      id: session?.user.id,
      full_name: fullName,
      school_name: schoolName,
      job_title: jobTitle,
      updated_at: new Date()
    });

    if (error) {
      return fail(500, {
        fullName,
        schoolName,
        jobTitle
      });
    }

    return {
      fullName,
      schoolName,
      jobTitle
    };
  },
  signout: async ({ locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession();
    if (session) {
      await supabase.auth.signOut();
      redirect(303, '/');
    }
  }
};
