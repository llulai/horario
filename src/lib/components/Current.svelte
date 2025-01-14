<script lang="ts">
  import Scheduler from './Scheduler.svelte';
  import UnassignedCourses from './UnassignedCourses.svelte';
  import UnassignedLectures from './UnassignedLectures.svelte';

  import timetable from '$lib/state/timetable.svelte';
  import currently from '$lib/state/currently.svelte';
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 px-12 py-6">
  {#if currently.selected}
    <div class="pl-4 text-[24px]">{currently.selected.name}</div>
    <div class="flex flex-col flex-wrap items-center gap-6">
      {#if currently.selected.kind === 'classGroup'}
        <Scheduler
          assignedSchedule={timetable.byClass[currently.selected.name].assignedSchedule}
          blockedSchedule={timetable.byClass[currently.selected.name].blockedSchedule}
          show="subject"
        />
      {:else}
        <Scheduler
          assignedSchedule={timetable.byTeacher[currently.selected.name].assignedSchedule}
          blockedSchedule={timetable.byTeacher[currently.selected.name].blockedSchedule}
          show="classGroup"
        />
      {/if}
      <div class="flex w-[500px] flex-col gap-6">
        {#if currently.selected.kind == 'classGroup'}
          <UnassignedLectures />
        {:else}
          <UnassignedCourses />
        {/if}
      </div>
    </div>
  {/if}
</div>
