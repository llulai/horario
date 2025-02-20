<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import {
    blockedTimeslots,
    type BlockedTimeslot,
    type Day,
    type Block,
    type Time
  } from '$lib/state/Timetable.svelte';

  let {
    blockedTimeslot,
    day,
    block,
    start,
    end
  }: { blockedTimeslot?: BlockedTimeslot; day: Day; block: Block; start: Time; end: Time } =
    $props();

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
        payload: { ...currently.selected, timeslot: [day, block, start, end] }
      });
    }
  };
</script>

<button class={`h-10 rounded-[2px] ${bg}`} onclick={handleOnClick}
  >{blockedTimeslot ? 'bloqueado' : ''}</button
>
