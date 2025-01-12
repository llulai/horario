<script lang="ts">
  import SubjectCardSmall from './SubjectCardSmall.svelte';
  const props = $props();
</script>

<div
  class="group relative grid grid-flow-row grid-cols-[8px_24px_24px_24px_24px_24px] grid-rows-[10px_12px_12px_12px_12px_12px_12px_12px] gap-1"
>
  <button
    class="absolute inset-0 z-10 hidden flex-row items-center justify-center rounded-[2px] bg-gray-200/90 underline group-hover:flex"
    onclick={props.onclick}>editar</button
  >
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[8px]">{day}</div>
  {/each}

  {#each [1, 2, 3, 4, 5, 6, 7] as period}
    {#each [0, 1, 2, 3, 4, 5] as day}
      {#if day === 0}
        <div class="flex flex-col gap-[2px] text-[8px]">
          <div>{period}</div>
        </div>
      {:else if props.schedule && props.schedule[day] && props.schedule[day][period] !== null}
        <SubjectCardSmall lecture={props.schedule[day][period]} by={props.by} />
      {:else}
        <div class="rounded-[2px] bg-gray-100"></div>
      {/if}
    {/each}
  {/each}
</div>
