<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Lesson } from '$lib/state/Timetable.svelte';

  const { lesson, show }: { lesson: Lesson; show: 'gradeName' | 'subjectName' } = $props();
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
  class="flex flex-col items-center justify-center rounded-[2px] bg-[#6B7280] text-white"
>
  <div class="text-[16px]">
    {lesson[show]}
  </div>
  <div class="text-[12px]">
    {lesson.teacherName}
  </div>
</button>
