<script lang="ts">
  import { enhance } from '$app/forms';
  import currently from '$lib/state/currently.svelte';
  import { lessons } from '$lib/state/Timetable.svelte';
  import type { SubmitFunction } from '@sveltejs/kit';
  let { children, data } = $props();

  let loading = $state(false);
  let selectedGrade = $state<string>('curso');
  let selectedTeacher = $state<string>('profesor');

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<div class="flex h-20 flex-row items-center justify-between bg-[#F9FAFB] px-6">
  <div class="flex flex-row gap-20">
    <div class="text-[24px]">Super Horario</div>

    <div class="flex flex-row gap-4">
      <!-- Grades -->
      <div>
        <select
          class="rounded-[2px]"
          bind:value={selectedGrade}
          onchange={(event) => {
            currently.selectGrade(event.target.value);
            selectedTeacher = 'profesor';
          }}
        >
          <option value="curso">Curso</option>
          {#each Object.keys(lessons.byGrade) as grade}
            <option value={grade}>{grade}</option>
          {/each}
        </select>
      </div>

      <!-- Teachers -->
      <div>
        <select
          class="rounded-[2px]"
          bind:value={selectedTeacher}
          onchange={(event) => {
            currently.selectTeacher(event.target.value);
            selectedGrade = 'curso';
          }}
        >
          <option value="profesor">Profesor</option>
          {#each Object.keys(lessons.byTeacher) as teacher}
            <option value={teacher}>{teacher}</option>
          {/each}
        </select>
      </div>

      <!-- new timetable -->
      <button class="w-fit rounded-[2px] bg-blue-500 px-3 py-2 text-white">Nuevo Horario</button>
    </div>
  </div>

  <div class="flex flex-row items-center gap-4">
    <pre class="text-[14px]">{data.session?.user.email}</pre>
    <a href="/account">Cuenta</a>
    <form method="post" action="account?/signout" use:enhance={handleSignOut}>
      <button class="w-fit rounded-[2px] bg-red-500 px-3 py-2 text-white" disabled={loading}
        >Salir</button
      >
    </form>
  </div>
</div>
{@render children()}
