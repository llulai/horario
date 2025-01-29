<script lang="ts">
  import { timetable, type Period } from '$lib/state/Timetable.svelte';

  let timetableName = $state<string>('');
  let timetablePeriods = $state<Period>(7);
  let timetableFile = $state<File | null>(null);

  const loadWorkload = async () => {
    if (timetableFile) {
      fetch('/api/lessons', {
        method: 'POST',
        body: timetableFile
      })
        .then((response) => response.json())
        .then((weeklyLoad) => {
          timetable.fromWeeklyLoad(weeklyLoad, timetablePeriods);
        });
    }
  };

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    timetableFile = target.files?.[0] || null;
  };
</script>

<div class="flex flex-col gap-8 p-10">
  <!-- name -->
  <div class="flex flex-col">
    <label for="timetable-name">Nombre del horario</label>
    <input id="timetable-name" bind:value={timetableName} />
  </div>

  <!-- file -->
  <div class="flex flex-col">
    <label for="timetable-name">Archivo con carga horaria</label>
    <input id="timetable-name" type="file" onchange={handleFileChange} />
  </div>

  <!-- periods -->
  <div class="flex flex-col">
    <label for="timetable-periods">Número de períodos</label>
    <input
      id="timetable-periods"
      bind:value={timetablePeriods}
      type="number"
      min="1"
      max="10"
      step="1"
    />
  </div>

  <!-- FIXME: disable button until file is uploaded -->
  <button
    type="button"
    class="w-fit rounded-[2px] bg-blue-500 px-3 py-2 text-white"
    onclick={loadWorkload}>Comenzar con el horario</button
  >
</div>
