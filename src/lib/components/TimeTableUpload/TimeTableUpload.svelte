<script lang="ts">
  import { timetable, type Period, type WeeklyLoad } from '$lib/state/Timetable.svelte';
  import Table from './Table.svelte';
  import WeeklyLoadUpload from './WeeklyLoadUpload.svelte';

  type Step = 'uploadWeeklyLoad' | 'checkLoadBySubject' | 'checkLoadByTeacher';
  let step = $state<Step>('uploadWeeklyLoad');

  let timetableName = $state<string>('');
  let timetablePeriods = $state<Period>(7);
  let timetableFile = $state<File | null>(null);
  let weeklyLoad = $state<WeeklyLoad[] | null>(null);

  const loadWorkload = async () => {
    if (timetableFile) {
      fetch('/api/lessons', {
        method: 'POST',
        body: timetableFile
      })
        .then((response) => response.json())
        .then((newWeeklyLoad) => {
          step = 'checkLoadBySubject';
          weeklyLoad = newWeeklyLoad;
        });
    }
  };

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    timetableFile = target.files?.[0] || null;
  };
</script>

{#if step === 'uploadWeeklyLoad'}
  <WeeklyLoadUpload bind:timetableName bind:timetablePeriods {loadWorkload} {handleFileChange} />
{:else if step === 'checkLoadBySubject' && weeklyLoad}
  <div class="flex flex-col items-center gap-6">
    <Table {weeklyLoad} by="subject" />
    <button
      type="button"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      onclick={() => {
        step = 'checkLoadByTeacher';
      }}>Comenzar con el horario</button
    >
  </div>
{:else if step === 'checkLoadByTeacher' && weeklyLoad}
  <div class="flex flex-col items-center gap-6">
    <Table {weeklyLoad} by="teacher" />
    <button
      type="button"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      onclick={() => {
        if (weeklyLoad) {
          timetable.fromWeeklyLoad(weeklyLoad, timetablePeriods);
        }
      }}>Comenzar con el horario</button
    >
  </div>
{/if}
