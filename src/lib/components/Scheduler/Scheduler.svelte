<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import SchedulerCalendar from './SchedulerCalendar.svelte';
</script>

<div class="grid grid-rows-[min-content_1fr]">
  {#if currently.selected}
    <div class="flex flex-col items-center gap-10 pb-10">
      <div class="flex w-full flex-col items-center gap-6">
        <SchedulerCalendar />
      </div>
    </div>

    <AvailableLessons />
  {/if}
</div>
