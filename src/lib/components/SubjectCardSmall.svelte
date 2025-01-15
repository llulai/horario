<script lang="ts">
  import type { Lecture } from '$lib/state/timetable.svelte';

  const {
    lecture,
    show
  }: {
    lecture: Lecture;
    show: 'classGroup' | 'subject';
  } = $props();
  const height = lecture.duration == 1 ? 'h-[12px]' : 'h-[24 sfsx]';

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
</script>

<div
  class={`w-[24px] rounded-[2px] ${height} ${color} flex flex-col items-center justify-center text-[10px] text-white`}
>
  {lecture[show]}
</div>
