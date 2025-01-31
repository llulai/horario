<script lang="ts">
  import currently from '$lib/state/currently.svelte.js';
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

  let selectedCourses = $derived(currently.selected?.name === 'grades');
  let selectedTeachers = $derived(currently.selected?.name === 'teachers');
</script>

<div class="flex h-10 flex-row items-center justify-between bg-white pl-4 pr-3">
  <div class="flex flex-row gap-20">
    <div class="flex items-center justify-center font-[Fredoka] text-[14px] uppercase">
      La hora del horario
    </div>

    {#if lessons.list.length > 0}
      <div class="flex flex-row gap-4 text-[12px] font-medium">
        <!-- Teachers -->
        <button
          disabled={selectedTeachers}
          class={`flex h-10 flex-row items-center justify-center border-b px-3 ${selectedTeachers ? 'border-red-500}' : 'border-white'}`}
          onclick={() => {
            currently.selectTeachers();
          }}>Profesores</button
        >

        <!-- Grades -->
        <button
          disabled={selectedCourses}
          class={`flex h-10 flex-row items-center justify-center border-b px-3 ${selectedCourses ? 'border-[#6B7280]}' : 'border-white'} text-[#6B7280]"}`}
          onclick={() => {
            currently.selectCourses();
          }}>Cursos</button
        >
      </div>
    {/if}
  </div>
  <div>
    <!-- new timetable -->
    <button
      class="w-fit rounded-[2px] bg-[#E2E8F1] px-3 py-1 text-[12px] font-medium text-[#6B7280]"
      >Nuevo Horario</button
    >
  </div>

  <!-- <div class="flex flex-row items-center gap-4"> -->
  <!--   <pre class="text-[14px]">{data.session?.user.email}</pre> -->
  <!--   <a href="/account">Cuenta</a> -->
  <!--   <form method="post" action="account?/signout" use:enhance={handleSignOut}> -->
  <!--     <button class="w-fit rounded-[2px] bg-red-500 px-3 py-2 text-white" disabled={loading} -->
  <!--       >Salir</button -->
  <!--     > -->
  <!--   </form> -->
  <!-- </div> -->
</div>
{@render children()}
