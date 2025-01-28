<script lang="ts">
  import { getByTimeslot, type ByTimeslot } from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import { timetable, type Lesson, type BlockedTimeslot } from '$lib/state/Timetable.svelte';

  const {
    name,
    lessons,
    blockedTimeslots
  }: { name: string; lessons: Lesson[]; blockedTimeslots: BlockedTimeslot[] } = $props();

  const days = [1, 2, 3, 4, 5] as const;
  const periods = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

  const assignedLessons: ByTimeslot<Lesson | null> = $derived.by(() => {
    // put the assigned lessons into a `ByTimeslot` map for easier manipulation
    const lessonsByTimeslot: ByTimeslot<Lesson | null> = getByTimeslot(timetable.maxPeriods, null);

    lessons.forEach((lesson) => {
      if (lesson.timeslot) {
        const [day, period] = lesson.timeslot;
        lessonsByTimeslot[day][period] = lesson;
      }
    });

    return lessonsByTimeslot;
  });

  const assigneBlockedTimeslots: ByTimeslot<BlockedTimeslot | undefined> = $derived.by(() => {
    // put the assigned blocked timeslots into a `ByTimeslot` map for easier manipulation
    const blockedTimeslotsByTimeslot: ByTimeslot<BlockedTimeslot | undefined> = getByTimeslot(
      timetable.maxPeriods,
      undefined
    );

    if (currently.selected) {
      const { kind } = currently.selected;
      if (kind === 'teacher') {
        blockedTimeslots.forEach((blockedTimeslot) => {
          const [day, period] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][period] = blockedTimeslot;
        });
      }

      if (kind === 'grade') {
        blockedTimeslots.forEach((blockedTimeslot) => {
          const [day, period] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][period] = blockedTimeslot;
        });
      }
    }

    return blockedTimeslotsByTimeslot;
  });

  const show = $derived(currently.selected?.kind === 'teacher' ? 'subjectName' : 'gradeName');
</script>

<div class="mx-auto flex flex-col justify-center gap-1">
  <div class="truncate text-center">
    {name}
  </div>

  <!-- calendar header -->
  <div class="flex w-full flex-col items-end">
    <div class="grid grid-cols-5 gap-1 text-[8px]">
      <p class="w-6 text-center">L</p>
      <p class="w-6 text-center">M</p>
      <p class="w-6 text-center">M</p>
      <p class="w-6 text-center">J</p>
      <p class="w-6 text-center">V</p>
    </div>
  </div>

  <!-- calendar body -->

  <div class="grid grid-cols-[min-content_1fr] grid-rows-1 gap-1">
    <div class="flex flex-col gap-1">
      {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
        <div class="h-3 text-[8px]">{period}</div>
      {/each}
    </div>

    <div class="grid grid-cols-[repeat(5,24px)] grid-rows-[repeat(8,12px)] gap-1">
      {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
        {#each days as day}
          {#if assignedLessons[day][period]}
            <div
              class="flex flex-col items-center justify-center rounded-[2px] bg-[#6B7280] text-[10px] text-white"
            >
              {assignedLessons[day][period][show]}
            </div>
          {:else if assigneBlockedTimeslots[day][period]}
            <div></div>
          {:else}
            <div class="rounded-[2px] bg-[#FAFAFA]"></div>
          {/if}
        {/each}
      {/each}
    </div>
  </div>
</div>
