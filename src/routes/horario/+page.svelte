<script lang="ts">
  import { lessons } from '$lib/state/Timetable.svelte';
  import TimeTableUpload from '$lib/components/TimeTableUpload.svelte';
  import Scheduler from '$lib/components/Scheduler/Scheduler.svelte';
  import Summary from '$lib/components/Summary/Summary.svelte';
</script>

<div class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-[1070px_1fr] grid-rows-1">
  {#if lessons.list.length > 0}
    <Scheduler />
    <Summary />
  {:else}
    <TimeTableUpload />
  {/if}
</div>
