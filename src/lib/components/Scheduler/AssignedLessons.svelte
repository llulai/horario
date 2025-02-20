<script lang="ts">
  import { type Time, type Lesson, lessons } from '$lib/state/Timetable.svelte';
  import currently from '$lib/state/currently.svelte';
  import LessonCard from './LessonCard.svelte';

  const startTime = [8, 0];
  const endTime = [15, 0];

  const selectedLessons: Lesson[] = $derived.by(() => {
    // get the lessons of the selected teacher or grade

    if (currently.selected) {
      const { kind, name } = currently.selected;
      if (kind === 'teacher') {
        return lessons.byTeacher[name];
      }
      if (kind === 'grade') {
        return lessons.byGrade[name];
      }
    }

    return [];
  });

  const assignedLessons: Lesson[] = $derived(selectedLessons.filter((lesson) => lesson.timeslot));

  let containerWidth = $state(0);
  const bWidth = $derived(containerWidth / 5);

  const getPercentage = (time: Time) => {
    const [hour, minute] = time;
    const [startHour, startMinute] = startTime;
    const [endHour, endMinute] = endTime;
    const timestamp = hour * 60 + minute;
    return (
      ((timestamp - (startHour * 60 + startMinute)) /
        (endHour * 60 + endMinute - startHour * 60 - startMinute)) *
      100
    );
  };
</script>

<div
  class="relative col-start-1 col-end-2 row-start-1 row-end-2 mb-[39px] ml-[112px] mr-8 mt-[68px]"
  bind:clientWidth={containerWidth}
>
  {#each assignedLessons as lesson}
    {#if lesson.timeslot}
      <div
        class="absolute p-1"
        style={`width: ${bWidth}px; left: ${bWidth * (lesson.timeslot[0] - 1)}px; top: ${getPercentage(lesson.timeslot[2])}%; bottom: ${100 - getPercentage(lesson.timeslot[3])}%;`}
      >
        <LessonCard {lesson} />
      </div>
    {/if}
  {/each}
</div>
