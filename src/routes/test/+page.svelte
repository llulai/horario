<script lang="ts">
  import {
    blockedTimeslots,
    grades,
    lessons,
    periods,
    Time,
    type Period,
    type Block,
    timetable
  } from '$lib/state/Timetable.svelte';
  import Scheduler from '$lib/components/Scheduler/Scheduler.svelte';
  import Summary from '$lib/components/Summary/Summary.svelte';
  import currently from '$lib/state/currently.svelte';
  import CalendarGrid from '$lib/components/CalendarGrid.svelte';
  import Calendar from '$lib/components/Summary/Calendar.svelte';
  import { onMount } from 'svelte';
  import Tag from '$lib/components/Scheduler/Tag.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import CompletionBar from '$lib/components/Scheduler/CompletionBar.svelte';
  import Completion from '$lib/components/Scheduler/Completion.svelte';
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';

  const morningPeriodId = 'mañana';
  const afternoonPeriodId = 'tarde';
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

  onMount(async () => {
    const data = await fetch('/api/test-lessons').then((response) => response.json());
    weeklyLoad.dispatch({ event: 'loadWeeklyLoad', payload: { weeeklyLoads: data } });

    weeklyLoad.dispatch({
      event: 'setSubjectCode',
      payload: { name: 'Artes Visuales', code: 'ArV' }
    });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Biología', code: 'BIO' } });
    weeklyLoad.dispatch({
      event: 'setSubjectCode',
      payload: { name: 'Ciencias Naturales', code: 'CsN' }
    });
    weeklyLoad.dispatch({
      event: 'setSubjectCode',
      payload: { name: 'Educación Física', code: 'EdF' }
    });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Tecnología', code: 'TEC' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Filosofía', code: 'FIL' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Física', code: 'FIS' } });
    weeklyLoad.dispatch({
      event: 'setSubjectCode',
      payload: { name: 'Ciencias para la Ciudadanía', code: 'CIU' }
    });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Historia', code: 'HIS' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Electivo', code: 'ELE' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Inglés', code: 'ING' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Lenguaje', code: 'LEN' } });
    weeklyLoad.dispatch({
      event: 'setSubjectCode',
      payload: { name: 'Lenguaje Común', code: 'LCM' }
    });
    weeklyLoad.dispatch({
      event: 'setSubjectCode',
      payload: { name: 'Lenguaje Electivo', code: 'LEL' }
    });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Matemática', code: 'MAT' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Música', code: 'MUS' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Orientación', code: 'ORI' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Química', code: 'QUI' } });
    weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Pensamiento', code: 'PEN' } });

    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '6ºA', code: '6A' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '6ºB', code: '6B' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '7ºA', code: '7A' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '7ºB', code: '7B' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '8ºA', code: '8A' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '8ºB', code: '8B' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '1MA', code: '1MA' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '1MB', code: '1MB' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '2M', code: '2M' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '3M', code: '3M' } });
    weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '4M', code: '4M' } });

    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '6ºA', periodId: afternoonPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '6ºB', periodId: afternoonPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '7ºA', periodId: afternoonPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '7ºB', periodId: afternoonPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '8ºA', periodId: afternoonPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '8ºB', periodId: afternoonPeriodId }
    });

    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '1MA', periodId: morningPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '1MB', periodId: morningPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '2M', periodId: morningPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '3M', periodId: morningPeriodId }
    });
    weeklyLoad.dispatch({
      event: 'setGradePeriod',
      payload: { name: '4M', periodId: morningPeriodId }
    });

    timetable.fromWeeklyLoad(data, weeklyLoad.grades, weeklyLoad.subjects);
  });

  currently.selectCourses();
</script>

{#if lessons.list.length > 0}
  {#if currently.selected}
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

          <div class="flex flex-col gap-2">
            {#if currently.selected.kind === 'teacher'}
              {#each Object.keys(periods.byTeacher[currently.selected.name]) as periodId}
                <div class="flex flex-row gap-2 text-[14px] font-medium text-[#545755]">
                  <Toggle
                    id={periodId}
                    onChange={() => {
                      currently.setBlocking(currently.blocking === periodId ? null : periodId);
                    }}
                  /> Bloquear períodos {periodId}
                </div>
              {/each}
            {:else if currently.selected.kind === 'grade'}
              <div class="flex flex-row gap-2 text-[14px] font-medium text-[#545755]">
                <Toggle
                  id={grades.byName[currently.selected.name].periodId ?? 'holi'}
                  onChange={() => {
                    if (currently.selected && currently.selected.kind === 'grade') {
                      currently.setBlocking(
                        currently.blocking === grades.byName[currently.selected.name].periodId
                          ? null
                          : grades.byName[currently.selected.name].periodId
                      );
                    }
                  }}
                /> Bloquear período
              </div>
            {/if}
          </div>
        </div>
        <Scheduler kind={currently.selected.kind} name={currently.selected.name} />
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
            />
          {/each}
        </CalendarGrid>
      </div>
    {:else}
      <div class="absolute inset-x-0 bottom-0 top-16 space-y-8 overflow-scroll bg-[#E1E6E4] p-8">
        <h1 class="text-[32px] font-bold text-[#1D1F1E]">Profesores</h1>
        <CalendarGrid small={false}>
          {#each Object.entries(lessons.byTeacher) as [name, teacherLessons]}
            {#each Object.entries(periods.byTeacher[name]) as [periodId, period]}
              <Calendar
                kind={'teacher'}
                {name}
                periodName={Object.keys(periods.byTeacher[name]).length > 1 ? periodId : ''}
                lessons={teacherLessons.filter(
                  (lesson) => grades.byName[lesson.gradeName].periodId === periodId
                )}
                blockedTimeslots={blockedTimeslots.byTeacher[name]}
                small={false}
                maxBlocks={Object.keys(period).length as Block}
              />
            {/each}
          {/each}
        </CalendarGrid>
      </div>
    {/if}
  {/if}
{/if}
