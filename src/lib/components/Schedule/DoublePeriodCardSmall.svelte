<script lang="ts">
  import type { BlockedPeriod, Lecture } from '$lib/state/timetable.svelte';
  import BlockedPeriodCardSmall from './BlockedPeriodCardSmall.svelte';
  import SubjectCardSmall from './SubjectCardSmall.svelte';

  const {
    firstLecture,
    secondLecture,
    firstBlockedPeriod,
    secondBlockedPeriod,
    show
  }: {
    firstLecture: Lecture | null;
    secondLecture: Lecture | null;
    firstBlockedPeriod: BlockedPeriod | null;
    secondBlockedPeriod: BlockedPeriod | null;
    show: 'classGroup' | 'subject';
  } = $props();

  const sameLecture = $derived.by(() => {
    return (
      firstLecture?.subject === secondLecture?.subject &&
      firstLecture?.teacher === secondLecture?.teacher &&
      firstLecture?.classGroup === secondLecture?.classGroup
    );
  });
</script>

{#if sameLecture && firstLecture}
  <SubjectCardSmall lecture={firstLecture} {show} double={true} rounded={true} />
{:else}
  <div class="flex flex-col overflow-hidden rounded-[2px] bg-gray-100">
    {#if firstLecture !== null}
      {#key firstLecture.id}
        <SubjectCardSmall lecture={firstLecture} {show} double={false} rounded={false} />
      {/key}
    {:else if firstBlockedPeriod !== null}
      {#key firstBlockedPeriod.id}
        <BlockedPeriodCardSmall />
      {/key}
    {:else}
      <div class="h-[12px] w-6 bg-gray-100"></div>
    {/if}
    {#if secondLecture !== null}
      {#key secondLecture.id}
        <SubjectCardSmall lecture={secondLecture} {show} double={false} rounded={false} />
      {/key}
    {:else if secondBlockedPeriod !== null}
      {#key secondBlockedPeriod.id}
        <BlockedPeriodCardSmall />
      {/key}
    {:else}
      <div class="h-[12px] w-6 bg-gray-100"></div>
    {/if}
  </div>
{/if}
