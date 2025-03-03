<script lang="ts">
  import Logo from '$lib/components/Icons/Logo.svelte';
  import currently from '$lib/state/currently.svelte';
  import { lessons } from '$lib/state/Timetable.svelte';
  let { children } = $props();

  let selectedCourses = $derived(currently.selected?.name === 'grades');
  let selectedTeachers = $derived(currently.selected?.name === 'teachers');
</script>

<div
  class="flex h-16 flex-row items-center justify-between border-b border-[#E1E6E4] bg-white px-8"
>
  <a href="/" class="flex flex-row gap-[10px]">
    <Logo h={30} w={31} />
    <div class="flex items-center justify-center text-[18px] font-bold text-[#1D1F1E]">
      La Hora del Horario
    </div>
  </a>
  <div class="flex h-full flex-row items-start gap-14 pt-4 font-bold text-[#545755]">
    {#if lessons.list.length > 0}
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
    {/if}
  </div>
  <div class="flex flex-row gap-10">
    <!-- new timetable -->
    <a
      class="flex w-fit flex-row items-center gap-2 rounded-[8px] bg-[#1D1F1E] py-2 pl-4 pr-6 text-[14px] font-semibold text-white"
      href="/login"
    >
      <p>Regístrate</p>
    </a>
  </div>
</div>
{@render children()}
