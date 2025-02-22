<script lang="ts">
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';
</script>

<table class="table-auto border-collapse border text-center">
  <thead>
    <tr>
      <th>Curso</th>
      <th>Código</th>
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
      </tr>
    {/each}
  </tbody>
</table>
