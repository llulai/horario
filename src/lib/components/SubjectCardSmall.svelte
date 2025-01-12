<script lang="ts">
  import type { Lecture } from '$lib/Types';

  const { lecture, show }: { lecture: Lecture; show: 'classGroup' | 'subject' } = $props();
  const height = lecture.duration == 1 ? 'h-[12px]' : 'h-[24 sfsx]';

  let dragging = $state(false);

  const subjectColors = {
    LEN: 'bg-[#ea580c]',
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

  // @ts-ignore
  const color =
    show === 'classGroup' ? classesColors[lecture.classGroup] : subjectColors[lecture.subject];
  const opacity = $derived(dragging ? 'opacity-75' : 'opacity-100');

  const handleDragStart = (event: DragEvent) => {
    dragging = true;
    if (event.dataTransfer) event.dataTransfer.setData('text/plain', lecture.id);
  };
</script>

<div
  class={`w-[24px] rounded-[2px] ${height} ${color} ${opacity} flex flex-col items-center justify-center text-[10px] text-white`}
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={() => (dragging = false)}
>
  {lecture[show]}
</div>
