<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import SchedulerCalendar from './SchedulerCalendar.svelte';
</script>

<div class="grid grid-rows-[562px_1fr]">
  {#if currently.selected}
    <div class="flex w-full flex-col items-center gap-6 pt-6">
      <h2 class="text-[24px]">{currently.selected.name}</h2>
      <SchedulerCalendar />
    </div>

    <AvailableLessons />
  {/if}
</div>
