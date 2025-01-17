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
        <!-- tags -->
        <div class="flex flex-row gap-2">
          {#if timetable.byClass[course].assignedLoad < timetable.byClass[course].totalLoad}
            <!-- low-availability -->
            {#if timetable.byClass[course].unassignedLectures.filter((l) => timetable.problemScale.byLecture[l.id] === 0).length > 0}
              <div class="rounded-[2px] bg-red-100 px-2 text-[10px] text-red-500">conflict</div>

              <!-- conflict -->
            {:else if timetable.byClass[course].unassignedLectures.filter((l) => timetable.problemScale.byLecture[l.id] <= 3).length > 0}
              <div class="rounded-[2px] bg-yellow-100 px-2 text-[10px] text-yellow-500">
                low-availability
              </div>
            {/if}
          {:else}
            <!-- completed -->
            <div class="rounded-[2px] bg-green-100 px-2 text-[10px] text-green-500">completed</div>
          {/if}
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
