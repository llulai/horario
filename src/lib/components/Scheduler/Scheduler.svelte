<script lang="ts">
  import { type Period, Time, periods } from '$lib/state/Periods.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import Calendar from './Calendar.svelte';
  import TargetArea from './TargetArea.svelte';

  const { kind, name }: { kind: 'teacher' | 'grade'; name: string } = $props();

  const getFirstAndLastBlocks = (period: Period): [Time, Time] => {
    const startTime = getMinTime(...Object.values(period).map((block) => block[1]));
    const endTime = getMaxTime(...Object.values(period).map((block) => block[2]));
    return [startTime, endTime];
  };

  const getMinTime = (...times: Time[]): Time => {
    return times.sort((a, b) => {
      return a.valueOf() - b.valueOf();
    })[0];
  };

  const getMaxTime = (...times: Time[]): Time => {
    return times.sort((b, a) => {
      return a.valueOf() - b.valueOf();
    })[0];
  };

  const time: [Time, Time] | undefined = $derived.by(() => {
    if (kind === 'grade') {
      const period = periods.byGrade[name];
      if (period) {
        return getFirstAndLastBlocks(period);
      }
    } else if (kind === 'teacher') {
      const startTime = getMinTime(
        ...Object.values(periods.byTeacher[name])
          .map(getFirstAndLastBlocks)
          .map((block) => block[0])
      );
      const endTime = getMaxTime(
        ...Object.values(periods.byTeacher[name])
          .map(getFirstAndLastBlocks)
          .map((block) => block[1])
      );
      return [startTime, endTime];
    }
  });

  const start = $derived(time ? new Time(time[0].hour, 0) : new Time(8, 0));
  const end = $derived.by(() => {
    if (time) {
      if (time[1].minute === 0) return time[1];
      else return new Time(time[1].hour + 1, 0);
    }
    return new Time(11, 0);
  });
</script>

<div class="grid grid-cols-1 grid-rows-[min-content_1fr]">
  <Calendar {start} {end} />
  <TargetArea {kind} {name} {start} {end} />

  <div class="row-start-2">
    <AvailableLessons {kind} {name} />
  </div>
</div>
