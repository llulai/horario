<script lang="ts">
  import CalendarGrid from '$lib/components/CalendarGrid.svelte';
  import currently from '$lib/state/currently.svelte';
  import {
    type Block,
    type BlockedTimeslot,
    blockedTimeslots,
    grades,
    type Lesson,
    lessons,
    periods
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

<div class="flex flex-col items-center gap-6 overflow-scroll bg-[#F0F5F2] px-3 pt-6">
  {#if currently.selected && currently.selected.kind !== 'category'}
    <CalendarGrid small={true}>
      {#each Object.entries(summarySchedules) as [name, lessons]}
        {#if currently.selected.kind === 'grade'}
          {#each Object.entries(periods.byTeacher[name]) as [periodId, period]}
            <Calendar
              kind={'teacher'}
              {name}
              periodName={Object.keys(periods.byTeacher[name]).length > 1 ? periodId : ''}
              lessons={lessons.filter(
                (lesson) => grades.byName[lesson.gradeName].periodId == periodId
              )}
              blockedTimeslots={summaryBlockedTimeslots[name]}
              maxBlocks={Object.keys(period).length as Block}
              small
            />
          {/each}
        {:else if currently.selected.kind === 'teacher'}
          <Calendar
            kind={'grade'}
            {name}
            {lessons}
            blockedTimeslots={summaryBlockedTimeslots[name]}
            maxBlocks={Object.keys(periods.byGrade[name] ?? { 1: 1 }).length as Block}
            small
          />
        {/if}
      {/each}
    </CalendarGrid>
  {/if}
</div>
