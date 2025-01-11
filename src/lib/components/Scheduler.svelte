<script>
  import SchedulerBlock from './SchedulerBlock.svelte';
  import SubjectCard from './SubjectCard.svelte';
  let props = $props();
</script>

<div
  class="grid grid-cols-[10px_48px_48px_48px_48px_48px] grid-rows-[18px_24px_24px_24px_24px_24px_24px_24px] gap-2"
>
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[16px]">{day}</div>
  {/each}

  {#each [1, 2, 3, 4, 5, 6, 7] as period}
    {#each [0, 1, 2, 3, 4, 5] as day}
      {#if day === 0}
        <div class="text-[16px]">{period}</div>
      {:else if props.schedule && props.schedule[day] && props.schedule[day][period] !== null}
        <SubjectCard lecture={props.schedule[day][period]} />
      {:else}
        <SchedulerBlock setTimeslotForLecture={props.setTimeslotForLecture} {period} {day} />
      {/if}
    {/each}
  {/each}
</div>
