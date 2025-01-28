<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import Toggle from '../Toggle.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import SchedulerCalendar from './SchedulerCalendar.svelte';
</script>

<div class="grid grid-rows-[min-content_1fr]">
  {#if currently.selected}
    <div class="flex flex-col items-center gap-10 pb-10 pt-6">
      <div class="flex w-full flex-col items-center gap-6">
        <h2 class="text-[24px]">{currently.selected.name}</h2>
        <SchedulerCalendar />
      </div>
      <div class="flex flex-row gap-2">
        <Toggle
          onChange={() => {
            currently.setBlocking(!currently.blocking);
          }}
        /> bloquear períodos
      </div>
    </div>

    <AvailableLessons />
  {/if}
</div>
