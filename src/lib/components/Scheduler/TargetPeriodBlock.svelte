<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { lessons, type Day, type Period } from '$lib/state/Timetable.svelte';
  const {
    day,
    period
  }: {
    day: Day;
    period: Period;
  } = $props();

  const handleDragEnter = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleDragLeave = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleOnDrop = (event: DragEvent) => {
    if (currently.dragging) {
      if (currently.dragging.kind === 'lesson') {
        const lessonId = currently.dragging.lesson.id;
        lessons.dispatch({
          event: 'setLectureTimeslot',
          payload: { lessonId, timeslot: [day, period] }
        });
      }
    }
  };
</script>

<div
  class="h-10 rounded-[2px] bg-[#F3F4F6]"
  ondrop={handleOnDrop}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondragover={handleDragOver}
></div>
