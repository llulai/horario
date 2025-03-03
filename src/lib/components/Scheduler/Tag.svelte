<script lang="ts">
  import { tags } from '$lib/state/Tags.svelte';
  import Tooltip from '$lib/components/Base/Tooltip.svelte';
  const { kind, name }: { kind: 'teacher' | 'grade'; name: string } = $props();

  const currentTags = $derived.by(() => {
    if (kind === 'teacher') {
      return tags.byTeacher[name];
    }
    return tags.byGrade[name];
  });
</script>

<!-- tags -->
{#if currentTags.has('completed')}
  <Tooltip>
    {#snippet trigger()}
      <div class={`flex flex-row items-center justify-center`}>
        <div
          class={`flex flex-row items-center justify-center rounded-[4px] bg-[#B9F8CF] px-2 py-[2px] text-[12px] font-bold text-[#016730]`}
        >
          COMPLETADO
        </div>
      </div>
    {/snippet}
    {#snippet content()}
      <p class="w-40">
        <b>Completo:</b> Este {kind === 'teacher' ? 'profesor' : 'curso'} tiene todas sus clases asignadas.
      </p>
    {/snippet}
  </Tooltip>
{:else if currentTags.has('priority')}
  <Tooltip>
    {#snippet trigger()}
      <div class={`flex flex-row items-center justify-center`}>
        <div
          class={`flex flex-row items-center justify-center rounded-[4px] bg-[#DDD6FF] px-2 py-[2px] text-[12px] font-bold text-[#5D0EC1]`}
        >
          PRIORIDAD
        </div>
      </div>
    {/snippet}
    {#snippet content()}
      <p class="w-40">
        <b>Prioridad:</b> Debes asignar este profesor primero para reducir la cantidad de conflictos
        en el horario.
      </p>
    {/snippet}
  </Tooltip>
{:else if currentTags.has('low-availability')}
  <Tooltip>
    {#snippet trigger()}
      <div class={`flex flex-row items-center justify-center`}>
        <div
          class={`flex flex-row items-center justify-center rounded-[4px] bg-[#FEE685] px-2 py-[2px] text-[13px] font-bold text-[#E17100]`}
        >
          BAJA DISPONIBILIDAD
        </div>
      </div>
    {/snippet}
    {#snippet content()}
      <p class="w-40">
        <b>Baja Disponibilidad:</b> Este {kind === 'teacher' ? 'profesor' : 'curso'} tiene una o más
        clases con baja disponibilidad de horario.
      </p>
    {/snippet}
  </Tooltip>
{:else if currentTags.has('conflict')}
  <Tooltip>
    {#snippet trigger()}
      <div class={`flex flex-row items-center justify-center`}>
        <div
          class={`flex flex-row items-center justify-center rounded-[4px] bg-[#FFCACA] px-2 py-[2px] text-[13px] font-bold text-[#9E0812]`}
        >
          CONFLICTO
        </div>
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
