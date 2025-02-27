<script lang="ts">
  import type { RawWeeklyLoad } from '$lib/state/WeeklyLoad.svelte';

  let {
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

<table class="border-collapse border text-center">
  <thead>
    <tr>
      <th></th>
      {#each grades as grade}
        <th class="border bg-[#F7FAF8] text-[14px] font-bold leading-[130%] text-[#1D1F1E]"
          >{grade}</th
        >
      {/each}
      <th class="bg-[#F7FAF8] py-[10px] text-[14px] font-bold leading-[130%] text-[#1D1F1E]"
        >Total</th
      >
    </tr>
  </thead>
  <tbody>
    {#if by === 'teacher'}
      {#each teachers as teacher}
        <tr>
          <th
            class="border bg-[#F7FAF8] px-3 py-[10px] text-left text-[14px] font-bold leading-[130%] text-[#1D1F1E]"
            >{teacher}</th
          >
          {#each grades as grade}
            <td class="border px-4 text-[14px] font-normal leading-[130%] text-[#616663]"
              >{tableByTeacher[teacher]?.[grade] ?? ''}</td
            >
          {/each}
          <td class="border px-4 text-[14px] font-normal leading-[130%] text-[#616663]"
            >{Object.values(tableByTeacher[teacher]).reduce((acc, val) => acc + val, 0)}</td
          >
        </tr>
      {/each}
    {:else if by === 'subject'}
      {#each subjects as subject}
        <tr>
          <th
            class="border bg-[#F7FAF8] px-3 py-[10px] text-left text-[14px] font-bold leading-[130%] text-[#1D1F1E]"
            >{subject}</th
          >
          {#each grades as grade}
            <td class="border px-4 text-[14px] font-normal leading-[130%] text-[#616663]"
              >{tableBySubject[subject]?.[grade] ?? ''}</td
            >
          {/each}
          <td class="border px-4 text-[14px] font-normal leading-[130%] text-[#616663]"
            >{Object.values(tableBySubject[subject]).reduce((acc, val) => acc + val, 0)}</td
          >
        </tr>
      {/each}
    {/if}
    <tr>
      <th
        class="border bg-[#F7FAF8] px-3 py-[10px] text-left text-[14px] font-bold leading-[130%] text-[#1D1F1E]"
        >Total</th
      >
      {#each grades as grade}
        <td class="border px-4 text-[14px] font-normal leading-[130%] text-[#616663]"
          >{tableByGrade[grade]}</td
        >
      {/each}
      <td class="border px-4 text-[14px] font-normal leading-[130%] text-[#616663]"
        >{Object.values(tableByTeacher).reduce(
          (acc, teacher) => acc + Object.values(teacher).reduce((subAcc, val) => subAcc + val, 0),
          0
        )}</td
      >
    </tr>
  </tbody>
</table>
