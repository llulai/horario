<script lang="ts">
  import type { Time } from '$lib/state/Timetable.svelte';

  const { start, end }: { start: Time; end: Time } = $props();
  const hours = $derived(end[0] - start[0]);
</script>

<div
  class="cols-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-[56px_24px_180px_180px_180px_180px_180px] border-[#E1E6E4] p-8"
  style={`grid-template-rows: 36px ${Array(hours).fill('80px').join(' ')} 7px`}
>
  <div
    class="row-span-full flex flex-col items-end justify-between pr-3 pt-[29px] text-[14px] font-semibold leading-[14px] text-[#737573]"
  >
    {#each { length: hours + 1 } as _, i}
      <p>{start[0] + i}:00</p>
    {/each}
  </div>
  <div></div>
  <div class="text-center text-[14px] font-semibold text-[#737573]">Lunes</div>
  <div class="text-center text-[14px] font-semibold text-[#737573]">Martes</div>
  <div class="text-center text-[14px] font-semibold text-[#737573]">Miercoles</div>
  <div class="text-center text-[14px] font-semibold text-[#737573]">Jueves</div>
  <div class="text-center text-[14px] font-semibold text-[#737573]">Viernes</div>

  <div class="border-b border-t"></div>
  <div class="border-b border-l border-t"></div>
  <div class="border-b border-l border-t"></div>
  <div class="border-b border-l border-t"></div>
  <div class="border-b border-l border-t"></div>
  <div class="border-b border-l border-t"></div>

  {#each { length: hours - 1 } as _}
    <div class="border-b"></div>
    <div class="border-b border-l"></div>
    <div class="border-b border-l"></div>
    <div class="border-b border-l"></div>
    <div class="border-b border-l"></div>
    <div class="border-b border-l"></div>
  {/each}
</div>
