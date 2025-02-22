<script lang="ts">
  import { tags } from '$lib/state/Tags.svelte';
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
  <div class={`flex flex-row items-center justify-center`}>
    <div
      class={`flex flex-row items-center justify-center rounded-[4px] bg-[#B9F8CF] px-2 py-[2px] text-[12px] font-bold text-[#016730]`}
    >
      COMPLETADO
    </div>
  </div>
{:else if currentTags.has('priority')}
  <div class={`flex flex-row items-center justify-center`}>
    <div
      class={`flex flex-row items-center justify-center rounded-[4px] bg-[#DDD6FF] px-2 py-[2px] text-[12px] font-bold text-[#5D0EC1]`}
    >
      PRIORIDAD
    </div>
  </div>
{:else if currentTags.has('low-availability')}
  <div class={`flex flex-row items-center justify-center`}>
    <div
      class={`flex flex-row items-center justify-center rounded-[4px] bg-[#FEE685] px-2 py-[2px] text-[13px] font-bold text-[#E17100]`}
    >
      BAJA DISPONIBILIDAD
    </div>
  </div>
{:else if currentTags.has('conflict')}
  <div class={`flex flex-row items-center justify-center`}>
    <div
      class={`flex flex-row items-center justify-center rounded-[4px] bg-[#FFCACA] px-2 py-[2px] text-[13px] font-bold text-[#9E0812]`}
    >
      CONFLICTO
    </div>
  </div>
{/if}
