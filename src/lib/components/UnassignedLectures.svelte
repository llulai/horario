<script lang="ts">
  import type {
    CurrentlyDragging,
    CurrentlySelected,
    Lecture,
    LecturesByCourse,
    Timeslot
  } from '$lib/Types';
  import SubjectCard from './SubjectCard.svelte';

  const {
    setLectureTimeslot,
    setCurrentlyDragging,
    lecturesByCourse,
    currentlySelected
  }: {
    setLectureTimeslot: (id: string, timeslot: Timeslot | undefined) => void;
    setCurrentlyDragging: (newCurrentlyDragging: CurrentlyDragging | null) => void;
    lecturesByCourse: LecturesByCourse;
    currentlySelected: CurrentlySelected;
  } = $props();
</script>

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
          <SubjectCard {lecture} show="subject" {setCurrentlyDragging} {setLectureTimeslot} />
        {/key}
      {/each}
    </div>
  </div>
{/each}
