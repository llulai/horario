<script lang="ts">
  import { getByTimeslot, type ByTimeslot } from '$lib/state/Availability.svelte';
  import {
    periods,
    blockedTimeslots,
    type Time,
    type Lesson,
    lessons,
    timetable,
    type BlockedTimeslot
  } from '$lib/state/Timetable.svelte';
  import currently from '$lib/state/currently.svelte';
  import BlockingBlock from './BlockingBlock.svelte';
  import LessonCard from './LessonCard.svelte';
  import TargetPeriodBlock from './TargetPeriodBlock.svelte';

  const { start, end }: { start: Time; end: Time } = $props();

  const days = [1, 2, 3, 4, 5] as const;

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

  const assignedLessonsByTimeslot: ByTimeslot<Lesson | null> = $derived.by(() => {
    // put the assigned lessons into a `ByTimeslot` map for easier manipulation

    const lessonsByTimeslot: ByTimeslot<Lesson | null> = getByTimeslot(timetable.maxBlocks, null);

    selectedLessons.forEach((lesson) => {
      if (lesson.timeslot) {
        const [day, block] = lesson.timeslot;
        lessonsByTimeslot[day][block] = lesson;
      }
    });

    return lessonsByTimeslot;
  });

  const assignedBlockedTimeslots: ByTimeslot<BlockedTimeslot | undefined> = $derived.by(() => {
    // put the assigned blocked timeslots into a `ByTimeslot` map for easier manipulation

    const blockedTimeslotsByTimeslot: ByTimeslot<BlockedTimeslot | undefined> = getByTimeslot(
      timetable.maxBlocks,
      undefined
    );

    if (currently.selected) {
      const { kind, name } = currently.selected;
      if (kind === 'teacher') {
        blockedTimeslots.byTeacher[name]?.forEach((blockedTimeslot) => {
          const [day, block] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][block] = blockedTimeslot;
        });
      }

      if (kind === 'grade') {
        blockedTimeslots.byGrade[name]?.forEach((blockedTimeslot) => {
          const [day, block] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][block] = blockedTimeslot;
        });
      }
    }

    return blockedTimeslotsByTimeslot;
  });

  const period = $derived.by(() => {
    if (currently.dragging) {
      const { gradeName } = currently.dragging;
      return periods.byGrade[gradeName];
    }
  });

  let containerWidth = $state(0);
  const bWidth = $derived(containerWidth / 5);

  const getPercentage = (time: Time) => {
    const [hour, minute] = time;
    const [startHour, startMinute] = start;
    const [endHour, endMinute] = end;
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
  {#if period}
    {#each Object.values(period) as [block, blockStart, blockEnd]}
      {#each days as day}
        <div
          class="absolute p-1"
          style={`width: ${bWidth}px; left: ${bWidth * (day - 1)}px; top: ${getPercentage(blockStart)}%; bottom: ${100 - getPercentage(blockEnd)}%;`}
        >
          {#if assignedLessonsByTimeslot[day][block]}
            <LessonCard lesson={assignedLessonsByTimeslot[day][block]} />
          {:else if currently.blocking}
            <BlockingBlock
              {day}
              {block}
              {blockStart}
              {blockEnd}
              blockedTimeslot={assignedBlockedTimeslots[day][block]}
            />
          {:else if assignedBlockedTimeslots[day][block]}
            <div class="h-10"></div>
          {:else}
            <TargetPeriodBlock {day} {block} {blockStart} {blockEnd} />
          {/if}
        </div>
      {/each}
    {/each}
  {/if}

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
