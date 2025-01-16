<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import timetable, { type Lecture } from '$lib/state/timetable.svelte';
  import BlockedPeriodCard from './BlockedPeriodCard.svelte';
  import SubjectCard from './SubjectCard.svelte';
</script>

{#if currently.selected}
  {#each Object.entries(timetable.byClass[currently.selected.name].unassignedLectures.reduce( (lbt: Record<string, Lecture[]>, lec: Lecture) => {
        if (!(lec.teacher in lbt)) {
          lbt[lec.teacher] = [];
        }
        lbt[lec.teacher].push(lec);
        return lbt;
      }, {} )) as [teacher, lectures]}
    <div class="flex flex-row gap-2">
      {teacher}
      <div class="flex w-[222px] flex-row flex-wrap gap-2">
        {#each lectures as lecture}
          {#key lecture.id}
            <SubjectCard {lecture} show="subject" double={lecture.duration === 2} rounded={true} />
          {/key}
        {/each}
      </div>
    </div>
  {/each}
  <div class="flex flex-row gap-2">
    Bloquear Horario
    <div class="flex w-[222px] flex-row flex-wrap gap-2">
      <BlockedPeriodCard blockedPeriod={{ ...currently.selected, id: null, duration: 1 }} />
      <BlockedPeriodCard blockedPeriod={{ ...currently.selected, id: null, duration: 2 }} />
    </div>
  </div>
{/if}
