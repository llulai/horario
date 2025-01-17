<script lang="ts">
  import type { BlockedSchedule, AssignedSchedule } from '$lib/state/timetable.svelte';
  import BlockedPeriodCard from './BlockedPeriodCard.svelte';
  import DoubleSchedulerBlock from './DoubleSchedulerBlock.svelte';
  import SchedulerBlock from './SchedulerBlock.svelte';
  import SubjectCard from './SubjectCard.svelte';
  let {
    assignedSchedule,
    blockedSchedule,
    show
  }: {
    assignedSchedule: AssignedSchedule;
    blockedSchedule: BlockedSchedule;
    show: 'classGroup' | 'subject';
  } = $props();

  const periodPairs = [[1, 2], [3, 4], [5, 6], [7]] as const;
  const days = [1, 2, 3, 4, 5] as const;
</script>

<div
  class="grid w-[290px] grid-cols-[10px_48px_48px_48px_48px_48px] grid-rows-[18px_48px_48px_48px_24px] gap-2"
>
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[16px]">{day}</div>
  {/each}

  {#each periodPairs as periods}
    <div class="flex flex-col items-center justify-center text-[8px]">
      {#each periods as period}
        <div>{period}</div>
      {/each}
    </div>
    {#each days as day}
      {#if periods.length === 2}
        <DoubleSchedulerBlock
          firstLecture={assignedSchedule[day][periods[0]]}
          secondLecture={assignedSchedule[day][periods[1]]}
          firstBlockedPeriod={blockedSchedule[day][periods[0]]}
          secondBlockedPeriod={blockedSchedule[day][periods[1]]}
          {show}
          {day}
          {periods}
        />
      {:else if assignedSchedule[day][7] !== null}
        {#key assignedSchedule[day][7]}
          <SubjectCard lecture={assignedSchedule[day][7]} {show} double={false} rounded={true} />
        {/key}
      {:else if blockedSchedule[day][7] !== null}
        <BlockedPeriodCard blockedPeriod={blockedSchedule[day][7]} />
      {:else}
        <SchedulerBlock {day} period={7} />
      {/if}
    {/each}
  {/each}
</div>
