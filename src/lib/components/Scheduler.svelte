<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { BlockedSchedule, AssignedSchedule } from '$lib/state/timetable.svelte';
  import timetable, { getEmptySchedule } from '$lib/state/timetable.svelte';
  import BlockedPeriodCard from './BlockedPeriodCard.svelte';
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

  const periods = [1, 2, 3, 4, 5, 6, 7] as const;
  const days = [1, 2, 3, 4, 5] as const;
  let availability = $derived.by(() => {
    if (currently.dragging != null) {
      if (currently.dragging.kind === 'teacher') {
        return timetable.byTeacher[currently.dragging.name].availabilitySchedule;
      } else if (currently.dragging.kind === 'classGroup') {
        return timetable.byClass[currently.dragging.name].availabilitySchedule;
      }
    }
    return getEmptySchedule(true);
  });
</script>

<div
  class="grid w-[290px] grid-cols-[10px_48px_48px_48px_48px_48px] grid-rows-[18px_24px_24px_24px_24px_24px_24px_24px] gap-2"
>
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[16px]">{day}</div>
  {/each}

  {#each periods as period}
    <div class="text-[16px]">{period}</div>
    {#each days as day}
      {#if assignedSchedule[day] && assignedSchedule[day][period] !== null}
        {#key assignedSchedule[day][period]}
          <SubjectCard lecture={assignedSchedule[day][period]} {show} />
        {/key}
      {:else if blockedSchedule[day] && blockedSchedule[day][period] !== null}
        <BlockedPeriodCard blockedPeriod={blockedSchedule[day][period]} />
      {:else}
        <SchedulerBlock
          {day}
          {period}
          isAvailable={currently.dragging !== null ? availability[day][period] : null}
        />
      {/if}
    {/each}
  {/each}
</div>
