<script lang="ts">
  import type { Day, Period, Timeslot } from '$lib/Types';

  let {
    setLectureTimeslot,
    day,
    period,
    isAvailable
  }: {
    setLectureTimeslot: (id: string, timeslot: Timeslot) => void;
    isAvailable: boolean | null;
    day: Day;
    period: Period;
  } = $props();
  let isHover = $state(false);
  let bg = $derived(
    isAvailable !== null ? (isAvailable ? 'bg-green-100' : 'bg-red-100') : 'bg-gray-100'
  );

  const handleDragEnter = (ev: DragEvent) => {
    ev.preventDefault();
    isHover = true;
  };

  const handleDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleDragLeave = () => {
    isHover = false;
  };

  const handleOnDrop = (event: DragEvent) => {
    if (event.dataTransfer && isAvailable) {
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
