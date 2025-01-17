<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Day, Period } from '$lib/state/timetable.svelte';
  import timetable from '$lib/state/timetable.svelte';
  import { getColor } from '$lib/utils';

  let {
    day,
    period
  }: {
    day: Day;
    period: Period;
  } = $props();

  let isHover = $state(false);

  let isAvailable = $derived.by(() => {
    if (currently.hovering) {
      if (currently.hovering.kind !== 'blockedPeriod') {
        return timetable.availabilityByLecture[currently.hovering.lecture.id][day][period];
      } else {
        return true;
      }
    }
    return null;
  });

  const bg = $derived.by(() => {
    if (isAvailable && isHover && currently.dragging !== null) {
      if (currently.dragging.kind === 'teacher')
        return `${getColor(currently.dragging.lecture, 'subject')} text-white`;
      if (currently.dragging.kind === 'classGroup')
        return `${getColor(currently.dragging.lecture, 'classGroup')} text-white`;
      if (currently.dragging.kind === 'blockedPeriod')
        return 'bg-white border border-red-600 text-red-600';
    }
    return isAvailable !== null ? (isAvailable ? 'bg-green-100' : 'bg-red-100') : 'bg-gray-100';
  });

  const text = $derived.by(() => {
    if (isAvailable && isHover && currently.dragging !== null) {
      if (currently.dragging.kind === 'teacher') return currently.dragging.lecture.subject;
      if (currently.dragging.kind === 'classGroup') return currently.dragging.lecture.classGroup;
      if (currently.dragging.kind === 'blockedPeriod') return 'X';
    }

    return '';
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

  const handleOnDrop = (event: DragEvent) => {
    isHover = false;
    if (event.dataTransfer && isAvailable) {
      if (currently.dragging?.kind === 'blockedPeriod') {
        if (currently.dragging.blockedPeriod.id) {
          timetable.setBlockedPeriodTimeslot(currently.dragging.blockedPeriod.id, { day, period });
        } else {
          timetable.addBlockedPeriod({
            ...currently.dragging.blockedPeriod,
            timeslot: { day, period }
          });
        }
      } else {
        const lectureId = event.dataTransfer.getData('text/plain');
        timetable.setLectureTimeslot(lectureId, { day: day, period: period });
      }
    }
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={`rounded-[2px] ${bg} flex flex-col items-center justify-center text-[20px]`}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondragover={handleDragOver}
  ondrop={handleOnDrop}
>
  {text}
</div>
