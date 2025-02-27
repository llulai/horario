<script lang="ts">
  import { timetable } from '$lib/state/Timetable.svelte';
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';
  import GradesTable from './GradesTable.svelte';
  import PeriodManager from './PeriodManager.svelte';
  import SubjectsTable from './SubjectsTable.svelte';
  import Table from './Table.svelte';
  import WeeklyLoadUpload from './WeeklyLoadUpload.svelte';

  type Step =
    | 'addPeriod'
    | 'uploadWeeklyLoad'
    | 'checkLoadBySubject'
    | 'checkLoadByTeacher'
    | 'addSubjectCodes'
    | 'addGradesBlocks';
  let step = $state<Step>('uploadWeeklyLoad');

  let timetableName = $state<string>('');
  let timetableFile = $state<File | null>(null);

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
  <div class="flex flex-col items-center gap-6">
    <Table weeklyLoad={weeklyLoad.weeklyLoads} by="subject" />
    <button
      type="button"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      onclick={() => {
        step = 'checkLoadByTeacher';
      }}>Comenzar con el horario</button
    >
  </div>
{:else if step === 'checkLoadByTeacher' && weeklyLoad.weeklyLoads}
  <div class="flex flex-col items-center gap-6">
    <Table weeklyLoad={weeklyLoad.weeklyLoads} by="teacher" />
    <button
      type="button"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      onclick={() => {
        step = 'addSubjectCodes';
      }}>Comenzar con el horario</button
    >
  </div>
{:else if step === 'addSubjectCodes' && weeklyLoad.subjects}
  <form
    onsubmit={(event) => {
      event.preventDefault();
      step = 'addGradesBlocks';
    }}
    class="flex flex-col items-center gap-6"
  >
    <SubjectsTable />
    <button
      type="submit"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      >Comenzar con el horario</button
    >
  </form>
{:else if step === 'addGradesBlocks' && weeklyLoad.grades}
  <form
    onsubmit={(event) => {
      event.preventDefault();
      timetable.fromWeeklyLoad(weeklyLoad.weeklyLoads, weeklyLoad.grades, weeklyLoad.subjects);
    }}
    class="flex flex-col items-center gap-6"
  >
    <GradesTable
      openPeriodManager={() => {
        step = 'addPeriod';
      }}
    />
    <button
      type="submit"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      >Comenzar con el horario</button
    >
  </form>
{:else if step === 'addPeriod'}
  <PeriodManager
    closePeriodManager={() => {
      step = 'addGradesBlocks';
    }}
  />
{/if}
