<script lang="ts">
  import Schedule from './Schedule.svelte';

  let props = $props();

  let courses = $derived.by(() => {
    return props.lessons.reduce((acc, lesson) => {
      acc.add(lesson.course);
      return acc;
    }, new Set<string>([]));
  });
</script>

<!-- teachers -->
<div class="flex h-full w-[440px] flex-col items-center gap-6 border-r border-gray-200 px-12 py-6">
  <div class="text-[24px]">Cursos</div>
  <div class="flex flex-row flex-wrap justify-center gap-6">
    {#each courses as course}
      <div class="flex flex-col items-center gap-1">
        <div>{course}</div>
        <Schedule />
      </div>
    {/each}
  </div>
</div>
