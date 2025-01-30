<script lang="ts">
  import { getByTimeslot, type ByTimeslot } from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import { timetable, type Lesson, type BlockedTimeslot } from '$lib/state/Timetable.svelte';
  import { getColor } from '$lib/utils/colors';

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

  const show = $derived(currently.selected?.kind === 'teacher' ? 'subjectName' : 'gradeName');

  const w = $derived(small ? 'w-6' : 'w-9');
  const h = $derived(small ? 'h-3' : 'h-[18px]');
  const grid = $derived(
    small
      ? 'grid grid-cols-[repeat(5,24px)] grid-rows-[repeat(8,12px)] gap-1'
      : 'grid grid-cols-[repeat(5,36px)] grid-rows-[repeat(8,18px)] gap-1'
  );
</script>

<div
  class={`${small ? 'gap-1 py-[9px] pl-1 pr-[9px]' : 'gap-2 py-3 pl-[9px] pr-[22px]'} mx-auto flex flex-row justify-center rounded-[2px] bg-white`}
>
  <!-- periods -->
  <div class="flex h-full flex-col items-center justify-end gap-1">
    {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
      <div
        class={`${h} ${small ? 'text-[8px]' : 'text-[12px]'} flex flex-row items-center justify-center font-mono text-[#6B7280]`}
      >
        {period}
      </div>
    {/each}
  </div>

  <div class={`flex flex-col ${small ? 'gap-2' : 'gap-4'}`}>
    <!-- summary -->
    <div class={`flex flex-col ${small ? 'gap-1' : 'gap-2'}`}>
      <!-- name -->
      <button
        class={`truncate text-center hover:underline ${small ? 'text-[10px]' : 'text-[16px]'}`}
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

      <div class="flex flex-row items-center gap-1">
        <!-- tag -->
        <div class={`${w} flex flex-row items-center justify-center`}>
          <div
            class={`${small ? 'size-3' : 'size-4'} flex flex-row items-center justify-center rounded-full bg-[#E2E8F1] text-[8px] text-[#6B7280]`}
          >
            P
          </div>
        </div>

        <div class="flex h-[2px] flex-grow bg-[#E2E8F1]"></div>

        <!-- completion -->
        <div class={`text-center text-[#6B7280] ${w} ${small ? 'text-[8px]' : 'text-[10px]'}`}>
          10%
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <!-- calendar header -->
      <div class="flex w-full flex-col items-end">
        <div
          class={`grid grid-cols-5 gap-1 font-mono text-[#6B7280] ${small ? 'text-[8px]' : 'text-[12px]'}`}
        >
          <p class={`text-center ${w}`}>L</p>
          <p class={`text-center ${w}`}>M</p>
          <p class={`text-center ${w}`}>M</p>
          <p class={`text-center ${w}`}>J</p>
          <p class={`text-center ${w}`}>V</p>
        </div>
      </div>

      <!-- calendar body -->

      <div class={grid}>
        {#each periods.filter((p) => p <= timetable.maxPeriods) as period}
          {#each days as day}
            {#if assignedLessons[day][period]}
              <div
                class={`flex flex-col items-center justify-center rounded-[2px] text-[10px] text-white ${getColor(assignedLessons[day][period][show], show)}`}
              >
                {assignedLessons[day][period][show]}
              </div>
            {:else if assigneBlockedTimeslots[day][period]}
              <div></div>
            {:else}<div class="rounded-[2px] bg-[#FAFAFA]"></div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  </div>
</div>
