<script lang="ts">
  const props = $props();
</script>

<div
  class="group relative grid grid-flow-row grid-cols-[8px_24px_24px_24px_24px_24px] grid-rows-[10px_24px_24px_24px_12px] gap-1"
>
  <button
    class="absolute inset-0 z-10 hidden flex-row items-center justify-center rounded-[2px] bg-gray-200/90 underline group-hover:flex"
    onclick={props.onclick}>editar</button
  >
  {#each ['', 'L', 'M', 'M', 'J', 'V'] as day}
    <div class="text-center text-[8px]">{day}</div>
  {/each}

  {#each [1, 2, 3, 4] as period}
    {#each [0, 1, 2, 3, 4, 5] as day}
      {#if day === 0 && period == 1}
        <div class="flex flex-col gap-[2px] text-[8px]">
          <div>1</div>
          <div>2</div>
        </div>
      {:else if day === 0 && period == 2}
        <div class="flex flex-col gap-[2px] text-[8px]">
          <div>3</div>
          <div>4</div>
        </div>
      {:else if day === 0 && period == 3}
        <div class="flex flex-col gap-[2px] text-[8px]">
          <div>5</div>
          <div>6</div>
        </div>
      {:else if day === 0}
        <div class="text-[8px]">1</div>
      {:else}
        <div class="rounded-[2px] bg-gray-100"></div>
        <!-- <div -->
        <!--   class="flex flex-row items-center justify-center rounded-[2px] bg-red-600 text-[10px] text-white" -->
        <!-- > -->
        <!--   <p>MAT</p> -->
        <!-- </div> -->
      {/if}
    {/each}
  {/each}
</div>
