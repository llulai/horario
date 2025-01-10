<script>
  import SchedulerBlock from './SchedulerBlock.svelte';
  let props = $props();
</script>

<div
  class="grid grid-cols-[10px_48px_48px_48px_48px_48px] grid-rows-[10px_24px_24px_24px_24px_24px_24px_24px] gap-2"
>
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[8px]">{day}</div>
  {/each}

  {#each [1, 2, 3, 4, 5, 6, 7] as period}
    {#each [0, 1, 2, 3, 4, 5] as day}
      {#if day === 0}
        <div class="text-[8px]">{period}</div>
      {:else}
        <SchedulerBlock setTimeslotForLecture={props.setTimeslotForLecture} {period} {day} />
      {/if}
    {/each}
  {/each}
</div>
