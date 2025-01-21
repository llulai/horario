<script lang="ts">
  import type { BlockedSchedule, AssignedSchedule, Lecture } from '$lib/state/timetable.svelte';
  import timetable from '$lib/state/timetable.svelte';
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

  const h = {
    1: 'h-3',
    2: 'h-6'
  };
</script>

<div class="group relative grid grid-flow-row grid-cols-[8px_24px_24px_24px_24px_24px] gap-1">
  <button
    class="absolute inset-0 z-10 hidden flex-row items-center justify-center rounded-[2px] bg-gray-200/90 underline group-hover:flex"
    {onclick}>editar</button
  >
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[8px]">{day}</div>
  {/each}

  {#each timetable.periods.blocks as block}
    <div class={`flex flex-col items-center justify-center text-[8px] ${h[block.length]}`}>
      {#each block as period}
        <div>{period}</div>
      {/each}
    </div>
    {#each timetable.periods.days as day}
      {#if block.length === 2}
        <DoublePeriodCardSmall
          firstLecture={assignedSchedule[day][block[0]]}
          secondLecture={assignedSchedule[day][block[1]]}
          firstBlockedPeriod={blockedSchedule[day][block[0]]}
          secondBlockedPeriod={blockedSchedule[day][block[1]]}
          {show}
        />
      {:else if assignedSchedule[day][block[0]] !== null}
        {#key assignedSchedule[day][block[0]]}
          <SubjectCardSmall
            lecture={assignedSchedule[day][block[0]] as unknown as Lecture}
            {show}
            double={false}
            rounded={true}
          />
        {/key}
      {:else if blockedSchedule[day][block[0]] !== null}
        {#key blockedSchedule[day][block[0]]}
          <BlockedPeriodCardSmall duration={1} />
        {/key}
      {:else}
        <div class="rounded-[2px] bg-gray-100"></div>
      {/if}
    {/each}
  {/each}
</div>
