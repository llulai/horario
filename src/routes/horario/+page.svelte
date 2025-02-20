<script lang="ts">
  import {
    blockedTimeslots,
    grades,
    lessons,
    periods,
    subjects,
    timetable,
    Time,
    type Period,
    type Block
  } from '$lib/state/Timetable.svelte';
  import { v4 as uuidv4 } from 'uuid';
  import TimeTableUpload from '$lib/components/TimeTableUpload/TimeTableUpload.svelte';
  import Scheduler from '$lib/components/Scheduler/Scheduler.svelte';
  import Summary from '$lib/components/Summary/Summary.svelte';
  import currently from '$lib/state/currently.svelte';
  import CalendarGrid from '$lib/components/CalendarGrid.svelte';
  import Calendar from '$lib/components/Summary/Calendar.svelte';
  import SubjectsTable from '$lib/components/TimeTableUpload/SubjectsTable.svelte';
  import { onMount } from 'svelte';
  import Tag from '$lib/components/Scheduler/Tag.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import CompletionBar from '$lib/components/Scheduler/CompletionBar.svelte';
  import Completion from '$lib/components/Scheduler/Completion.svelte';
  import availability from '$lib/state/Availability.svelte';

  let addedCodes = $state(false);
  const morningPeriodId = uuidv4();
  const afternoonPeriodId = uuidv4();

  onMount(async () => {
    const data = await fetch('/api/lessons').then((response) => response.json());
    timetable.fromWeeklyLoad(data, 8);

    const morningPeriod: Period = {
      1: [1, new Time(8, 0), new Time(8, 45)],
      2: [2, new Time(8, 45), new Time(9, 30)],
      3: [3, new Time(9, 45), new Time(10, 30)],
      4: [4, new Time(10, 30), new Time(11, 15)],
      5: [5, new Time(11, 30), new Time(12, 15)],
      6: [6, new Time(12, 15), new Time(13, 0)],
      7: [7, new Time(13, 0), new Time(13, 45)],
      8: [8, new Time(13, 45), new Time(14, 30)]
    };

    const afternoonPeriod: Period = {
      1: [1, new Time(14, 0), new Time(14, 45)],
      2: [2, new Time(14, 45), new Time(15, 30)],
      3: [3, new Time(15, 45), new Time(16, 30)],
      4: [4, new Time(16, 30), new Time(17, 15)],
      5: [5, new Time(17, 30), new Time(18, 15)],
      6: [6, new Time(18, 15), new Time(19, 0)]
    };

    periods.dispatch({
      event: 'addPeriod',
      payload: { id: morningPeriodId, period: morningPeriod }
    });
    periods.dispatch({
      event: 'addPeriod',
      payload: { id: afternoonPeriodId, period: afternoonPeriod }
    });

    grades.dispatch({ event: 'setPeriod', payload: { name: '6ºA', periodId: afternoonPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '6ºB', periodId: afternoonPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '7ºA', periodId: afternoonPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '7ºB', periodId: afternoonPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '8ºA', periodId: afternoonPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '8ºB', periodId: afternoonPeriodId } });

    grades.dispatch({ event: 'setPeriod', payload: { name: '1MA', periodId: morningPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '1MB', periodId: morningPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '2M', periodId: morningPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '3M', periodId: morningPeriodId } });
    grades.dispatch({ event: 'setPeriod', payload: { name: '4M', periodId: morningPeriodId } });

    addedCodes = true;
  });

  $inspect(availability);
</script>

{#if lessons.list.length > 0}
  {#if subjects.list.filter((subject) => subject.code?.length !== 3).length > 0 || !addedCodes}
    <form
      onsubmit={(event) => {
        event.preventDefault();
        addedCodes = true;
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
  {:else if currently.selected}
    {#if currently.selected.kind === 'teacher' || currently.selected.kind === 'grade'}
      <div
        class="absolute bottom-0 left-0 right-0 top-16 grid grid-cols-[max-content_1fr] grid-rows-[102px_1fr]"
      >
        <!-- status bar -->
        <div
          class="flew-row col-span-2 flex w-full items-center justify-between border-b border-[#E1E6E4] px-[61px]"
        >
          <div class="flex flex-row items-center gap-3">
            <h2 class="text-[32px] font-bold text-[#1D1F1E]">{currently.selected.name}</h2>
            <Tag kind={currently.selected.kind} name={currently.selected.name} />
          </div>

          <div class="flex w-[580px] flex-row items-center gap-2">
            <CompletionBar kind={currently.selected.kind} name={currently.selected.name} />
            <Completion kind={currently.selected.kind} name={currently.selected.name} />
          </div>

          <div class="flex flex-row gap-2 text-[14px] font-medium text-[#545755]">
            <Toggle
              onChange={() => {
                currently.setBlocking(!currently.blocking);
              }}
            /> Bloquear Períodos
          </div>
        </div>
        <Scheduler />
        <Summary />
      </div>
    {:else if currently.selected.name === 'grades'}
      <div class="absolute inset-x-0 bottom-0 top-16 space-y-8 overflow-scroll bg-[#E1E6E4] p-8">
        <h1 class="text-[32px] font-bold text-[#1D1F1E]">Cursos</h1>
        <CalendarGrid small={false}>
          {#each Object.entries(lessons.byGrade) as [name, gradeLessons]}
            <Calendar
              kind={'grade'}
              {name}
              lessons={gradeLessons}
              blockedTimeslots={blockedTimeslots.byGrade[name]}
              small={false}
              maxBlocks={Object.keys(periods.byGrade[name] ?? { 1: 1 }).length as Block}
              nPeriods={1}
            />
          {/each}
        </CalendarGrid>
      </div>
    {:else}
      <div class="absolute inset-x-0 bottom-0 top-16 space-y-8 overflow-scroll bg-[#E1E6E4] p-8">
        <h1 class="text-[32px] font-bold text-[#1D1F1E]">Profesores</h1>
        <CalendarGrid small={false}>
          {#each Object.entries(lessons.byTeacher) as [name, teacherLessons]}
            <Calendar
              kind={'teacher'}
              {name}
              lessons={teacherLessons}
              blockedTimeslots={blockedTimeslots.byTeacher[name]}
              small={false}
              maxBlocks={Object.keys(Object.values(periods.byTeacher[name])[0]).length as Block}
              nPeriods={Object.keys(periods.byTeacher[name]).length}
            />
          {/each}
        </CalendarGrid>
      </div>
    {/if}
  {/if}
{:else}
  <TimeTableUpload />
{/if}
