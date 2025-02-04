import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession();

  if (!session) {
    redirect(303, '/');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`full_name, school_name, job_title`)
    .eq('id', session.user.id)
    .single();

  // if the profile is not complete redirect to the account page
  // if (!profile || !profile.full_name || !profile.school_name || !profile.job_title) {
  //   redirect(303, '/account');
  // }

  return { session, profile };
};
