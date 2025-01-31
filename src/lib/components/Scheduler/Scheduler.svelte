<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import Toggle from '../Toggle.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import SchedulerCalendar from './SchedulerCalendar.svelte';
  import StatusBar from './StatusBar.svelte';
</script>

<div class="grid grid-rows-[min-content_1fr]">
  {#if currently.selected}
    <div class="flex flex-col items-center gap-10 pb-10">
      <div class="flex w-full flex-col items-center gap-6">
        <div
          class="flew-row flex h-[60px] w-full items-center justify-between bg-[#F9FAFB] px-[61px]"
        >
          <h2 class="text-[24px] font-light text-[#6B7280]">{currently.selected.name}</h2>
          {#if currently.selected.kind !== 'category'}
            <StatusBar kind={currently.selected.kind} name={currently.selected.name} />
          {/if}
          <div class="flex flex-row gap-2 text-[14px] font-normal text-[#6B7280]">
            <Toggle
              onChange={() => {
                currently.setBlocking(!currently.blocking);
              }}
            /> bloquear períodos
          </div>
        </div>
        <SchedulerCalendar />
      </div>
    </div>

    <AvailableLessons />
  {/if}
</div>
