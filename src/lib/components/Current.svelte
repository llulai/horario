<script lang="ts">
  import type {
    CurrentlySelected,
    Lecture,
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
      <div class="flex w-[500px] flex-col gap-6">
        {#if currentlySelected.kind == 'classGroup'}
          {#each Object.entries(lecturesByCourse[currentlySelected.name].unassigned.reduce( (lbt: Record<string, Lecture[]>, lec: Lecture) => {
                if (!(lec.teacher in lbt)) {
                  lbt[lec.teacher] = [];
                }
                lbt[lec.teacher].push(lec);
                return lbt;
              }, {} )) as [teacher, lectures]}
            <div class="flex flex-row gap-2">
              {teacher}
              <div class="flex w-[222px] flex-row flex-wrap gap-2">
                {#each lectures as lecture}
                  {#key lecture.id}
                    <SubjectCard {lecture} show="subject" />
                  {/key}
                {/each}
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>
