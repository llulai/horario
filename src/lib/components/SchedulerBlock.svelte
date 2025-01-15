<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Day, Period } from '$lib/state/timetable.svelte';
  import timetable from '$lib/state/timetable.svelte';

  let {
    day,
    period,
    isAvailable
  }: {
    isAvailable: boolean | null;
    day: Day;
    period: Period;
  } = $props();
  let bg = $derived(
    isAvailable !== null ? (isAvailable ? 'bg-green-100' : 'bg-red-100') : 'bg-gray-100'
  );

  const handleDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleOnDrop = (event: DragEvent) => {
    if (event.dataTransfer && isAvailable) {
      if (currently.dragging?.kind === 'blockedPeriod') {
        timetable.addBlockedPeriod({
          ...currently.dragging.blockedPeriod,
          timeslot: { day, period }
        });
      } else {
        const lectureId = event.dataTransfer.getData('text/plain');
        timetable.setLectureTimeslot(lectureId, { day: day, period: period });
      }
    }
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={`rounded-[2px] ${bg}`} ondragover={handleDragOver} ondrop={handleOnDrop}></div>
