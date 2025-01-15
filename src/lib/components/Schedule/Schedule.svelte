<script lang="ts">
  import type { BlockedSchedule, AssignedSchedule } from '$lib/state/timetable.svelte';
  import BlockedPeriodCardSmall from './BlockedPeriodCardSmall.svelte';
  import DoublePeriodCardSmall from './DoublePeriodCardSmall.svelte';
  import SubjectCardSmall from './SubjectCardSmall.svelte';
  const {
    onclick,
    assignedSchedule,
    blockedSchedule,
    show
  }: {
    onclick: () => void;
    assignedSchedule: AssignedSchedule;
    blockedSchedule: BlockedSchedule;
    show: 'classGroup' | 'subject';
  } = $props();

  const periodPairs = [[1, 2], [3, 4], [5, 6], [7]] as const;
  const days = [1, 2, 3, 4, 5] as const;
</script>

<div
  class="group relative grid grid-flow-row grid-cols-[8px_24px_24px_24px_24px_24px] grid-rows-[10px_24px_24px_24px_12px] gap-1"
>
  <button
    class="absolute inset-0 z-10 hidden flex-row items-center justify-center rounded-[2px] bg-gray-200/90 underline group-hover:flex"
    {onclick}>editar</button
  >
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[8px]">{day}</div>
  {/each}

  {#each periodPairs as periods}
    <div class="flex flex-col gap-[2px] text-[8px]">
      {#each periods as period}
        <div>{period}</div>
      {/each}
    </div>
    {#each days as day}
      {#if periods.length === 2}
        <DoublePeriodCardSmall
          firstLecture={assignedSchedule[day][periods[0]]}
          secondLecture={assignedSchedule[day][periods[1]]}
          firstBlockedPeriod={blockedSchedule[day][periods[0]]}
          secondBlockedPeriod={blockedSchedule[day][periods[1]]}
          {show}
        />
      {:else if assignedSchedule[day][7] !== null}
        {#key assignedSchedule[day][periods[0]]}
          <SubjectCardSmall
            lecture={assignedSchedule[day][7]}
            {show}
            double={false}
            rounded={true}
          />
        {/key}
      {:else if blockedSchedule[day][periods[0]] !== null}
        {#key blockedSchedule[day][periods[0]]}
          <BlockedPeriodCardSmall />
        {/key}
      {:else}
        <div class="rounded-[2px] bg-gray-100"></div>
      {/if}
    {/each}
  {/each}
</div>
