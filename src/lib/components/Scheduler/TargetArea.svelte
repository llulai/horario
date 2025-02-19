<script lang="ts">
  import { periods, type Time } from '$lib/state/Timetable.svelte';

  const { periodId }: { periodId: string } = $props();

  const startTime = [8, 0];
  const endTime = [15, 0];

  const days = [1, 2, 3, 4, 5] as const;
  const period = periods.byId[periodId];

  let containerWidth = $state(0);
  const bWidth = $derived(containerWidth / 5);

  const getPercentage = (time: Time) => {
    const [hour, minute] = time;
    const [startHour, startMinute] = startTime;
    const [endHour, endMinute] = endTime;
    const timestamp = hour * 60 + minute;
    return (
      ((timestamp - (startHour * 60 + startMinute)) /
        (endHour * 60 + endMinute - startHour * 60 - startMinute)) *
      100
    );
  };
</script>

<div
  class="relative col-start-1 col-end-2 row-start-1 row-end-2 mb-[39px] ml-[112px] mr-8 mt-[68px]"
  bind:clientWidth={containerWidth}
>
  {#each Object.entries(period) as [block, [start, end]]}
    {#each days as day}
      <div
        class="absolute p-1"
        style={`width: ${bWidth}px; left: ${bWidth * (day - 1)}px; top: ${getPercentage(start)}%; bottom: ${100 - getPercentage(end)}%;`}
      >
        <div class="h-full w-full rounded-[4px] bg-[#F5F5F5]"></div>
      </div>
    {/each}
  {/each}
</div>
