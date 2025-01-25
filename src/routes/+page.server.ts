import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
  const { session } = await safeGetSession();

  // if the user is already logged in return them to the platform page
  if (session) {
    redirect(303, '/horario');
  }

  return { url: url.origin };
};

export const actions: Actions = {
  default: async (event) => {
    const {
      request,
      locals: { supabase }
    } = event;
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const validEmail = /^[\w-.+]+@([\w-]+.)+[\w-]{2,8}$/.test(email);

    if (!validEmail) {
      return fail(400, { errors: { email: 'Ingrese un email válido por favor' }, email });
    }

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      return fail(400, {
        success: false,
        email,
        message: 'Hubo un error, entre en contacto con soporte.'
      });
    }

    return {
      success: true,
      message: 'Revise su correo con un email con el link para entrar a la plataforma.'
    };
  }
};
