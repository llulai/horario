<script lang="ts">
  import type { RawWeeklyLoad } from '$lib/state/WeeklyLoad.svelte';

  const {
    weeklyLoad,
    by
  }: {
    weeklyLoad: RawWeeklyLoad[];
    by: 'subject' | 'teacher';
  } = $props();

  const getTableByTeacher = (
    load: RawWeeklyLoad[]
  ): Record<string, Record<string, number>> | never => {
    // assert each pair of teacher and grade is unique
    const teacherSubjectPairs = new Set<string>();
    const table: Record<string, Record<string, number>> = {};

    load.forEach((lesson) => {
      const { teacherName, gradeName, subjectName, weeklyLoad } = lesson;
      const teacherSubject = `${teacherName} ${gradeName} ${subjectName}`;
      if (teacherSubjectPairs.has(teacherSubject)) {
        throw new Error(`Duplicado de par de profesor y materia: ${teacherSubject}`);
      }
      teacherSubjectPairs.add(teacherSubject);

      if (!table[teacherName]) {
        table[teacherName] = {};
      }

      if (!table[teacherName][gradeName]) {
        table[teacherName][gradeName] = 0;
      }

      table[teacherName][gradeName] += weeklyLoad;
    });

    return table;
  };

  const getTableByGrade = (load: RawWeeklyLoad[]): Record<string, number> | never => {
    const table: Record<string, number> = {};

    load.forEach((lesson) => {
      const { gradeName, weeklyLoad } = lesson;
      if (!table[gradeName]) {
        table[gradeName] = 0;
      }

      table[gradeName] += weeklyLoad;
    });

    return table;
  };

  const getTableBySubject = (
    load: RawWeeklyLoad[]
  ): Record<string, Record<string, number>> | never => {
    const table: Record<string, Record<string, number>> = {};

    load.forEach((lesson) => {
      const { gradeName, subjectName, weeklyLoad } = lesson;
      if (!table[subjectName]) {
        table[subjectName] = {};
      }

      if (!table[subjectName][gradeName]) {
        table[subjectName][gradeName] = 0;
      }

      table[subjectName][gradeName] += weeklyLoad;
    });

    return table;
  };

  const getTeachers = (load: RawWeeklyLoad[]): Set<string> => {
    return new Set(load.map((lesson) => lesson.teacherName));
  };

  const getGrades = (load: RawWeeklyLoad[]): Set<string> => {
    return new Set(load.map((lesson) => lesson.gradeName));
  };

  const getSubjects = (load: RawWeeklyLoad[]): Set<string> => {
    return new Set(load.map((lesson) => lesson.subjectName));
  };

  const tableByTeacher = getTableByTeacher(weeklyLoad);
  const tableBySubject = getTableBySubject(weeklyLoad);
  const tableByGrade = getTableByGrade(weeklyLoad);
  const teachers = getTeachers(weeklyLoad);
  const grades = getGrades(weeklyLoad);
  const subjects = getSubjects(weeklyLoad);
</script>

<table class="table-auto border-collapse border text-center">
  <thead>
    <tr>
      <th></th>
      {#each grades as grade}
        <th class="border">{grade}</th>
      {/each}
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {#if by === 'teacher'}
      {#each teachers as teacher}
        <tr>
          <th class="border px-6 text-left">{teacher}</th>
          {#each grades as grade}
            <td class="border px-4">{tableByTeacher[teacher]?.[grade] ?? ''}</td>
          {/each}
          <td class="border px-4"
            >{Object.values(tableByTeacher[teacher]).reduce((acc, val) => acc + val, 0)}</td
          >
        </tr>
      {/each}
    {:else if by === 'subject'}
      {#each subjects as subject}
        <tr>
          <th class="border px-6 text-left">{subject}</th>
          {#each grades as grade}
            <td class="border px-4">{tableBySubject[subject]?.[grade] ?? ''}</td>
          {/each}
          <td class="border px-4"
            >{Object.values(tableBySubject[subject]).reduce((acc, val) => acc + val, 0)}</td
          >
        </tr>
      {/each}
    {/if}
    <tr>
      <th class="border px-6 text-left">Total</th>
      {#each grades as grade}
        <td class="border px-4">{tableByGrade[grade]}</td>
      {/each}
      <td class="border"
        >{Object.values(tableByTeacher).reduce(
          (acc, teacher) => acc + Object.values(teacher).reduce((subAcc, val) => subAcc + val, 0),
          0
        )}</td
      >
    </tr>
  </tbody>
</table>
