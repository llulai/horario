<script lang="ts">
  import type { CurrentlyDragging, Lecture, Timeslot } from '$lib/Types';

  const {
    setLectureTimeslot,
    setCurrentlyDragging,
    lecture,
    show
  }: {
    setLectureTimeslot: (id: string, timeslot: Timeslot | undefined) => void;
    setCurrentlyDragging: (newCurrentlyDragging: CurrentlyDragging | null) => void;
    lecture: Lecture;
    show: 'classGroup' | 'subject';
  } = $props();
  const height = lecture.duration == 1 ? 'h-[24px]' : 'h-[48px]';

  let dragging = $state(false);

  const subjectColors = {
    LEN: 'bg-[#EA580C]',
    MAT: 'bg-[#DB2777]',
    HIS: 'bg-[#2563EB]',
    CsN: 'bg-[#059669]',
    ING: 'bg-[#DC2626]',
    MUS: 'bg-[#FBBF24]',
    ArV: 'bg-[#5EEAD4]',
    TEC: 'bg-[#9333EA]',
    EdF: 'bg-[#22D3EE]',
    ORI: 'bg-[#65A30D]',
    REL: 'bg-[#E879F9]'
  } as const;

  const classesColors = {
    '2A': 'bg-[#2563EB]',
    '2B': 'bg-[#9333EA]',
    '3A': 'bg-[#DC2626]',
    '3B': 'bg-[#EA580C]',
    '4A': 'bg-[#D97706]',
    '4B': 'bg-[#38BDF8]',
    '5A': 'bg-[#16A34A]',
    '5B': 'bg-[#FACC15]'
  } as const;

  const color =
    show === 'classGroup' ? classesColors[lecture.classGroup] : subjectColors[lecture.subject];
  const opacity = $derived(dragging ? 'opacity-75' : 'opacity-100');

  const handleDragStart = (event: DragEvent) => {
    dragging = true;
    if (event.dataTransfer) event.dataTransfer.setData('text/plain', lecture.id);
    setCurrentlyDragging({
      kind: show === 'classGroup' ? 'classGroup' : 'teacher',
      name: show === 'classGroup' ? lecture.classGroup : lecture.teacher
    });
  };

  const handleDragEnd = () => {
    dragging = false;
    setCurrentlyDragging(null);
  };

  const handleDblClick = () => {
    setLectureTimeslot(lecture.id, undefined);
  };
</script>

<div
  class={`w-[48px] rounded-[2px] ${height} ${color} ${opacity} flex flex-col items-center justify-center text-[20px] text-white hover:cursor-pointer`}
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  ondblclick={handleDblClick}
>
  {lecture[show]}
</div>
