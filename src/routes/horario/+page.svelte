<script lang="ts">
  import {
    blockedTimeslots,
    grades,
    lessons,
    periods,
    type Block
  } from '$lib/state/Timetable.svelte';
  import TimeTableUpload from '$lib/components/TimeTableUpload/TimeTableUpload.svelte';
  import Scheduler from '$lib/components/Scheduler/Scheduler.svelte';
  import Summary from '$lib/components/Summary/Summary.svelte';
  import currently from '$lib/state/currently.svelte';
  import CalendarGrid from '$lib/components/CalendarGrid.svelte';
  import Calendar from '$lib/components/Summary/Calendar.svelte';
  import Tag from '$lib/components/Scheduler/Tag.svelte';
  import Toggle from '$lib/components/Toggle.svelte';
  import CompletionBar from '$lib/components/Scheduler/CompletionBar.svelte';
  import Completion from '$lib/components/Scheduler/Completion.svelte';
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
{:else}
  <TimeTableUpload />
{/if}
