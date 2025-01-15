<script lang="ts">
  import type {
    AvailabilitySchedule,
    BlockedPeriod,
    Day,
    Lecture
  } from '$lib/state/timetable.svelte';
  import SchedulerBlock from '$lib/components/SchedulerBlock.svelte';
  import SubjectCard from '$lib/components/SubjectCard.svelte';
  import currently from '$lib/state/currently.svelte';
  import BlockedPeriodCard from './BlockedPeriodCard.svelte';

  const {
    firstLecture,
    secondLecture,
    firstBlockedPeriod,
    secondBlockedPeriod,
    day,
    periods,
    availability,
    show
  }: {
    firstLecture: Lecture | null;
    secondLecture: Lecture | null;
    firstBlockedPeriod: BlockedPeriod | null;
    secondBlockedPeriod: BlockedPeriod | null;
    day: Day;
    periods: readonly [1, 2] | readonly [3, 4] | readonly [5, 6];
    availability: AvailabilitySchedule;
    show: 'classGroup' | 'subject';
  } = $props();

  const sameLecture = $derived.by(() => {
    return (
      firstLecture?.subject === secondLecture?.subject &&
      firstLecture?.teacher === secondLecture?.teacher &&
      firstLecture?.classGroup === secondLecture?.classGroup
    );
  });

  const bothAvailable = $derived.by(() => {
    return (
      firstLecture === null &&
      secondLecture === null &&
      firstBlockedPeriod === null &&
      secondBlockedPeriod === null
    );
  });
</script>

{#if firstLecture && (sameLecture || firstLecture.duration === 2)}
  <SubjectCard lecture={firstLecture} {show} double={true} rounded={true} />
{:else if bothAvailable && currently.dragging !== null && currently.dragging.kind !== 'blockedPeriod' && currently.dragging.lecture.duration === 2}
  <SchedulerBlock
    {day}
    period={periods[0]}
    isAvailable={currently.dragging !== null
      ? availability[day][periods[0]] && availability[day][periods[1]]
      : null}
  />
{:else}
  <div class="grid grid-cols-1 grid-rows-2 overflow-hidden rounded-[2px] bg-blue-100">
    {#if firstLecture !== null}
      {#key firstLecture.id}
        <SubjectCard lecture={firstLecture} {show} double={false} rounded={false} />
      {/key}
    {:else if firstBlockedPeriod !== null}
      {#key firstBlockedPeriod.id}
        <BlockedPeriodCard blockedPeriod={firstBlockedPeriod} />
      {/key}
    {:else}
      <!-- TODO: fixt isAvailable -->
      <SchedulerBlock
        {day}
        period={periods[0]}
        isAvailable={currently.dragging !== null
          ? (availability[day][periods[0]] &&
              currently.dragging.kind !== 'blockedPeriod' &&
              currently.dragging.lecture.duration === 1) ||
            currently.dragging.kind === 'blockedPeriod'
          : null}
      />
    {/if}
    {#if secondLecture !== null}
      {#key secondLecture.id}
        <SubjectCard lecture={secondLecture} {show} double={false} rounded={false} />
      {/key}
    {:else if secondBlockedPeriod !== null}
      {#key secondBlockedPeriod.id}
        <BlockedPeriodCard blockedPeriod={secondBlockedPeriod} />
      {/key}
    {:else}
      <SchedulerBlock
        {day}
        period={periods[1]}
        isAvailable={currently.dragging !== null
          ? (availability[day][periods[1]] &&
              currently.dragging.kind !== 'blockedPeriod' &&
              currently.dragging.lecture.duration === 1) ||
            currently.dragging.kind === 'blockedPeriod'
          : null}
      />
    {/if}
  </div>
{/if}
