<script lang="ts">
  import ArrowDownTray from '$lib/components/Icons/ArrowDownTray.svelte';
  import Logo from '$lib/components/Icons/Logo.svelte';
  import Plus from '$lib/components/Icons/Plus.svelte';
  import currently from '$lib/state/currently.svelte';
  import type { User } from '@supabase/supabase-js';
  import { AlertDialog } from 'bits-ui';

  let selectedCourses = $derived(currently.selected?.name === 'grades');
  let selectedTeachers = $derived(currently.selected?.name === 'teachers');

  const { user, showTimetableButtons } = $props<{
    user: User | null;
    showTimetableButtons: boolean;
  }>();
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
  {/if}
  <div class="flex flex-row gap-10">
    {#if showTimetableButtons}
      <!-- export timetable -->
      <button class="btn-tertiary btn-small">
        <ArrowDownTray h={24} w={24} />
        <p>Exportar Horario</p>
      </button>

      <!-- new timetable -->
      <AlertDialog.Root>
        <AlertDialog.Trigger class="btn-primary btn-small">
          <Plus h={24} w={24} />
          <p>Nuevo Horario</p>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay class="absolute inset-0 bg-black/40" />

          <AlertDialog.Content
            class="fixed inset-1/2 flex h-fit w-[640px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[12px] bg-white px-20 py-10"
          >
            <AlertDialog.Title>
              <h1 class="text-[32px] font-bold text-[#1D1F1E]">Crear nuevo horario</h1>
            </AlertDialog.Title>
            <AlertDialog.Description
              class="mt-6 w-[480px] text-[16px] font-normal leading-[130%] text-[#616663]"
              >Al crear un nuevo horario se eliminará el horario que tienes ahora. Esta acción no se
              puede deshacer.</AlertDialog.Description
            >

            <form
              class="mt-16 flex flex-row gap-10"
              onsubmit={(event) => {
                event.preventDefault();
                fetch('/api/timetable', { method: 'DELETE' }).then(() => {
                  window.location.reload();
                });
              }}
            >
              <AlertDialog.Cancel class="btn-primary btn-medium w-56 justify-center" type="button"
                >Cancelar</AlertDialog.Cancel
              >
              <AlertDialog.Action class="btn-secondary btn-medium w-56 justify-center" type="submit"
                >Continuar</AlertDialog.Action
              >
            </form>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    {/if}

    <!--logout -->
    {#if user}
      <form method="post" action="account?/signout">
        <button type="submit" class="btn-secondary btn-small">Salir</button>
      </form>
    {/if}
  </div>
</div>
