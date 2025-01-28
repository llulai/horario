<script lang="ts">
  import Scheduler from '$lib/components/Scheduler/Scheduler.svelte';
  import ScheduleSummary from '$lib/components/ScheduleSummary.svelte';
  import { timetable } from '$lib/state/Timetable.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    fetch('/api/lessons')
      .then((response) => response.json())
      .then((weeklyLoad) => {
        timetable.fromWeeklyLoad(weeklyLoad, 8);
      });
  });
</script>

<div class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-[1070px_1fr] grid-rows-1">
  <Scheduler />
  <ScheduleSummary />
</div>
