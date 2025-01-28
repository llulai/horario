<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import {
    blockedTimeslots,
    type BlockedTimeslot,
    type Day,
    type Period
  } from '$lib/state/Timetable.svelte';

  let {
    blockedTimeslot,
    day,
    period
  }: { blockedTimeslot?: BlockedTimeslot; day: Day; period: Period } = $props();

  const bg = $derived(blockedTimeslot ? 'bg-white border-2 border-[#6B7280]' : 'bg-[#F3F4F6]');

  const handleOnClick = () => {
    if (blockedTimeslot) {
      blockedTimeslots.dispatch({
        event: 'removeBlockedTimeslot',
        payload: { id: blockedTimeslot.id }
      });
    } else if (currently.selected) {
      blockedTimeslots.dispatch({
        event: 'addBlockedTimeslot',
        payload: { ...currently.selected, timeslot: [day, period] }
      });
    }
  };
</script>

<button class={`h-10 rounded-[2px] ${bg}`} onclick={handleOnClick}
  >{blockedTimeslot ? 'bloqueado' : ''}</button
>
