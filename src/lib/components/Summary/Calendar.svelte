<script lang="ts">
  import { getByTimeslot, type ByTimeslot } from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import {
    type Lesson,
    type BlockedTimeslot,
    subjects,
    type Block
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
    maxBlocks,
    small = false,
    periodName = ''
  }: {
    kind: 'teacher' | 'grade';
    name: string;
    lessons: Lesson[];
    blockedTimeslots: BlockedTimeslot[];
    maxBlocks: Block;
    small: boolean;
    periodName?: string;
  } = $props();

  const days = [1, 2, 3, 4, 5] as const;
  const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

  const assignedLessons: ByTimeslot<Lesson | null> = $derived.by(() => {
    // put the assigned lessons into a `ByTimeslot` map for easier manipulation
    const lessonsByTimeslot: ByTimeslot<Lesson | null> = getByTimeslot(maxBlocks, null);

    lessons.forEach((lesson) => {
      if (lesson.timeslot) {
        const [day, block] = lesson.timeslot;
        lessonsByTimeslot[day][block] = lesson;
      }
    });

    return lessonsByTimeslot;
  });

  const assigneBlockedTimeslots: ByTimeslot<BlockedTimeslot | undefined> = $derived.by(() => {
    // put the assigned blocked timeslots into a `ByTimeslot` map for easier manipulation
    const blockedTimeslotsByTimeslot: ByTimeslot<BlockedTimeslot | undefined> = getByTimeslot(
      maxBlocks,
      undefined
    );

    if (currently.selected) {
      const { kind } = currently.selected;
      if (kind === 'teacher') {
        blockedTimeslots.forEach((blockedTimeslot) => {
          const [day, block] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][block] = blockedTimeslot;
        });
      }

      if (kind === 'grade') {
        blockedTimeslots.forEach((blockedTimeslot) => {
          const [day, block] = blockedTimeslot.timeslot;
          blockedTimeslotsByTimeslot[day][block] = blockedTimeslot;
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
    small ? 'grid grid-cols-[repeat(5,36px)] gap-1' : 'grid grid-cols-[repeat(5,50px)] gap-1'
  );
</script>

<div class="mx-auto flex flex-col justify-start gap-2 rounded-xl bg-white p-5">
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
      <div class="flex flex-row items-start gap-2">
        {name}
        {#if periodName}
          <div class={`${small ? 'text-[10px]' : 'text-[12px]'} text-[#545755]`}>
            ({periodName})
          </div>
        {/if}
      </div>
    </button>
    <!-- tag -->
    <Tags {small} {kind} {name} />
  </div>

  <div class="flex flex-row items-center gap-1">
    <!-- completion bar -->
    <CompletionBar {kind} {name} />
    <!-- <!-- completion -->
    <Completion {kind} {name} {small} />
  </div>

  <div class="flex flex-row gap-2">
    <!-- blocks -->
    <div class="flex h-full flex-col items-center justify-end gap-1">
      {#each blocks.filter((p) => p <= maxBlocks) as block}
        <div
          class={`${small ? 'h-[18px]' : 'h-5'} flex flex-row items-center justify-center text-[12px] text-[#6B7280]`}
        >
          {block}
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

      <div
        class={grid}
        style={`grid-template-rows: repeat(${maxBlocks}, ${small ? '18px' : '20px'})`}
      >
        {#each blocks.filter((p) => p <= maxBlocks) as block}
          {#each days as day}
            {#if assignedLessons[day][block]}
              <div
                class={`flex flex-col items-center justify-center rounded-[2px] text-[10px] font-semibold ${getColor(assignedLessons[day][block][show], show)}`}
              >
                {show === 'subjectName'
                  ? subjects.byName[assignedLessons[day][block][show]].code
                  : assignedLessons[day][block][show]}
              </div>
            {:else if assigneBlockedTimeslots[day][block]}
              <div></div>
            {:else}<div class="rounded-[2px] bg-[#EDF0EF]"></div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  </div>
</div>
