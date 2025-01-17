<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import timetable from '$lib/state/timetable.svelte';
  import Schedule from '$lib/components/Schedule/Schedule.svelte';
  import { formatComplexity } from '$lib/utils';
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 border-r border-gray-200 px-12 py-6">
  <div class="text-[24px]">Cursos</div>
  <div class="flex flex-row flex-wrap justify-center gap-6">
    {#each Object.keys(timetable.byClass) as course}
      <div class="flex flex-col items-center gap-1">
        <div class="pl-4 text-[12px]">{course}</div>
        <div class="pl-4 text-[10px]">
          complexity: {formatComplexity(timetable.problemScale.byClass[course])}
        </div>
        <div class="pl-4 text-[10px]">
          {timetable.byClass[course].assignedLoad} out of
          {timetable.byClass[course].totalLoad}
        </div>
        <Schedule
          onclick={() => currently.selectClass(course)}
          assignedSchedule={timetable.byClass[course].assignedSchedule}
          blockedSchedule={timetable.byClass[course].blockedSchedule}
          show="subject"
        />
      </div>
    {/each}
  </div>
</div>
