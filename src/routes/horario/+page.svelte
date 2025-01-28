<script lang="ts">
  import ScheduleSummary from '$lib/components/ScheduleSummary.svelte';
  import currently from '$lib/state/currently.svelte';
  import { timetable } from '$lib/state/Timetable.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    fetch('/api/lessons')
      .then((response) => response.json())
      .then((weeklyLoad) => {
        timetable.fromWeeklyLoad(weeklyLoad, 7);
      });
  });
</script>

<div class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-[1070px_1fr] grid-rows-1">
  <div class="grid grid-rows-[562px_1fr]">
    {#if currently.selected}
      <!-- target grid cells here -->
      <div class="flex w-full flex-col items-center gap-6 pt-6">
        <h2 class="text-[24px]">{currently.selected.name}</h2>

        <!-- calendar header -->
        <div class="flex w-full flex-col px-[61px]">
          <div class="grid grid-cols-5 gap-3 text-[20px]">
            <p class="text-center">Lunes</p>
            <p class="text-center">Martes</p>
            <p class="text-center">Miércoles</p>
            <p class="text-center">Jueves</p>
            <p class="text-center">Viernes</p>
          </div>
        </div>

        <!-- calendar body -->
        <div class="grid w-full grid-cols-[61px_948px_61px]">
          <div class="gric-cols-1 grid grid-rows-7 gap-3 text-[20px]">
            <div class="flex h-10 flex-col justify-center"><p class="h-fit text-center">1</p></div>
            <div class="flex h-10 flex-col justify-center"><p class="h-fit text-center">2</p></div>
            <div class="flex h-10 flex-col justify-center"><p class="h-fit text-center">3</p></div>
            <div class="flex h-10 flex-col justify-center"><p class="h-fit text-center">4</p></div>
            <div class="flex h-10 flex-col justify-center"><p class="h-fit text-center">5</p></div>
            <div class="flex h-10 flex-col justify-center"><p class="h-fit text-center">6</p></div>
            <div class="flex h-10 flex-col justify-center"><p class="h-fit text-center">7</p></div>
          </div>
          <div class="grid grid-cols-5 grid-rows-7 gap-3">
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
            <div class="h-10 rounded-[2px] bg-[#F3F4F6]"></div>
          </div>
        </div>
      </div>

      <!-- avaialble lectures -->
      <div class="bg-[#F4F4F5]"></div>
    {/if}
  </div>

  <ScheduleSummary />
</div>
