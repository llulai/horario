<script lang="ts">
  import ArrowPath from '$lib/components/Icons/ArrowPath.svelte';
  import NavBar from '$lib/components/Base/NavBar.svelte';
  import currently from '$lib/state/currently.svelte';
  import { lessons, timetable } from '$lib/state/Timetable.svelte';
  import { onMount } from 'svelte';

  let { children, data } = $props();

  let loading = $state(true);

  onMount(async () => {
    const timetableData = await fetch('/api/timetable').then((response) => response.json());

    if (timetableData !== null) {
      timetable.fromJSON(timetableData);
      currently.selectCourses();
    }

    loading = false;
  });
</script>

<NavBar showTimetableButtons={!loading && lessons.list.length > 0} user={data.user} />

{#if loading}
  <div class="absolute inset-x-0 bottom-0 top-16 flex flex-row items-center justify-center">
    <div class="animate-spin text-[#008744]">
      <ArrowPath h={128} w={128} />
    </div>
  </div>
{:else}
  {@render children()}
{/if}
