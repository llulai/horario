<script lang="ts">
  import { timetable, type Period, type WeeklyLoad } from '$lib/state/Timetable.svelte';
  import Table from './Table.svelte';
  import WeeklyLoadUpload from './WeeklyLoadUpload.svelte';

  type Step = 'uploadWeeklyLoad' | 'checkLoadBySubject' | 'checkLoadByTeacher';
  let step = $state<Step>('uploadWeeklyLoad');

  let timetableName = $state<string>('');
  let timetablePeriods = $state<Period>(7);
  let timetableFile = $state<File | null>(null);

  let weeklyLoad = $state<WeeklyLoad[] | null>(null);
  let tableByTeacher = $state<Record<string, Record<string, number>>>({});
  let tableBySubject = $state<Record<string, Record<string, number>>>({});
  let tableByGrade = $state<Record<string, number>>({});
  let teachers = $state<Set<string>>(new Set<string>());
  let grades = $state<Set<string>>(new Set<string>());
  let subjects = $state<Set<string>>(new Set<string>());

  const loadWorkload = async () => {
    if (timetableFile) {
      fetch('/api/lessons', {
        method: 'POST',
        body: timetableFile
      })
        .then((response) => response.json())
        .then((newWeeklyLoad) => {
          step = 'checkLoadBySubject';
          weeklyLoad = newWeeklyLoad;
          tableByTeacher = getTableByTeacher(newWeeklyLoad);
          tableBySubject = getTableBySubject(newWeeklyLoad);
          tableByGrade = getTableByGrade(newWeeklyLoad);
          teachers = getTeachers(newWeeklyLoad);
          grades = getGrades(newWeeklyLoad);
          subjects = getSubjects(newWeeklyLoad);
        });
    }
  };

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    timetableFile = target.files?.[0] || null;
  };

  const getTableByTeacher = (
    load: WeeklyLoad[]
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

  const getTableByGrade = (load: WeeklyLoad[]): Record<string, number> | never => {
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
    load: WeeklyLoad[]
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

  const getTeachers = (load: WeeklyLoad[]): Set<string> => {
    return new Set(load.map((lesson) => lesson.teacherName));
  };

  const getGrades = (load: WeeklyLoad[]): Set<string> => {
    return new Set(load.map((lesson) => lesson.gradeName));
  };

  const getSubjects = (load: WeeklyLoad[]): Set<string> => {
    return new Set(load.map((lesson) => lesson.subjectName));
  };

  $inspect(tableByTeacher);
</script>

{#if step === 'uploadWeeklyLoad'}
  <WeeklyLoadUpload bind:timetableName bind:timetablePeriods {loadWorkload} {handleFileChange} />
{:else if step === 'checkLoadBySubject'}
  <Table
    {grades}
    {teachers}
    {subjects}
    {tableByTeacher}
    {tableByGrade}
    {tableBySubject}
    by="subject"
  />
  <button
    type="button"
    class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
    onclick={() => {
      step = 'checkLoadByTeacher';
    }}>Comenzar con el horario</button
  >
{:else if step === 'checkLoadByTeacher'}
  <Table
    {grades}
    {teachers}
    {subjects}
    {tableByTeacher}
    {tableByGrade}
    {tableBySubject}
    by="teacher"
  />
  <button
    type="button"
    class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
    onclick={() => {
      if (weeklyLoad) {
        timetable.fromWeeklyLoad(weeklyLoad, timetablePeriods);
      }
    }}>Comenzar con el horario</button
  >
{/if}
