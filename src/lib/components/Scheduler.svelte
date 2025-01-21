<script lang="ts">
  import type {
    BlockedSchedule,
    AssignedSchedule,
    Lecture,
    BlockedPeriod
  } from '$lib/state/timetable.svelte';
  import timetable from '$lib/state/timetable.svelte';
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

  const h = {
    1: 'h-6',
    2: 'h-12'
  };
</script>

<div class="grid w-[290px] grid-cols-[10px_48px_48px_48px_48px_48px] gap-2">
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[16px]">{day}</div>
  {/each}

  {#each timetable.periods.blocks as block}
    <div class={`flex flex-col items-center justify-center gap-1 text-[16px] ${h[block.length]}`}>
      {#each block as period}
        <div>{period}</div>
      {/each}
    </div>
    {#each timetable.periods.days as day}
      {#if block.length === 2}
        <DoubleSchedulerBlock
          firstLecture={assignedSchedule[day][block[0]]}
          secondLecture={assignedSchedule[day][block[1]]}
          firstBlockedPeriod={blockedSchedule[day][block[0]]}
          secondBlockedPeriod={blockedSchedule[day][block[1]]}
          {show}
          {day}
          {block}
        />
      {:else if assignedSchedule[day][block[0]] !== null}
        {#key assignedSchedule[day][block[0]]}
          <SubjectCard
            lecture={assignedSchedule[day][block[0]] as unknown as Lecture}
            {show}
            double={false}
            rounded={true}
          />
        {/key}
      {:else if blockedSchedule[day][block[0]] !== null}
        <BlockedPeriodCard
          blockedPeriod={blockedSchedule[day][block[0]] as unknown as BlockedPeriod}
        />
      {:else}
        <SchedulerBlock {day} period={block[0]} double={false} />
      {/if}
    {/each}
  {/each}
</div>
