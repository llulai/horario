<script lang="ts">
  import AvailableLessons from './AvailableLessons.svelte';
  import Calendar from './Calendar.svelte';
  import TargetArea from './TargetArea.svelte';

  const { periodId }: { periodId: string } = $props();
</script>

<div class="grid grid-cols-1 grid-rows-[min-content_1fr]">
  <Calendar />
  <TargetArea {periodId} />

  <div class="row-start-2">
    <AvailableLessons />
  </div>
</div>
