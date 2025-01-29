<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Lesson } from '$lib/state/Timetable.svelte';
  import { getColor } from '$lib/utils/colors';

  const { lesson }: { lesson: Lesson } = $props();

  const attributeForColor = $derived(
    currently.selected && currently.selected.kind === 'teacher' ? 'gradeName' : 'subjectName'
  );
  const bg = $derived(getColor(lesson[attributeForColor], attributeForColor));
  let isDragging = $state(false);

  const handleDragStart = () => {
    currently.setDragging(lesson);
    isDragging = true;
  };
  const handleDragEnd = () => {
    currently.setDragging(null);
    isDragging = false;
  };
</script>

<button
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  class={`flex h-6 w-12 items-center justify-center rounded-[2px] ${bg} ${isDragging || lesson.timeslot ? 'opacity-20' : ''} text-white`}
  >{lesson.subjectName}</button
>
