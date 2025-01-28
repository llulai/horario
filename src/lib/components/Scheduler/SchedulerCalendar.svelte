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
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

  const availableLessons: Lesson[] = $derived.by(() => {
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
    const lessonsByTimeslot: ByTimeslot<Lesson | null> = getByTimeslot(timetable.maxPeriods, null);

    availableLessons.forEach((lesson) => {
      if (lesson.timeslot) {
        const [day, period] = lesson.timeslot;
        lessonsByTimeslot[day][period] = lesson;
      }
    });

    return lessonsByTimeslot;
  });

  const assigneBlockedTimeslots: ByTimeslot<BlockedTimeslot | undefined> = $derived.by(() => {
    const blockedTimeslotsByTimeslot: ByTimeslot<BlockedTimeslot | undefined> = getByTimeslot(
      timetable.maxPeriods,
      undefined
    );

    if (currently.selected) {
      const { kind, name } = currently.selected;
      if (kind === 'teacher') {
        blockedTimeslots.byTeacher[name]?.forEach((blockedTimeslot) => {
          const [day, period] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][period] = blockedTimeslot;
        });
      }

      if (kind === 'grade') {
        blockedTimeslots.byGrade[name]?.forEach((blockedTimeslot) => {
          const [day, period] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][period] = blockedTimeslot;
        });
      }
    }

    return blockedTimeslotsByTimeslot;
  });

  const show = $derived(currently.selected?.kind === 'teacher' ? 'gradeName' : 'subjectName');
</script>

<!-- calendar header -->
<div class="flex w-full flex-col px-[61px]">
  <div class="grid grid-cols-5 gap-3 text-[20px]"></div>
</div>

<!-- calendar body -->
<div class="grid w-full grid-cols-[61px_948px_61px]">
  <div class={`gric-cols-1 grid grid-rows-${timetable.maxPeriods} gap-3 text-[20px]`}>
    {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
      <div class="flex h-10 flex-col justify-center">
        <p class="h-fit text-center">{period}</p>
      </div>
    {/each}
  </div>
  <div class={`grid grid-cols-5 grid-rows-${timetable.maxPeriods} gap-3`}>
    {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
      {#each days as day}
        {#if assignedLessons[day][period]}
          <LessonCard lesson={assignedLessons[day][period]} {show} />
        {:else if currently.blocking}
          <BlockingBlock {day} {period} blockedTimeslot={assigneBlockedTimeslots[day][period]} />
        {:else if assigneBlockedTimeslots[day][period]}
          <div></div>
        {:else}
          <TargetPeriodBlock {day} {period} />
        {/if}
      {/each}
    {/each}
  </div>
</div>
