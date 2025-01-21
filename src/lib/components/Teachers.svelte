<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import timetable from '$lib/state/timetable.svelte';
  import Schedule from '$lib/components/Schedule/Schedule.svelte';
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 border-r border-gray-200 px-12 py-6">
  <div class="text-[24px]">Profesores</div>
  <div class="flex flex-row flex-wrap justify-start gap-6">
    {#each Object.keys(timetable.byTeacher) as teacher}
      <div class="flex flex-col items-center gap-1">
        <div class="pl-4 text-[12px]">{teacher}</div>
        <!-- <div class="pl-4 text-[10px]"> -->
        <!--   complexity: {formatComplexity(timetable.problemScale.byTeacher[teacher])} -->
        <!-- </div> -->

        <!-- tags -->
        <div class="flex flex-row gap-2">
          <!-- priority -->
          {#if timetable.byTeacher[teacher].assignedLoad < timetable.byTeacher[teacher].totalLoad}
            {#if timetable.byTeacher[teacher].totalLoad / timetable.byTeacher[teacher].availableLoad > 0.8}
              <div class="rounded-[2px] bg-indigo-200 px-2 text-[10px] text-indigo-900">
                priority
              </div>
            {/if}

            <!-- conflict -->
            {#if timetable.byTeacher[teacher].unassignedLectures.filter((l) => timetable.problemScale.byLecture[l.id] === 0).length > 0}
              <div class="rounded-[2px] bg-red-200 px-2 text-[10px] text-red-900">conflict</div>

              <!-- low-availability -->
            {:else if timetable.byTeacher[teacher].unassignedLectures.filter((l) => timetable.problemScale.byLecture[l.id] <= 3).length > 0}
              <div class="rounded-[2px] bg-yellow-200 px-2 text-[10px] text-yellow-900">
                low-availability
              </div>
            {/if}
          {:else}
            <!-- completed -->
            <div class="rounded-[2px] bg-green-200 px-2 text-[10px] text-green-900">completed</div>
          {/if}
        </div>
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
