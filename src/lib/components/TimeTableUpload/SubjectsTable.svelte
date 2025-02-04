<script lang="ts">
  import { subjects } from '$lib/state/Timetable.svelte';
</script>

<table class="table-auto border-collapse border text-center">
  <thead>
    <tr>
      <th>Asignatura</th>
      <th>Código</th>
    </tr>
  </thead>
  <tbody>
    {#each subjects.list as subject}
      <tr>
        <th class="border px-6 text-left">{subject.name}</th>
        <td
          ><input
            type="text"
            required={true}
            minlength="3"
            maxlength="3"
            onchange={(event: InputEvent) => {
              console.warn('event', event);
              subjects.dispatch({
                event: 'setCode',
                payload: { name: subject.name, code: event.target.value }
              });
            }}
          />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
