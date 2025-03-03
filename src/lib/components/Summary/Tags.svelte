<script lang="ts">
  import { tags } from '$lib/state/Tags.svelte';
  import Tooltip from '$lib/components/Base/Tooltip.svelte';

  const { kind, name }: { kind: 'teacher' | 'grade'; name: string; small: boolean } = $props();
</script>

<!-- completed -->
{#if (kind === 'teacher' && tags.byTeacher[name].has('completed')) || (kind === 'grade' && tags.byGrade[name].has('completed'))}
  <Tooltip>
    {#snippet trigger()}
      <div
        class="flex size-5 flex-row items-center justify-center rounded-[4px] bg-[#B9F8CF] text-[10px] font-semibold text-[#016730]"
      >
        C
      </div>
    {/snippet}
    {#snippet content()}
      <p class="w-40">
        <b>Completo:</b> Este {kind === 'teacher' ? 'profesor' : 'curso'} tiene todas sus clases asignadas.
      </p>
    {/snippet}
  </Tooltip>

  <!-- priority -->
{:else if kind === 'teacher' && tags.byTeacher[name].has('priority')}
  <Tooltip>
    {#snippet trigger()}
      <div
        class=" flex size-5 flex-row items-center justify-center rounded-[4px] bg-[#DDD6FF] text-[10px] font-semibold text-[#5D0EC1]"
      >
        P
      </div>
    {/snippet}
    {#snippet content()}
      <p class="w-40">
        <b>Prioridad:</b> Debes asignar este profesor primero para reducir la cantidad de conflictos
        en el horario.
      </p>
    {/snippet}
  </Tooltip>

  <!-- low-availability -->
{:else if (kind === 'teacher' && tags.byTeacher[name].has('low-availability')) || (kind === 'grade' && tags.byGrade[name].has('low-availability'))}
  <Tooltip>
    {#snippet trigger()}
      <div
        class="flex size-5 flex-row items-center justify-center rounded-[4px] bg-[#FEE685] text-[10px] font-semibold text-[#E17100]"
      >
        B
      </div>
    {/snippet}
    {#snippet content()}
      <p class="w-40">
        <b>Baja Disponibilidad:</b> Este {kind === 'teacher' ? 'profesor' : 'curso'} tiene una o más
        clases con baja disponibilidad de horario.
      </p>
    {/snippet}
  </Tooltip>

  <!-- conflict -->
{:else if (kind === 'teacher' && tags.byTeacher[name].has('conflict')) || (kind === 'grade' && tags.byGrade[name].has('conflict'))}
  <Tooltip>
    {#snippet trigger()}
      <div
        class="flex size-5 flex-row items-center justify-center rounded-[4px] bg-[#FFCACA] text-[10px] font-semibold text-[#9E0812]"
      >
        C
      </div>
    {/snippet}
    {#snippet content()}
      <p class="w-40">
        <b>Conflicto:</b> Este {kind === 'teacher' ? 'profesor' : 'curso'} tiene una o más clases sin
        horarios disponibles.
      </p>
    {/snippet}
  </Tooltip>
{/if}
