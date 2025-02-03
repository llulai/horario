<script lang="ts">
  import { blockedTimeslots, lessons } from '$lib/state/Timetable.svelte';
  import TimeTableUpload from '$lib/components/TimeTableUpload/TimeTableUpload.svelte';
  import Scheduler from '$lib/components/Scheduler/Scheduler.svelte';
  import Summary from '$lib/components/Summary/Summary.svelte';
  import currently from '$lib/state/currently.svelte';
  import CalendarGrid from '$lib/components/CalendarGrid.svelte';
  import Calendar from '$lib/components/Summary/Calendar.svelte';
</script>

{#if lessons.list.length > 0}
  {#if currently.selected}
    {#if currently.selected.kind === 'teacher' || currently.selected.kind === 'grade'}
      <div class="absolute bottom-0 left-0 right-0 top-10 grid grid-cols-[1070px_1fr] grid-rows-1">
        <Scheduler />
        <Summary />
      </div>
    {:else if currently.selected.name === 'grades'}
      <div class="absolute inset-x-0 bottom-0 top-10 overflow-scroll bg-[#E2E8F1]">
        <CalendarGrid small={false}>
          {#each Object.entries(lessons.byGrade) as [name, gradeLessons]}
            <Calendar
              kind={'grade'}
              {name}
              lessons={gradeLessons}
              blockedTimeslots={blockedTimeslots.byGrade[name]}
              small={false}
            />
          {/each}
        </CalendarGrid>
      </div>
    {:else}
      <div class="absolute inset-x-0 bottom-0 top-10 overflow-scroll bg-[#E2E8F1]">
        <CalendarGrid small={false}>
          {#each Object.entries(lessons.byTeacher) as [name, teacherLessons]}
            <Calendar
              kind={'teacher'}
              {name}
              lessons={teacherLessons}
              blockedTimeslots={blockedTimeslots.byTeacher[name]}
              small={false}
            />
          {/each}
        </CalendarGrid>
      </div>
    {/if}
  {/if}
{:else}
  <TimeTableUpload />
{/if}
