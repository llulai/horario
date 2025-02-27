<script lang="ts">
  import { timetable } from '$lib/state/Timetable.svelte';
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';
  import GradesTable from './GradesTable.svelte';
  import PeriodManager from './PeriodManager.svelte';
  import SubjectsTable from './SubjectsTable.svelte';
  import Table from './Table.svelte';
  import WeeklyLoadUpload from './WeeklyLoadUpload.svelte';

  type Step =
    | 'uploadWeeklyLoad'
    | 'checkLoadBySubject'
    | 'checkLoadByTeacher'
    | 'addSubjectCodes'
    | 'addGradesBlocks';

  let step = $state<Step>('addGradesBlocks');
  let timetableName = $state<string>('');
  let timetableFile = $state<File | null>(null);

  let addPeriod = $state(false);

  const loadWorkload = async () => {
    if (timetableFile) {
      fetch('/api/lessons', {
        method: 'POST',
        body: timetableFile
      })
        .then((response) => response.json())
        .then((rawWeeklyLoad) => {
          step = 'checkLoadBySubject';
          weeklyLoad.dispatch({
            event: 'loadWeeklyLoad',
            payload: { weeeklyLoads: rawWeeklyLoad }
          });
        });
    }
  };

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    timetableFile = target.files?.[0] || null;
  };
</script>

{#if step === 'uploadWeeklyLoad'}
  <WeeklyLoadUpload bind:timetableName bind:timetableFile {loadWorkload} {handleFileChange} />
{:else if step === 'checkLoadBySubject' && weeklyLoad.weeklyLoads}
  <div class="grid grid-cols-[320px_1fr] items-start gap-8 px-8 py-14">
    <div class="flex flex-col">
      <h3 class="text-[14px] font-bold leading-[130%] text-[#616663]">Paso 1 de 4</h3>
      <h1 class="mt-3 text-[40px] font-bold leading-[120%] text-[#1D1F1E]">
        Resumen por asignatura
      </h1>
      <button
        class="btn-primary btn-medium mt-10 w-fit !px-8"
        onclick={() => {
          step = 'checkLoadByTeacher';
        }}>Continuar</button
      >
    </div>
    <Table weeklyLoad={weeklyLoad.weeklyLoads} by="subject" />
  </div>
{:else if step === 'checkLoadByTeacher' && weeklyLoad.weeklyLoads}
  <div class="grid grid-cols-[320px_1fr] items-start gap-8 px-8 py-14">
    <div class="flex flex-col">
      <h3 class="text-[14px] font-bold leading-[130%] text-[#616663]">Paso 2 de 4</h3>
      <h1 class="mt-3 text-[40px] font-bold leading-[120%] text-[#1D1F1E]">
        Resumen por profesores
      </h1>
      <button
        class="btn-primary btn-medium mt-10 w-fit !px-8"
        onclick={() => {
          step = 'addSubjectCodes';
        }}>Continuar</button
      >
    </div>
    <Table weeklyLoad={weeklyLoad.weeklyLoads} by="teacher" />
  </div>
{:else if step === 'addSubjectCodes' && weeklyLoad.subjects}
  <form
    onsubmit={(event) => {
      event.preventDefault();
      step = 'addGradesBlocks';
    }}
    class="grid grid-cols-[320px_1fr] items-start gap-40 px-8 py-14"
  >
    <div class="sticky top-14 flex flex-col">
      <h3 class="text-[14px] font-bold leading-[130%] text-[#616663]">Paso 3 de 4</h3>
      <h1 class="mt-3 text-[40px] font-bold leading-[120%] text-[#1D1F1E]">
        Define un código para cada asignatura
      </h1>
      <button
        disabled={!weeklyLoad.subjectsReady}
        type="submit"
        class="btn-primary btn-medium mt-10 w-fit !px-8">Continuar</button
      >
    </div>
    <SubjectsTable />
  </form>
{:else if step === 'addGradesBlocks' && weeklyLoad.grades}
  <form
    onsubmit={(event) => {
      event.preventDefault();
      timetable.fromWeeklyLoad(weeklyLoad.weeklyLoads, weeklyLoad.grades, weeklyLoad.subjects);
    }}
    class="grid grid-cols-[320px_1fr] items-start gap-40 px-8 py-14"
  >
    <div class="sticky top-14 flex flex-col">
      <h3 class="text-[14px] font-bold leading-[130%] text-[#616663]">Paso 4 de 4</h3>
      <h1 class="mt-3 text-[40px] font-bold leading-[120%] text-[#1D1F1E]">
        Define un código para cada curso
      </h1>
      <div class="flex flex-row gap-4">
        <button
          disabled={!weeklyLoad.gradesReady || !weeklyLoad.subjectsReady}
          type="submit"
          class="btn-primary btn-medium mt-10 w-fit !px-8">Continuar</button
        >
        <button
          type="button"
          class="btn-secondary btn-medium mt-10 w-fit text-nowrap !px-8"
          onclick={() => {
            addPeriod = true;
          }}>Agregar Jornada</button
        >
      </div>
    </div>

    <GradesTable />
  </form>
  {#if addPeriod}
    <PeriodManager
      closePeriodManager={() => {
        addPeriod = false;
      }}
    />
  {/if}
{/if}
