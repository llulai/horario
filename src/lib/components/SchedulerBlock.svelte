<script lang="ts">
  import type { Day, Period, Timeslot } from '$lib/Types';

  let {
    setLectureTimeslot,
    day,
    period
  }: { setLectureTimeslot: (id: string, timeslot: Timeslot) => void; day: Day; period: Period } =
    $props();
  let isHover = $state(false);
  let bg = $derived(isHover ? 'bg-green-100' : 'bg-gray-100');

  const handleDragEnter = (ev: DragEvent) => {
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
      isHover = true;
    }
  };

  const handleDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleDragLeave = () => {
    isHover = false;
  };

  const handleOnDrop = (event: DragEvent) => {
    if (event.dataTransfer) {
      const lectureId = event.dataTransfer.getData('text/plain');
      setLectureTimeslot(lectureId, { day: day, period: period });
    }
  };
</script>

<div
  class={`rounded-[2px] ${bg}`}
  ondragenter={handleDragEnter}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleOnDrop}
></div>
