<script lang="ts">
  import { getByTimeslot, type ByTimeslot } from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import {
    lessons,
    timetable,
    blockedTimeslots,
    type BlockedTimeslot,
    type Lesson
  } from '$lib/state/Timetable.svelte';
  import BlockingBlock from './BlockingBlock.svelte';
  import LessonCard from './LessonCard.svelte';
  import TargetPeriodBlock from './TargetPeriodBlock.svelte';

  const days = [1, 2, 3, 4, 5] as const;
  const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

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

  const assignedLessons: ByTimeslot<Lesson | null> = $derived.by(() => {
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
</script>

<!-- calendar header -->
<div class="flex w-full flex-col px-[61px]">
  <div class="grid grid-cols-5 gap-3 text-[20px]"></div>
</div>

<!-- calendar body -->
<div class="grid w-full grid-cols-[61px_948px_61px]">
  <div class={`gric-cols-1 grid grid-rows-${timetable.maxBlocks} gap-3 text-[20px]`}>
    {#each blocks.filter((p) => p <= timetable.maxBlocks) as block}
      <div class="flex h-10 flex-col justify-center">
        <p class="h-fit text-center">{block}</p>
      </div>
    {/each}
  </div>
  <div class={`grid grid-cols-5 grid-rows-${timetable.maxBlocks} gap-3`}>
    {#each blocks.filter((p) => p <= timetable.maxBlocks) as block}
      {#each days as day}
        {#if assignedLessons[day][block]}
          <LessonCard lesson={assignedLessons[day][block]} />
        {:else if currently.blocking}
          <BlockingBlock {day} {block} blockedTimeslot={assignedBlockedTimeslots[day][block]} />
        {:else if assignedBlockedTimeslots[day][block]}
          <div class="h-10"></div>
        {:else}
          <TargetPeriodBlock {day} {block} />
        {/if}
      {/each}
    {/each}
  </div>
</div>
