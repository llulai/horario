import type { Lecture } from './state/timetable.svelte';

export const getColor = (lecture: Lecture, show: 'subject' | 'classGroup') => {
  if (show === 'subject') {
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
  if (show === 'classGroup') {
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
        return 'bg-gray-200';
    }
  }
};
