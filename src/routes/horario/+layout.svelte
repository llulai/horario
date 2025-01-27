<script lang="ts">
  import { enhance } from '$app/forms';
  import { lessons } from '$lib/state/Timetable.svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  let { children, data } = $props();

  let loading = $state(false);

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<div class="flex h-20 flex-row items-center justify-between border-b border-gray-200 px-6">
  <div class="text-[24px]">Super Horario</div>

  <!-- Grades -->
  <div>
    <select>
      <option>Curso</option>
      {#each Object.keys(lessons.byGrade) as grade}
        <option>{grade}</option>
      {/each}
    </select>
  </div>

  <!-- Teachers -->
  <div>
    <select>
      <option>Profesor</option>
      {#each Object.keys(lessons.byTeacher) as teacher}
        <option>{teacher}</option>
      {/each}
    </select>
  </div>

  <div class="flex flex-row items-center gap-4">
    <pre>{data.session?.user.email}</pre>
    <a href="/account">Cuenta</a>
    <form method="post" action="account?/signout" use:enhance={handleSignOut}>
      <button class="w-fit bg-red-500 px-3 py-2 text-white" disabled={loading}>Salir</button>
    </form>
  </div>
</div>
{@render children()}
