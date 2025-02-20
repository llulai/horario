<script lang="ts">
  import AssignedLessons from './AssignedLessons.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import Calendar from './Calendar.svelte';
  import TargetArea from './TargetArea.svelte';
</script>

<div class="grid grid-cols-1 grid-rows-[min-content_1fr]">
  <Calendar />
  <AssignedLessons />
  <TargetArea />

  <div class="row-start-2">
    <AvailableLessons />
  </div>
</div>
