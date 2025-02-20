<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { periods, type Period, type Time } from '$lib/state/Timetable.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import Calendar from './Calendar.svelte';
  import TargetArea from './TargetArea.svelte';

  const getFirstAndLastBlocks = (period: Period): [Time, Time] => {
    const startTime = getMinTime(...Object.values(period).map((block) => block[1]));
    const endTime = getMaxTime(...Object.values(period).map((block) => block[2]));
    return [startTime, endTime];
  };

  const getMinTime = (...times: Time[]): Time => {
    return times.sort((a, b) => {
      const diffHours = a[0] - b[0];
      const diffMinutes = a[1] - b[1];
      return diffHours * 60 + diffMinutes;
    })[0];
  };

  const getMaxTime = (...times: Time[]): Time => {
    return times.sort((b, a) => {
      const diffHours = a[0] - b[0];
      const diffMinutes = a[1] - b[1];
      return diffHours * 60 + diffMinutes;
    })[0];
  };

  const time: [Time, Time] | undefined = $derived.by(() => {
    if (currently.selected) {
      const { name, kind } = currently.selected;
      if (kind === 'grade') {
        const period = periods.byGrade[name];
        if (period) {
          return getFirstAndLastBlocks(period);
        }
      } else if (kind === 'teacher') {
        const startTime = getMinTime(
          ...periods.byTeacher[name].map(getFirstAndLastBlocks).map((block) => block[0])
        );
        const endTime = getMaxTime(
          ...periods.byTeacher[name].map(getFirstAndLastBlocks).map((block) => block[1])
        );
        return [startTime, endTime];
      }
    }
  });

  const start = $derived(time ? ([time[0][0], 0] as Time) : ([8, 0] as Time));
  const end = $derived.by(() => {
    if (time) {
      if (time[1][1] === 0) return time[1];
      else return [time[1][0] + 1, 0] as Time;
    }
    return [11, 0] as Time;
  });
</script>

<div class="grid grid-cols-1 grid-rows-[min-content_1fr]">
  <Calendar {start} {end} />
  <TargetArea {start} {end} />

  <div class="row-start-2">
    <AvailableLessons />
  </div>
</div>
