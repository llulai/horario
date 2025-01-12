<script lang="ts">
  const props = $props();
  const height = props.lecture.duration == 1 ? 'h-[24px]' : 'h-[48px]';

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

  const color = subjectColors[props.lecture.subject];
  const opacity = $derived(dragging ? 'opacity-75' : 'opacity-100');

  const handleDragStart = (event) => {
    dragging = true;
    event.dataTransfer.setData('text/plain', props.lecture.id);
  };
</script>

<div
  class={`w-[48px] rounded-[2px] ${height} ${color} ${opacity} flex flex-col items-center justify-center text-[20px] text-white`}
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={() => (dragging = false)}
>
  {props.lecture[props.show]}
</div>
