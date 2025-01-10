<script lang="ts">
  import Schedule from './Schedule.svelte';

  let props = $props();

  let teachers = $derived.by(() => {
    return props.lessons.reduce((acc, lesson) => {
      acc.add(lesson.teacher);
      return acc;
    }, new Set<string>([]));
  });
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 border-r border-gray-200 px-12 py-6">
  <div class="text-[24px]">Profesores</div>
  <div class="flex flex-row flex-wrap justify-center gap-6">
    {#each teachers as teacher}
      <div class="flex flex-col items-center gap-1">
        <div>{teacher}</div>
        <Schedule />
      </div>
    {/each}
  </div>
</div>
