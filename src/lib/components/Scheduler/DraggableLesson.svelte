<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Lesson } from '$lib/state/Timetable.svelte';

  const { lesson }: { lesson: Lesson } = $props();

  const bg = $derived(lesson.timeslot ? 'bg-[#E2E8F1]' : 'bg-[#6B7280]');

  const handleDragStart = () => {
    currently.setDragging({
      kind: 'lesson',
      lesson
    });
  };
  const handleDragEnd = () => {
    currently.setDragging(null);
  };
</script>

<button
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  class={`flex h-6 w-12 items-center justify-center rounded-[2px] ${bg} text-white`}
  >{lesson.subjectName}</button
>
