<script lang="ts">
  import { type Block, type Period, periods, Time } from '$lib/state/Timetable.svelte';
  import Minus from '../Icons/Minus.svelte';
  import Plus from '../Icons/Plus.svelte';

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

<div class="absolute inset-0 grid grid-cols-[1fr_840px]">
  <div class="bg-black/40"></div>
  <form
    class="flex flex-col items-start bg-white p-10"
    onsubmit={(event) => {
      event.preventDefault();
      addPeriod();
      closePeriodManager();
    }}
  >
    <h1 class="text-[40px] font-bold leading-[120%] text-[#1D1F1E]">Agregar jornada</h1>

    <div class="mt-10 flex flex-col gap-1">
      <label for="periodName" class="text-[16px] font-semibold leading-[130%] text-[#1D1F1E]"
        >Nombre jornada:</label
      >
      <input
        id="periodName"
        placeholder="Nombre jornada"
        type="text"
        bind:value={periodName}
        required
      />
    </div>

    <div class="mt-20 flex flex-col gap-5">
      <div class="flex flex-row gap-8 text-[20px] font-bold leading-[130%] text-[#1D1F1E]">
        <div class="w-32">Período</div>
        <div class="w-32">Inicio</div>
        <div class="w-32">Fin</div>
      </div>
      <div class="flex flex-col gap-4">
        {#each { length: nPeriods } as _, i}
          <div
            class="flex flex-row items-center gap-8 rounded-[12px] border border-[#DCE0DD] py-4 pl-8 pr-4"
          >
            <div class="w-24 text-[16px] font-bold leading-[130%] text-[#616663]">{i + 1}</div>
            <div><input class="w-32" type="time" bind:value={startTimes[i]} required /></div>
            <div><input class="w-32" type="time" bind:value={endTimes[i]} required /></div>
          </div>
        {/each}
      </div>
    </div>

    <div class="mt-8 flex flex-row gap-4">
      <button
        type="button"
        disabled={nPeriods <= 1}
        class="btn-secondary btn-medium w-56 justify-center"
        onclick={() => {
          nPeriods--;
        }}
      >
        <Minus />
        <p>Remover período</p>
      </button>
      <button
        type="button"
        class="btn-secondary btn-medium w-56 justify-center"
        onclick={() => {
          nPeriods++;
        }}
      >
        <Plus />
        <p>Agregar período</p>
      </button>

      <button type="submit" class="btn-primary btn-medium w-56 justify-center">Confirmar</button>
    </div>
  </form>
</div>
