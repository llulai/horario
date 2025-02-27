<script lang="ts">
  import { periods, Time, type Period, timetable } from '$lib/state/Timetable.svelte';
  import currently from '$lib/state/currently.svelte';
  import { onMount } from 'svelte';
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';
  import '/src/app.css';
  let { children } = $props();

  // const afternoonPeriodId = 'tarde';
  //
  // const afternoonPeriod: Period = {
  //   1: [1, new Time(14, 0), new Time(14, 45)],
  //   2: [2, new Time(14, 45), new Time(15, 30)],
  //   3: [3, new Time(15, 45), new Time(16, 30)],
  //   4: [4, new Time(16, 30), new Time(17, 15)],
  //   5: [5, new Time(17, 30), new Time(18, 15)],
  //   6: [6, new Time(18, 15), new Time(19, 0)],
  //   7: [7, new Time(19, 0), new Time(19, 45)]
  // };
  //
  // periods.dispatch({
  //   event: 'addPeriod',
  //   payload: { id: afternoonPeriodId, period: afternoonPeriod }
  // });
  //
  // onMount(async () => {
  //   const data = await fetch('/api/test-lessons').then((response) => response.json());
  //   weeklyLoad.dispatch({ event: 'loadWeeklyLoad', payload: { weeeklyLoads: data } });
  //
  //   weeklyLoad.dispatch({
  //     event: 'setSubjectCode',
  //     payload: { name: 'Artes Visuales', code: 'ArV' }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setSubjectCode',
  //     payload: { name: 'Ciencias Naturales', code: 'CsN' }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setSubjectCode',
  //     payload: { name: 'Educación Física', code: 'EdF' }
  //   });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Tecnología', code: 'TEC' } });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Historia', code: 'HIS' } });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Inglés', code: 'ING' } });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Lenguaje', code: 'LEN' } });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Matemática', code: 'MAT' } });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Música', code: 'MUS' } });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Orientación', code: 'ORI' } });
  //   weeklyLoad.dispatch({ event: 'setSubjectCode', payload: { name: 'Religión', code: 'REL' } });
  //
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '2ºA', code: '2A' } });
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '2ºB', code: '2B' } });
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '3ºA', code: '3A' } });
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '3ºB', code: '3B' } });
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '4ºA', code: '4A' } });
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '4ºB', code: '4B' } });
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '5ºA', code: '5A' } });
  //   weeklyLoad.dispatch({ event: 'setGradeCode', payload: { name: '5ºB', code: '5B' } });
  //
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '2ºA', periodId: afternoonPeriodId }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '2ºB', periodId: afternoonPeriodId }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '3ºA', periodId: afternoonPeriodId }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '3ºB', periodId: afternoonPeriodId }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '4ºA', periodId: afternoonPeriodId }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '4ºB', periodId: afternoonPeriodId }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '5ºA', periodId: afternoonPeriodId }
  //   });
  //   weeklyLoad.dispatch({
  //     event: 'setGradePeriod',
  //     payload: { name: '5ºB', periodId: afternoonPeriodId }
  //   });
  //
  //   timetable.fromWeeklyLoad(data, weeklyLoad.grades, weeklyLoad.subjects);
  // });
  //
  // currently.selectCourses();
</script>

{@render children()}
