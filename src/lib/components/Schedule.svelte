<script lang="ts">
  import type { BlockedSchedule, AssignedSchedule } from '$lib/state/timetable.svelte';
  import BlockedPeriodCardSmall from './BlockedPeriodCardSmall.svelte';
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

  const periods = [1, 2, 3, 4, 5, 6, 7] as const;
  const days = [1, 2, 3, 4, 5] as const;
</script>

<div
  class="group relative grid grid-flow-row grid-cols-[8px_24px_24px_24px_24px_24px] grid-rows-[10px_12px_12px_12px_12px_12px_12px_12px] gap-1"
>
  <button
    class="absolute inset-0 z-10 hidden flex-row items-center justify-center rounded-[2px] bg-gray-200/90 underline group-hover:flex"
    {onclick}>editar</button
  >
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[8px]">{day}</div>
  {/each}

  {#each periods as period}
    <div class="flex flex-col gap-[2px] text-[8px]">
      <div>{period}</div>
    </div>
    {#each days as day}
      {#if assignedSchedule && assignedSchedule[day] && assignedSchedule[day][period] !== null}
        {#key assignedSchedule[day][period]}
          <SubjectCardSmall lecture={assignedSchedule[day][period]} {show} />
        {/key}
      {:else if blockedSchedule[day][period] !== null}
        {#key blockedSchedule[day][period]}
          <BlockedPeriodCardSmall />
        {/key}
      {:else}
        <div class="rounded-[2px] bg-gray-100"></div>
      {/if}
    {/each}
  {/each}
</div>
