<script lang="ts">
  import ArrowDownTray from '$lib/components/Icons/ArrowDownTray.svelte';
  import Logo from '$lib/components/Icons/Logo.svelte';
  import Plus from '$lib/components/Icons/Plus.svelte';
  import currently from '$lib/state/currently.svelte';

  let selectedCourses = $derived(currently.selected?.name === 'grades');
  let selectedTeachers = $derived(currently.selected?.name === 'teachers');

  const { showTimetableButtons } = $props<{ showTimetableButtons: boolean }>();
</script>

<div
  class="flex h-16 flex-row items-center justify-between border-b border-[#E1E6E4] bg-white px-8"
>
  <a href="/" data-sveltekit-reload class="flex flex-shrink-0 flex-row gap-[10px]">
    <Logo h={30} w={31} />
    <div class="flex items-center justify-center text-[18px] font-bold text-[#1D1F1E]">
      La Hora del Horario
    </div>
  </a>
  {#if showTimetableButtons}
    <div class="flex h-full flex-row items-start gap-14 pt-4 font-bold text-[#545755]">
      <!-- Grades -->
      <button
        disabled={selectedCourses}
        class="flex h-10 flex-col items-center justify-center gap-2"
        onclick={() => {
          currently.selectCourses();
        }}
      >
        <p>Cursos</p>
        <div class={`size-1 rounded-full ${selectedCourses ? 'bg-[#008744]' : 'bg-white'}`}></div>
      </button>

      <!-- Teachers -->
      <button
        disabled={selectedTeachers}
        class="flex h-10 flex-col items-center justify-center gap-2"
        onclick={() => {
          currently.selectTeachers();
        }}
      >
        <p>Profesores</p>
        <div class={`size-1 rounded-full ${selectedTeachers ? 'bg-[#008744]' : 'bg-white'}`}></div>
      </button>
    </div>
    <div class="flex flex-row gap-10">
      <!-- export timetable -->
      <button
        class="flex w-fit flex-row items-center gap-2 rounded-[8px] py-2 pl-4 pr-6 text-[14px] font-semibold text-[#545755]"
      >
        <ArrowDownTray h={24} w={24} />
        <p>Exportar Horario</p>
      </button>
      <!-- new timetable -->
      <button
        class="flex w-fit flex-row items-center gap-2 rounded-[8px] bg-[#1D1F1E] py-2 pl-4 pr-6 text-[14px] font-semibold text-white"
      >
        <Plus h={24} w={24} />
        <p>Nuevo Horario</p>
      </button>

      <!-- logout -->
      <!-- <form method="post" action="account?/signout" use:enhance={handleSignOut}> -->
      <!--   <button -->
      <!--     type="submit" -->
      <!--     class="w-fit rounded-[2px] bg-red-500 px-3 py-1 text-[12px] font-medium text-white" -->
      <!--     disabled={loading}>Salir</button -->
      <!--   > -->
      <!-- </form> -->
    </div>
  {/if}
</div>
