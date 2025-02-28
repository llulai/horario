<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import {
    blockedTimeslots,
    type BlockedTimeslot,
    type Day,
    type Block,
    type Time
  } from '$lib/state/Timetable.svelte';
  import classNames from 'classnames';
  import LockClosed from '$lib/components/Icons/LockClosed.svelte';

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

<button
  class={classNames(
    'group flex h-full w-full flex-row items-center justify-center gap-2 rounded-[4px] border-dashed hover:border',
    { 'border-[#E50000] bg-[#FFEBEB] text-[#E50000]': blockedTimeslot },
    { 'border-[#545755] bg-[#F3F4F6] hover:text-[#545755]': !blockedTimeslot }
  )}
  onclick={handleOnClick}
>
  {#if blockedTimeslot}
    <div class="flex-shrink-0">
      <LockClosed />
    </div>
    <p class="w-min flex-shrink text-left text-[12px] font-semibold group-hover:hidden">
      Horario Bloqueado
    </p>
    <p class="hidden w-min flex-shrink text-left text-[12px] font-semibold group-hover:block">
      Desbloquear
    </p>
  {:else}
    <div class="hidden flex-shrink-0 group-hover:block">
      <LockClosed />
    </div>
    <p class="hidden w-min flex-shrink text-left text-[12px] font-semibold group-hover:block">
      Bloquear Horario
    </p>
  {/if}
</button>
