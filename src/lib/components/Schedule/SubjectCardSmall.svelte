<script lang="ts">
  import type { Lecture } from '$lib/state/timetable.svelte';
  import { getColor } from '$lib/utils/colors';

  const {
    lecture,
    double,
    rounded,
    show
  }: {
    lecture: Lecture;
    double: boolean;
    rounded: boolean;
    show: 'classGroup' | 'subject';
  } = $props();

  const height = double ? 'h-[24px]' : 'h-[12px]';

  const color = getColor(show === 'classGroup' ? lecture.classGroup : lecture.subject, show);
</script>

<div
  class={`w-[24px] ${height} ${color} ${rounded ? 'rounded-[2px]' : ''} flex flex-col items-center justify-center text-[10px] text-white`}
>
  {lecture[show]}
</div>
