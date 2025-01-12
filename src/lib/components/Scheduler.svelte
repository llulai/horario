<script lang="ts">
  import type { Schedule, Timeslot } from '$lib/Types';
  import SchedulerBlock from './SchedulerBlock.svelte';
  import SubjectCard from './SubjectCard.svelte';
  let {
    schedule,
    show,
    setLectureTimeslot
  }: {
    schedule: Schedule;
    show: 'classGroup' | 'subject';
    setLectureTimeslot: (id: string, timeslot: Timeslot) => void;
  } = $props();

  const periods = [1, 2, 3, 4, 5, 6, 7] as const;
  const days = [1, 2, 3, 4, 5] as const;
</script>

<div
  class="grid grid-cols-[10px_48px_48px_48px_48px_48px] grid-rows-[18px_24px_24px_24px_24px_24px_24px_24px] gap-2"
>
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[16px]">{day}</div>
  {/each}

  {#each periods as period}
    <div class="text-[16px]">{period}</div>
    {#each days as day}
      {#if schedule && schedule[day] && schedule[day][period] !== null}
        {#key schedule[day][period]}
          <SubjectCard lecture={schedule[day][period]} {show} />
        {/key}
      {:else}
        <SchedulerBlock {setLectureTimeslot} {period} {day} />
      {/if}
    {/each}
  {/each}
</div>
