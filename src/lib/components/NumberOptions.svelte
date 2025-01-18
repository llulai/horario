<script lang="ts">
  import type { Lecture } from '$lib/state/timetable.svelte';
  import timetable from '$lib/state/timetable.svelte';

  const { lecture }: { lecture: Lecture } = $props();

  const nOptions = $derived(timetable.problemScale.byLecture[lecture.id]);

  const color = $derived.by(() => {
    switch (true) {
      case nOptions === 0:
        return 'bg-red-200 text-red-900';
      case nOptions <= 3:
        return 'bg-yellow-200 text-yellow-900';
      default:
        return 'bg-indigo-200 text-indigo-900';
    }
  });
</script>

<div
  class={`absolute right-0 top-0 flex h-4 w-4 -translate-y-1/2 translate-x-1/2 flex-col items-center justify-center rounded-full border-2 border-white text-[8px] ${color}`}
>
  {nOptions}
</div>
