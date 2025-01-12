<script lang="ts">
  import type {
    CurrentlyDragging,
    CurrentlySelected,
    LecturesByCourse,
    LecturesByTeacher,
    SlotAvailability,
    Timeslot
  } from '$lib/Types';
  import Scheduler from './Scheduler.svelte';
  import UnassignedCourses from './UnassignedCourses.svelte';
  import UnassignedLectures from './UnassignedLectures.svelte';

  const {
    setLectureTimeslot,
    setCurrentlyDragging,
    slotAvailability,
    lecturesByCourse,
    lecturesByTeacher,
    currentlySelected
  }: {
    setLectureTimeslot: (id: string, timeslot: Timeslot) => void;
    setCurrentlyDragging: (newCurrentlyDragging: CurrentlyDragging | null) => void;
    slotAvailability: SlotAvailability | null;
    lecturesByCourse: LecturesByCourse;
    lecturesByTeacher: LecturesByTeacher;
    currentlySelected: CurrentlySelected | null;
  } = $props();
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 px-12 py-6">
  {#if currentlySelected}
    <div class="text-[24px]">{currentlySelected.name}</div>
    <div class="flex flex-col flex-wrap justify-center gap-6">
      {#if currentlySelected.kind === 'classGroup'}
        <Scheduler
          {setLectureTimeslot}
          {setCurrentlyDragging}
          {slotAvailability}
          schedule={lecturesByCourse[currentlySelected.name].assigned}
          show="subject"
        />
      {:else}
        <Scheduler
          {setLectureTimeslot}
          {setCurrentlyDragging}
          {slotAvailability}
          schedule={lecturesByTeacher[currentlySelected.name].assigned}
          show="classGroup"
        />
      {/if}
      <div class="flex w-[500px] flex-col gap-6">
        {#if currentlySelected.kind == 'classGroup'}
          <UnassignedLectures {lecturesByCourse} {currentlySelected} {setCurrentlyDragging} />
        {:else}
          <UnassignedCourses {lecturesByTeacher} {currentlySelected} {setCurrentlyDragging} />
        {/if}
      </div>
    </div>
  {/if}
</div>
