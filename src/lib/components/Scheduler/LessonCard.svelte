<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { type Lesson, subjects } from '$lib/state/Timetable.svelte';
  import { getColor } from '$lib/utils/colors';

  const {
    lesson,
    attributeToShow
  }: { lesson: Lesson; attributeToShow: 'gradeName' | 'subjectName' } = $props();

  let isDragging = $state(false);

  const handleDragStart = () => {
    currently.setDragging(lesson);
    isDragging = true;
  };

  const handleDragEnd = () => {
    currently.setDragging(null);
    isDragging = false;
  };

  // const attributeToShow = $derived(
  //   currently.selected && currently.selected.kind === 'teacher' ? 'gradeName' : 'subjectName'
  // );
  const bg = $derived(getColor(lesson[attributeToShow], attributeToShow));
</script>

<button
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  class={`flex h-full w-full flex-col items-start justify-center rounded-[2px] p-2 ${bg} ${isDragging ? 'opacity-20' : ''}`}
>
  <div class="text-[14px] font-semibold text-[#1D1F1E]">
    {currently.selected && currently.selected.kind === 'teacher' ? lesson.gradeName : ''}
    {subjects.byName[lesson.subjectName].code}
  </div>
  <div class="text-[12px] font-medium text-[#737573]">
    {lesson.teacherName}
  </div>
</button>
