<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import timetable, { type Lecture } from '$lib/state/timetable.svelte';
  import BlockedPeriodCard from './BlockedPeriodCard.svelte';
  import SubjectCard from './SubjectCard.svelte';
</script>

{#if currently.selected}
  {#each Object.entries(timetable.byTeacher[currently.selected.name].unassignedLectures.reduce( (lbs: Record<string, Lecture[]>, lec: Lecture) => {
        if (!(lec.subject in lbs)) {
          lbs[lec.subject] = [];
        }
        lbs[lec.subject].push(lec);
        return lbs;
      }, {} )) as [subject, lectures]}
    <div class="flex flex-row gap-2">
      {subject}
      <div class="flex w-[222px] flex-row flex-wrap gap-2">
        {#each lectures as lecture}
          {#key lecture.id}
            <SubjectCard {lecture} show="classGroup" />
          {/key}
        {/each}
      </div>
    </div>
  {/each}

  <div class="flex flex-row gap-2">
    Bloquear Horario
    <div class="flex w-[222px] flex-row flex-wrap gap-2">
      <BlockedPeriodCard blockedPeriod={{ ...currently.selected, id: 'newId' }} />
    </div>
  </div>
{/if}
