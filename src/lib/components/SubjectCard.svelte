<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Lecture } from '$lib/state/timetable.svelte';
  import timetable from '$lib/state/timetable.svelte';

  const {
    lecture,
    show
  }: {
    lecture: Lecture;
    show: 'classGroup' | 'subject';
  } = $props();
  const height = lecture.duration == 1 ? 'h-[24px]' : 'h-[48px]';

  let dragging = $state(false);

  const getColor = (lecture: Lecture) => {
    if (show === 'classGroup') {
      switch (lecture.subject) {
        case 'LEN':
          return 'bg-[#ea580c]';
        case 'MAT':
          return 'bg-[#DB2777]';
        case 'HIS':
          return 'bg-[#2563EB]';
        case 'CsN':
          return 'bg-[#059669]';
        case 'ING':
          return 'bg-[#DC2626]';
        case 'MUS':
          return 'bg-[#FBBF24]';
        case 'ArV':
          return 'bg-[#5EEAD4]';
        case 'TEC':
          return 'bg-[#9333EA]';
        case 'EdF':
          return 'bg-[#22D3EE]';
        case 'ORI':
          return 'bg-[#65A30D]';
        case 'REL':
          return 'bg-[#E879F9]';
        default:
          return 'bg-gray-200';
      }
    }
    if (show === 'subject') {
      switch (lecture.classGroup) {
        case '2A':
          return 'bg-[#2563EB]';
        case '2B':
          return 'bg-[#9333EA]';
        case '3A':
          return 'bg-[#DC2626]';
        case '3B':
          return 'bg-[#EA580C]';
        case '4A':
          return 'bg-[#D97706]';
        case '4B':
          return 'bg-[#38BDF8]';
        case '5A':
          return 'bg-[#16A34A]';
        case '5B':
          return 'bg-[#FACC15]';
        default:
          'bg-gray-200';
      }
    }
  };

  const color = getColor(lecture);
  const opacity = $derived(dragging ? 'opacity-75' : 'opacity-100');

  const handleDragStart = (event: DragEvent) => {
    dragging = true;
    if (event.dataTransfer) event.dataTransfer.setData('text/plain', lecture.id);
    currently.setDragging({
      kind: show === 'classGroup' ? 'classGroup' : 'teacher',
      name: show === 'classGroup' ? lecture.classGroup : lecture.teacher
    });
  };

  const handleDragEnd = () => {
    dragging = false;
    currently.setDragging(null);
  };

  const handleDblClick = () => {
    timetable.removeLectureTimeslot(lecture.id);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={`w-[48px] rounded-[2px] ${height} ${color} ${opacity} flex flex-col items-center justify-center text-[20px] text-white hover:cursor-pointer`}
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  ondblclick={handleDblClick}
>
  {lecture[show]}
</div>
