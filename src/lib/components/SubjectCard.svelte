<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Lecture } from '$lib/state/timetable.svelte';
  import timetable from '$lib/state/timetable.svelte';
  import { getColor } from '$lib/utils';
  import NumberOptions from './NumberOptions.svelte';

  const {
    lecture,
    double,
    rounded,
    show
  }: {
    lecture: Lecture;
    double: boolean;
    rounded: boolean;
    show: 'classGroup' | 'subject';
  } = $props();
  const height = double ? 'h-12' : 'h-6';

  let dragging = $state(false);

  const color = getColor(lecture, show);
  const opacity = $derived(dragging ? 'opacity-75' : 'opacity-100');

  const handleDragStart = (event: DragEvent) => {
    dragging = true;
    if (event.dataTransfer) event.dataTransfer.setData('text/plain', lecture.id);
    currently.setDragging({
      kind: show === 'classGroup' ? 'classGroup' : 'teacher',
      lecture
    });
  };

  const handleDragEnd = () => {
    dragging = false;
    currently.setDragging(null);
  };

  const handleDblClick = () => {
    timetable.removeLectureTimeslot(lecture.id);
  };

  const handleContextMenu = (ev: MouseEvent) => {
    ev.preventDefault();
    timetable.splitLecture(lecture.id);
  };

  const handleMouseEnter = () => {
    currently.setHovering({
      kind: show === 'classGroup' ? 'classGroup' : 'teacher',
      lecture
    });
  };

  const handleMouseLeave = () => {
    currently.setHovering(null);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="relative">
  <div
    class={`w-12 ${rounded ? 'rounded-[2px]' : ''} ${height} ${color} ${opacity} flex flex-col items-center justify-center text-[20px] text-white hover:cursor-pointer`}
    draggable="true"
    ondragstart={handleDragStart}
    ondragend={handleDragEnd}
    ondblclick={handleDblClick}
    oncontextmenu={handleContextMenu}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
  >
    {lecture[show]}
  </div>
  {#if lecture.timeslot === undefined}
    <NumberOptions {lecture} />
  {/if}
</div>
