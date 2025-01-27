<script lang="ts">
  import { lessons, timetable } from '$lib/state/Timetable.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    fetch('/api/lessons')
      .then((response) => response.json())
      .then((weeklyLoad) => {
        timetable.fromWeeklyLoad(weeklyLoad, 7);
      });
  });
</script>

<div
  class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-[1fr_418px_600px] grid-rows-1"
></div>
