<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Lesson } from '$lib/state/Timetable.svelte';

  const { lesson, show }: { lesson: Lesson; show: 'gradeName' | 'subjectName' } = $props();

  let isDragging = $state(false);

  const handleDragStart = () => {
    currently.setDragging({
      kind: 'lesson',
      lesson
    });
    isDragging = true;
  };

  const handleDragEnd = () => {
    currently.setDragging(null);
    isDragging = false;
  };

  const bg = $derived(isDragging ? 'bg-[#6B7280]/60' : 'bg-[#6B7280]');
</script>

<button
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  class={`flex flex-col items-center justify-center rounded-[2px] ${bg} text-white`}
>
  <div class="text-[16px]">
    {lesson[show]}
  </div>
  <div class="text-[12px]">
    {lesson.teacherName}
  </div>
</button>
