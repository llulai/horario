<script lang="ts">
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';
</script>

<table class="table-auto border-collapse border text-center">
  <thead>
    <tr>
      <th>Asignatura</th>
      <th>Código</th>
    </tr>
  </thead>
  <tbody>
    {#each weeklyLoad.subjects as subject}
      <tr>
        <th class="border px-6 text-left">{subject.name}</th>
        <td
          ><input
            type="text"
            required={true}
            minlength="3"
            maxlength="3"
            onchange={(event) => {
              const target = event.target as HTMLInputElement;
              weeklyLoad.dispatch({
                event: 'setSubjectCode',
                payload: { name: subject.name, code: target.value }
              });
            }}
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
