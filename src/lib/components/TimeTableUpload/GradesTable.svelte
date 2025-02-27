<script lang="ts">
  import { periods } from '$lib/state/Timetable.svelte';
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';
</script>

<div class="flex w-[789px] flex-col gap-16">
  <div
    class="flex flex-row items-center gap-8 pr-4 text-[20px] font-bold leading-[130%] text-[#1D1F1E]"
  >
    <div class="w-24">Curso</div>
    <div class="w-[200px]">Código</div>
    <div>Período</div>
  </div>
  {#each weeklyLoad.grades as grade}
    <div
      class="flex flex-row items-center gap-8 rounded-[12px] border border-[#DCE0DD] py-4 pl-8 pr-4"
    >
      <div class="w-16 text-[16px] font-bold leading-[130%] text-[#616663]">
        {grade.name}
      </div>
      <input
        class="w-[200px]"
        type="text"
        placeholder="Ingresa tu código"
        required={true}
        minlength="2"
        maxlength="3"
        onchange={(event) => {
          const target = event.target as HTMLInputElement;
          weeklyLoad.dispatch({
            event: 'setGradeCode',
            payload: { name: grade.name, code: target.value }
          });
        }}
      />
      <div class="flex-grow">
        <select
          onchange={(event) => {
            const target = event.target as HTMLSelectElement;
            weeklyLoad.dispatch({
              event: 'setGradePeriod',
              payload: { name: grade.name, periodId: target.value }
            });
          }}
          placeholder="Elige un período"
        >
          <option value="">Elige una opción</option>
          {#each Object.keys(periods.byId) as periodId}
            <option value={periodId}>{periodId}</option>
          {/each}
        </select>
      </div>
    </div>
  {/each}
</div>
