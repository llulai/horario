<script lang="ts">
  import CalendarGrid from '../CalendarGrid.svelte';
  import currently from '$lib/state/currently.svelte';
  import {
    type BlockedTimeslot,
    blockedTimeslots,
    type Lesson,
    lessons
  } from '$lib/state/Timetable.svelte';
  import Calendar from './Calendar.svelte';

  const summarySchedules: Record<string, Lesson[]> = $derived.by(() => {
    // get lessons related to the selected teacher or grade

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

  const summaryBlockedTimeslots: Record<string, BlockedTimeslot[]> = $derived.by(() => {
    // get blocked timeslots related to the selected teacher or grade

    if (currently.selected) {
      const { kind, name } = currently.selected;
      if (kind === 'teacher') {
        const grades = new Set(lessons.byTeacher[name].map((lesson) => lesson.gradeName));
        return Object.fromEntries(
          [...grades].map((grade) => [grade, blockedTimeslots.byGrade[grade] || []])
        );
      }
      if (kind === 'grade') {
        const teachers = new Set(lessons.byGrade[name].map((lesson) => lesson.teacherName));
        return Object.fromEntries(
          [...teachers].map((teacher) => [teacher, blockedTimeslots.byTeacher[teacher] || []])
        );
      }
    }
    return {};
  });
</script>

<div class="flex flex-col items-center gap-6 bg-[#E2E8F1] px-3 pt-6">
  {#if currently.selected && currently.selected.kind !== 'category'}
    <h2 class="text-[24px]">{currently.selected?.kind === 'teacher' ? 'Cursos' : 'Profesores'}</h2>

    <CalendarGrid small={true}>
      {#each Object.entries(summarySchedules) as [name, lessons]}
        <Calendar
          kind={currently.selected.kind === 'teacher' ? 'grade' : 'teacher'}
          {name}
          {lessons}
          blockedTimeslots={summaryBlockedTimeslots[name]}
          small
        />
      {/each}
    </CalendarGrid>
  {/if}
</div>
