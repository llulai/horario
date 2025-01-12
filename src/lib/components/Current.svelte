<script lang="ts">
  import type {
    CurrentlySelected,
    LecturesByCourse,
    LecturesByTeacher,
    Timeslot
  } from '$lib/Types';
  import Scheduler from './Scheduler.svelte';
  import SubjectCard from './SubjectCard.svelte';

  const {
    setLectureTimeslot,
    lecturesByCourse,
    lecturesByTeacher,
    currentlySelected
  }: {
    setLectureTimeslot: (id: string, timeslot: Timeslot) => void;
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
          schedule={lecturesByCourse[currentlySelected.name].assigned}
          show="subject"
        />
      {:else}
        <Scheduler
          {setLectureTimeslot}
          schedule={lecturesByTeacher[currentlySelected.name].assigned}
          show="classGroup"
        />
      {/if}
      <div class="flew-row flex w-[272px] flex-wrap gap-2">
        {#if currentlySelected.kind == 'classGroup'}
          {#each lecturesByCourse[currentlySelected.name].unassigned as lecture}
            {#key lecture.id}
              <SubjectCard {lecture} show="subject" />
            {/key}
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>
