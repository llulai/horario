<script lang="ts">
  import type {
    CurrentlyDragging,
    CurrentlySelected,
    Lecture,
    LecturesByTeacher,
    Timeslot
  } from '$lib/Types';
  import SubjectCard from './SubjectCard.svelte';

  const {
    setCurrentlyDragging,
    setLectureTimeslot,
    lecturesByTeacher,
    currentlySelected
  }: {
    setCurrentlyDragging: (newCurrentlyDragging: CurrentlyDragging | null) => void;
    setLectureTimeslot: (id: string, timeslot: Timeslot | undefined) => void;
    lecturesByTeacher: LecturesByTeacher;
    currentlySelected: CurrentlySelected;
  } = $props();
</script>

{#each Object.entries(lecturesByTeacher[currentlySelected.name].unassigned.reduce( (lbs: Record<string, Lecture[]>, lec: Lecture) => {
      if (!(lec.subject in lbs)) {
        lbs[lec.subject] = [];
      }
      lbs[lec.subject].push(lec);
      return lbs;
    }, {} )) as [subject, lectures]}
  <div class="flex flex-row gap-2">
    {subject}
    <div class="flex w-[222px] flex-row flex-wrap gap-2">
      {#each lectures as lecture}
        {#key lecture.id}
          <SubjectCard {lecture} show="classGroup" {setCurrentlyDragging} {setLectureTimeslot} />
        {/key}
      {/each}
    </div>
  </div>
{/each}
