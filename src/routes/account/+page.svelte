<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';

  const { data, form } = $props();
  let { profile, user } = data;

  let loading = $state(false);
  let fullName = profile?.full_name ?? '';
  let schoolName = profile?.school_name ?? '';
  let jobTitle = profile?.job_title ?? '';

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };

  $inspect('form', form);
  $inspect('profile', profile);
</script>

<div class="flex flex-col items-center gap-10 p-10">
  <form
    class="flex flex-col items-center gap-4"
    method="post"
    action="?/update"
    use:enhance={handleSubmit}
  >
    <h2 class="text-[20px]">Antes de seguir complete su información</h2>

    <div>
      <label for="email">Email</label>
      <input id="email" type="text" value={user?.email} disabled />
    </div>

    <div>
      <label for="fullName">Nombre</label>
      <input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
    </div>

    <div>
      <label for="schoolName">Establecimiento Educacional</label>
      <input id="schoolName" name="schoolName" type="text" value={form?.schoolName ?? schoolName} />
    </div>

    <div>
      <label for="jobTitle">Cargo</label>
      <input id="jobTitle" name="jobTitle" value={form?.jobTitle ?? jobTitle} />
    </div>

    <div>
      <button type="submit" class="w-fit bg-blue-500 px-3 py-2 text-white" disabled={loading}
        >{loading ? 'Cargando...' : 'Actualizar perfil'}</button
      >
    </div>
  </form>

  {#if profile && profile.full_name && profile.school_name && profile.job_title}
    <a class="w-fit bg-green-500 px-3 py-2 text-white" href="/horario">ir a la plataforma</a>
  {/if}

  <form method="post" action="?/signout" use:enhance={handleSignOut}>
    <div>
      <button class="w-fit bg-red-500 px-3 py-2 text-white" disabled={loading}>Salir</button>
    </div>
  </form>
</div>
