<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { type Lesson, subjects } from '$lib/state/Timetable.svelte';
  import { getColor } from '$lib/utils/colors';

  const { lesson }: { lesson: Lesson } = $props();

  let isDragging = $state(false);

  const handleDragStart = () => {
    currently.setDragging(lesson);
    isDragging = true;
  };

  const handleDragEnd = () => {
    currently.setDragging(null);
    isDragging = false;
  };

  const attributeToShow = $derived(
    currently.selected && currently.selected.kind === 'teacher' ? 'gradeName' : 'subjectName'
  );
  const bg = $derived(getColor(lesson[attributeToShow], attributeToShow));
</script>

<button
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  class={`flex flex-col items-center justify-center rounded-[2px] ${bg} ${isDragging ? 'opacity-20' : ''} text-white`}
>
  <div class="text-[14px]">
    {currently.selected && currently.selected.kind === 'teacher' ? lesson.gradeName : ''}
    {subjects.byName[lesson.subjectName].code}
  </div>
  <div class="text-[12px]">
    {lesson.teacherName}
  </div>
</button>
