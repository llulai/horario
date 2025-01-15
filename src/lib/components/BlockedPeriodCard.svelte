<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import timetable, { type BlockedPeriod } from '$lib/state/timetable.svelte';

  const {
    blockedPeriod
  }: {
    blockedPeriod: Omit<BlockedPeriod, 'timeslot'>;
  } = $props();

  let dragging = $state(false);

  const opacity = $derived(dragging ? 'opacity-75' : 'opacity-100');

  const handleDragStart = (event: DragEvent) => {
    dragging = true;
    if (event.dataTransfer && currently.selected) {
      currently.setDragging({
        kind: 'blockedPeriod',
        blockedPeriod
      });
    }
  };

  const handleDragEnd = () => {
    dragging = false;
    currently.setDragging(null);
  };

  const handleDblClick = () => {
    timetable.removeBlockedPeriod(blockedPeriod.id);
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class={`h-[24px] w-12 rounded-[2px] border border-red-600 bg-white text-red-600 ${opacity} flex flex-col items-center justify-center text-[20px] hover:cursor-pointer`}
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  ondblclick={handleDblClick}
>
  X
</div>
