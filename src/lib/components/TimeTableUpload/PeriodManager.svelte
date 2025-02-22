<script lang="ts">
  import { type Block, type Period, periods, Time } from '$lib/state/Timetable.svelte';

  const { closePeriodManager }: { closePeriodManager: () => void } = $props();

  let periodName = $state('');
  let nPeriods = $state(1);

  let startTimes: string[] = $state([]);
  let endTimes: string[] = $state([]);

  const addPeriod = () => {
    const period: Period = {};
    for (let i = 0; i < nPeriods; i++) {
      const [startHour, startMin] = startTimes[i].split(':');
      const [endHour, endMin] = endTimes[i].split(':');
      period[(i + 1) as Block] = [
        (i + 1) as Block,
        new Time(Number(startHour), Number(startMin)),
        new Time(Number(endHour), Number(endMin))
      ];
    }
    periods.dispatch({ event: 'addPeriod', payload: { id: periodName, period } });
  };
</script>

<form
  class="flex flex-col items-start gap-8 p-10"
  onsubmit={(event) => {
    event.preventDefault();
    addPeriod();
    closePeriodManager();
  }}
>
  <div class="flex flex-col gap-2">
    <label for="periodName" class="font-semibold">Nombre jornada:</label>
    <input id="periodName" type="text" bind:value={periodName} required />
  </div>

  <table>
    <thead>
      <tr>
        <th>Período</th>
        <th>Inicio</th>
        <th>Fin</th>
      </tr>
    </thead>
    <tbody>
      {#each { length: nPeriods } as _, i}
        <tr>
          <td>{i + 1}</td>
          <td><input type="time" bind:value={startTimes[i]} required /></td>
          <td><input type="time" bind:value={endTimes[i]} required /></td>
        </tr>
      {/each}
      <tr>
        <td colspan="3" class="space-x-2 pt-10">
          <button
            type="button"
            disabled={nPeriods <= 1}
            class="rounded-sm bg-red-500 p-2 text-[12px] font-medium text-white disabled:bg-gray-200"
            onclick={() => {
              nPeriods--;
            }}>remover período</button
          >
          <button
            type="button"
            class="rounded-sm bg-green-500 p-2 text-[12px] font-medium text-white"
            onclick={() => {
              nPeriods++;
            }}>agregar período</button
          >
        </td>
      </tr>
    </tbody>
  </table>

  <button type="submit" class="w-fit rounded-sm bg-blue-500 p-2 text-[12px] font-medium text-white"
    >agregar jornada</button
  >
</form>
