<script lang="ts">
  import availability from '$lib/state/Availability.svelte';
  import currently from '$lib/state/currently.svelte';
  import { subjects, type Lesson } from '$lib/state/Timetable.svelte';
  import { getColor } from '$lib/utils/colors';

  const { lesson }: { lesson: Lesson } = $props();

  const attributeToShow = $derived(
    currently.selected && currently.selected.kind === 'teacher' ? 'gradeName' : 'subjectName'
  );
  const bg = $derived(getColor(lesson[attributeToShow], attributeToShow));
  let isDragging = $state(false);

  const handleDragStart = () => {
    currently.setDragging(lesson);
    isDragging = true;
  };
  const handleDragEnd = () => {
    currently.setDragging(null);
    isDragging = false;
  };

  const availableOptions = $derived(
    Object.values(availability.byLesson[lesson.id]).reduce(
      (sum, dailyAvailability) =>
        sum + Object.values(dailyAvailability).reduce((sum, period) => sum + Number(period), 0),
      0
    )
  );
</script>

<!-- FIXME: create var for label -->
<button
  draggable="true"
  ondragstart={handleDragStart}
  ondragend={handleDragEnd}
  class={`relative flex h-6 w-12 items-center justify-center rounded-[2px] ${bg} ${isDragging || lesson.timeslot ? 'opacity-20' : ''} text-white`}
  ><p>
    {attributeToShow === 'subjectName'
      ? subjects.byName[lesson[attributeToShow]].code
      : lesson[attributeToShow]}
  </p>
  {#if !lesson.timeslot}
    {#if availableOptions === 0}
      <div
        class="font-mono absolute right-0 top-0 flex size-3 -translate-y-1/2 translate-x-1/2 flex-row items-center justify-center rounded-full border border-white bg-[#FFCACA] text-[8px] text-[#9E0812]"
      >
        {availableOptions}
      </div>
    {:else if availableOptions <= 3}
      <div
        class="font-mono absolute right-0 top-0 flex h-3 w-3 -translate-y-1/2 translate-x-1/2 flex-row items-center justify-center rounded-full border border-white bg-[#FEE685] text-[8px] text-[#973B00]"
      >
        {availableOptions}
      </div>
    {/if}
  {/if}
</button>
