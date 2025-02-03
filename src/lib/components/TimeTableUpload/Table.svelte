<script lang="ts">
  const {
    grades,
    teachers,
    subjects,
    tableByTeacher,
    tableByGrade,
    tableBySubject,
    by
  }: {
    grades: Set<string>;
    teachers: Set<string>;
    subjects: Set<string>;
    tableByTeacher: Record<string, Record<string, number>>;
    tableByGrade: Record<string, number>;
    tableBySubject: Record<string, Record<string, number>>;
    by: 'subject' | 'teacher';
  } = $props();
</script>

<table class="table-auto border-collapse border text-center">
  <thead>
    <tr>
      <th></th>
      {#each grades as grade}
        <th class="border">{grade}</th>
      {/each}
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {#if by === 'teacher'}
      {#each teachers as teacher}
        <tr>
          <th class="border px-6 text-left">{teacher}</th>
          {#each grades as grade}
            <td class="border px-4">{tableByTeacher[teacher]?.[grade] ?? ''}</td>
          {/each}
          <td class="border px-4"
            >{Object.values(tableByTeacher[teacher]).reduce((acc, val) => acc + val, 0)}</td
          >
        </tr>
      {/each}
    {:else if by === 'subject'}
      {#each subjects as subject}
        <tr>
          <th class="border px-6 text-left">{subject}</th>
          {#each grades as grade}
            <td class="border px-4">{tableBySubject[subject]?.[grade] ?? ''}</td>
          {/each}
          <td class="border px-4"
            >{Object.values(tableBySubject[subject]).reduce((acc, val) => acc + val, 0)}</td
          >
        </tr>
      {/each}
    {/if}
    <tr>
      <th class="border px-6 text-left">Total</th>
      {#each grades as grade}
        <td class="border px-4">{tableByGrade[grade]}</td>
      {/each}
      <td class="border"
        >{Object.values(tableByTeacher).reduce(
          (acc, teacher) => acc + Object.values(teacher).reduce((subAcc, val) => subAcc + val, 0),
          0
        )}</td
      >
    </tr>
  </tbody>
</table>
