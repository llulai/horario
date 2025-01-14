<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import timetable from '$lib/state/timetable.svelte';
  import Schedule from './Schedule.svelte';
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 border-r border-gray-200 px-12 py-6">
  <div class="text-[24px]">Profesores</div>
  <div class="flex flex-row flex-wrap justify-start gap-6">
    {#each Object.keys(timetable.byTeacher) as teacher}
      <div class="flex flex-col items-center gap-1">
        <div class="pl-4 text-[12px]">{teacher}</div>
        <Schedule
          onclick={() => currently.selectTeacher(teacher)}
          assignedSchedule={timetable.byTeacher[teacher].assignedSchedule}
          blockedSchedule={timetable.byTeacher[teacher].blockedSchedule}
          show="classGroup"
        />
      </div>
    {/each}
  </div>
</div>
