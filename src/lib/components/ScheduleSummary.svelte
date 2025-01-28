<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { type Lesson, lessons } from '$lib/state/Timetable.svelte';

  const summarySchedules: Record<string, Lesson[]> = $derived.by(() => {
    if (currently.selected) {
      const { kind, name } = currently.selected;
      if (kind === 'teacher') {
        const grades = new Set(lessons.byTeacher[name].map((lesson) => lesson.gradeName));
        return Object.fromEntries([...grades].map((grade) => [grade, lessons.byGrade[grade]]));
      }
      if (kind === 'grade') {
        const teachers = new Set(lessons.byGrade[name].map((lesson) => lesson.teacherName));
        return Object.fromEntries(
          [...teachers].map((teacher) => [teacher, lessons.byTeacher[teacher]])
        );
      }
    }
    return {};
  });
</script>

<div class="flex flex-col items-center gap-6 bg-[#E2E8F1] px-3 pt-6">
  {#if currently.selected}
    <h2 class="text-[24px]">{currently.selected?.kind === 'teacher' ? 'Cursos' : 'Profesores'}</h2>

    <div class="grid w-full grid-cols-[repeat(auto-fit,minmax(164px,1fr))] gap-y-6">
      {#each Object.entries(summarySchedules) as [name, lessons]}
        <div class="mx-auto flex h-[120px] w-[140px] flex-col justify-center gap-1">
          <div class="w-[140px] truncate text-center">
            {name}
          </div>
          <div class="w-[140] flex-grow rounded-[2px] bg-white"></div>
        </div>
      {/each}
    </div>
  {/if}
</div>
