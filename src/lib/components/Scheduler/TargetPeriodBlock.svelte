<script lang="ts">
  import availability from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import { lessons, type Day, type Period } from '$lib/state/Timetable.svelte';
  const {
    day,
    period
  }: {
    day: Day;
    period: Period;
  } = $props();

  let isHover = $state(false);

  const isAvailable: undefined | boolean = $derived.by(() => {
    if (currently.dragging) {
      if (currently.dragging.id in availability.byLesson) {
        return availability.byLesson[currently.dragging.id][day][period];
      }
    }
  });

  const bg = $derived.by(() => {
    if (isAvailable && isHover) {
      return 'bg-[#6B7280]/70';
    }
    switch (isAvailable) {
      case true:
        return 'bg-green-100';
      case false:
        return 'bg-red-100';
      default:
        return 'bg-[#F3F4F6]';
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
        event: 'setLectureTimeslot',
        payload: { lessonId, timeslot: [day, period] }
      });
    }
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={`h-10 rounded-[2px] ${bg}`}
  ondrop={handleOnDrop}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondragover={handleDragOver}
></div>
