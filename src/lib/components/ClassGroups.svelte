<script lang="ts">
  import type { LecturesByCourse } from '$lib/Types';
  import Schedule from './Schedule.svelte';

  let {
    lecturesByCourse,
    selectClass
  }: { lecturesByCourse: LecturesByCourse; selectClass: (subject: string) => void } = $props();
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 border-r border-gray-200 px-12 py-6">
  <div class="text-[24px]">Cursos</div>
  <div class="flex flex-row flex-wrap justify-center gap-6">
    {#each Object.keys(lecturesByCourse) as course}
      <div class="flex flex-col items-center gap-1">
        <div>{course}</div>
        <Schedule
          onclick={() => selectClass(course)}
          schedule={lecturesByCourse[course].assigned}
          show="subject"
        />
      </div>
    {/each}
  </div>
</div>
