<script lang="ts">
  import { periods } from '$lib/state/Timetable.svelte';
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';

  const { openPeriodManager }: { openPeriodManager: () => void } = $props();
</script>

<table class="table-auto border-collapse border text-center">
  <thead>
    <tr>
      <th>Curso</th>
      <th>Código</th>
      <th>Período</th>
    </tr>
  </thead>
  <tbody>
    {#each weeklyLoad.grades as subject}
      <tr>
        <th class="border px-6 text-left">{subject.name}</th>
        <td
          ><input
            type="text"
            required={true}
            minlength="2"
            maxlength="3"
            onchange={(event) => {
              const target = event.target as HTMLInputElement;
              weeklyLoad.dispatch({
                event: 'setGradeCode',
                payload: { name: subject.name, code: target.value }
              });
            }}
          />
        </td>
        <td>
          <select
            onchange={(event) => {
              const target = event.target as HTMLSelectElement;
              weeklyLoad.dispatch({
                event: 'setGradePeriod',
                payload: { name: subject.name, periodId: target.value }
              });
            }}
          >
            <option></option>
            {#each Object.keys(periods.byId) as periodId}
              <option value={periodId}>{periodId}</option>
            {/each}
          </select>
        </td>
      </tr>
    {/each}
    <tr>
      <td rowspan="3" class="p-2">
        <button
          type="button"
          class="place-self-end rounded-sm bg-green-500 p-2 text-[12px] font-medium text-white"
          onclick={openPeriodManager}>agregar período</button
        >
      </td>
    </tr>
  </tbody>
</table>
