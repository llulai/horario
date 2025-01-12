<script lang="ts">
  import type { LecturesByTeacher } from '$lib/Types';
  import Schedule from './Schedule.svelte';

  let {
    lecturesByTeacher,
    selectTeacher
  }: { lecturesByTeacher: LecturesByTeacher; selectTeacher: (name: string) => void } = $props();
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 border-r border-gray-200 px-12 py-6">
  <div class="text-[24px]">Profesores</div>
  <div class="flex flex-row flex-wrap justify-center gap-6">
    {#each Object.keys(lecturesByTeacher) as teacher}
      <div class="flex flex-col items-center gap-1">
        <div>{teacher}</div>
        <Schedule
          onclick={() => selectTeacher(teacher)}
          schedule={lecturesByTeacher[teacher].assigned}
          show="classGroup"
        />
      </div>
    {/each}
  </div>
</div>
