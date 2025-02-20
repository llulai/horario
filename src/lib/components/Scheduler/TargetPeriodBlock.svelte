<script lang="ts">
  import availability from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import { lessons, type Day, type Block, type Time } from '$lib/state/Timetable.svelte';
  import { getColor } from '$lib/utils/colors';
  import PlusCircle from '$lib/components/Icons/PlusCircle.svelte';
  const {
    day,
    block,
    start,
    end
  }: {
    day: Day;
    block: Block;
    start: Time;
    end: Time;
  } = $props();

  let isHover = $state(false);

  const isAvailable: undefined | boolean = $derived.by(() => {
    if (currently.dragging) {
      if (currently.dragging.id in availability.byLesson) {
        return availability.byLesson[currently.dragging.id][day][block];
      }
    }
  });

  const bg = $derived.by(() => {
    if (isAvailable && isHover && currently.dragging) {
      const attributeForColor =
        currently.selected && currently.selected.kind === 'teacher' ? 'gradeName' : 'subjectName';
      return `${getColor(currently.dragging[attributeForColor], attributeForColor)} border border-dashed`;
    }
    switch (isAvailable) {
      case true:
        return 'bg-green-100';
      case false:
        return 'bg-red-100';
      default:
        return 'bg-[#F5F5F5]';
    }
  });

  const handleDragEnter = (ev: DragEvent) => {
    ev.preventDefault();
    isHover = true;
  };

  const handleDragLeave = (ev: DragEvent) => {
    ev.preventDefault();
    isHover = false;
  };

  const handleDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleOnDrop = () => {
    if (currently.dragging && isAvailable) {
      const lessonId = currently.dragging.id;
      lessons.dispatch({
        event: 'setLessonTimeslot',
        payload: { lessonId, timeslot: [day, block, start, end] }
      });
    }
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={`flex h-full w-full flex-row items-center justify-center rounded-[4px] ${bg}`}
  ondrop={handleOnDrop}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondragover={handleDragOver}
>
  {#if isHover}
    <PlusCircle h={24} w={24} />
  {/if}
</div>
