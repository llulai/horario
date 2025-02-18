<script lang="ts">
  import { getByTimeslot, type ByTimeslot } from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import {
    timetable,
    type Lesson,
    type BlockedTimeslot,
    subjects
  } from '$lib/state/Timetable.svelte';
  import { getColor } from '$lib/utils/colors';
  import Completion from './Completion.svelte';
  import CompletionBar from './CompletionBar.svelte';
  import Tags from './Tags.svelte';

  const {
    kind,
    name,
    lessons,
    blockedTimeslots,
    small = false
  }: {
    kind: 'teacher' | 'grade';
    name: string;
    lessons: Lesson[];
    blockedTimeslots: BlockedTimeslot[];
    small: boolean;
  } = $props();

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

  const show = $derived(
    currently.selected?.kind === 'teacher' || currently.selected?.name === 'grades'
      ? 'subjectName'
      : 'gradeName'
  );

  const grid = $derived(
    small
      ? 'grid grid-cols-[repeat(5,36px)] grid-rows-[repeat(7,18px)] gap-1'
      : 'grid grid-cols-[repeat(5,50px)] grid-rows-[repeat(7,20px)] gap-1'
  );
</script>

<div class="mx-auto flex flex-col justify-center gap-2 rounded-xl bg-white p-5">
  <!-- summary -->
  <div class="flex flex-row items-center justify-between gap-2">
    <!-- name -->
    <button
      class={`${small ? 'text-[14px]' : 'text-[20px]'} truncate text-left font-semibold text-[#1D1F1E] hover:underline`}
      onclick={() => {
        if (kind === 'teacher') {
          currently.selectTeacher(name);
        } else {
          currently.selectGrade(name);
        }
      }}
    >
      {name}
    </button>
    <!-- tag -->
    <Tags {small} {kind} {name} />
  </div>

  <div class="flex flex-row items-center gap-1">
    <!-- completion bar -->
    <CompletionBar {kind} {name} />

    <!-- completion -->
    <Completion {kind} {name} {small} />
  </div>

  <div class="flex flex-row gap-2">
    <!-- periods -->
    <div class="flex h-full flex-col items-center justify-end gap-1">
      {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
        <div
          class={`${small ? 'h-[18px]' : 'h-5'}flex flex-row items-center justify-center text-[12px] text-[#6B7280]`}
        >
          {period}
        </div>
      {/each}
    </div>

    <div class="flex flex-col gap-1">
      <!-- calendar header -->
      <div class="flex w-full flex-col items-end">
        <div class="font-mono grid grid-cols-5 gap-1 text-[12px] font-semibold text-[#737573]">
          <p class={`${small ? 'w-[36px]' : 'w-[50px]'} text-center`}>L</p>
          <p class={`${small ? 'w-[36px]' : 'w-[50px]'} text-center`}>M</p>
          <p class={`${small ? 'w-[36px]' : 'w-[50px]'} text-center`}>M</p>
          <p class={`${small ? 'w-[36px]' : 'w-[50px]'} text-center`}>J</p>
          <p class={`${small ? 'w-[36px]' : 'w-[50px]'} text-center`}>V</p>
        </div>
      </div>

      <!-- calendar body -->

      <div class={grid}>
        {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
          {#each days as day}
            {#if assignedLessons[day][period]}
              <div
                class={`flex flex-col items-center justify-center rounded-[2px] text-[10px] font-semibold ${getColor(assignedLessons[day][period][show], show)}`}
              >
                {show === 'subjectName'
                  ? subjects.byName[assignedLessons[day][period][show]].code
                  : assignedLessons[day][period][show]}
              </div>
            {:else if assigneBlockedTimeslots[day][period]}
              <div></div>
            {:else}<div class="rounded-[2px] bg-[#EDF0EF]"></div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  </div>
</div>
