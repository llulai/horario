<script lang="ts">
  import Scheduler from './Scheduler.svelte';
  import SubjectCard from './SubjectCard.svelte';

  let props = $props();
</script>

<!-- teachers -->
<div class="flex h-full flex-col items-center gap-6 px-12 py-6">
  {#if props.currentlySelected}
    <div class="text-[24px]">{props.currentlySelected.name}</div>
    <div class="flex flex-col flex-wrap justify-center gap-6">
      <Scheduler setTimeslotForLecture={props.setTimeslotForLecture} />
      <div class="flew-row flex w-[272px] flex-wrap gap-2">
        {#if props.currentlySelected.kind == 'class'}
          {#each props.lecturesByCourse[props.currentlySelected.name].filter((l) => l.timeslot === undefined) as lecture}
            <SubjectCard {lecture} />
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>
