<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import type { Day, Block, Time } from '$lib/state/Periods.svelte';
  import { blockedTimeslots, type BlockedTimeslot } from '$lib/state/Timetable.svelte';

  let {
    blockedTimeslot,
    day,
    block,
    blockStart: start,
    blockEnd: end,
    periodId
  }: {
    blockedTimeslot?: BlockedTimeslot;
    day: Day;
    block: Block;
    blockStart: Time;
    blockEnd: Time;
    periodId: string;
  } = $props();

  const bg = $derived(blockedTimeslot ? 'bg-white border-2 border-[#6B7280]' : 'bg-[#F3F4F6]');

  const handleOnClick = () => {
    if (blockedTimeslot) {
      blockedTimeslots.dispatch({
        event: 'removeBlockedTimeslot',
        payload: { id: blockedTimeslot.id }
      });
    } else if (currently.selected && currently.selected.kind !== 'category') {
      blockedTimeslots.dispatch({
        event: 'addBlockedTimeslot',
        payload: { ...currently.selected, timeslot: [day, block, start, end], periodId }
      });
    }
  };
</script>

<button class={`h-full w-full rounded-[2px] ${bg}`} onclick={handleOnClick}
  >{blockedTimeslot ? 'bloqueado' : ''}</button
>
