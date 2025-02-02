<script lang="ts">
  import { tags } from '$lib/state/Tags.svelte';
  import Completion from './Completion.svelte';
  import CompletionBar from './CompletionBar.svelte';
  const { kind, name }: { kind: 'teacher' | 'grade'; name: string } = $props();

  const currentTags = $derived.by(() => {
    if (kind === 'teacher') {
      return tags.byTeacher[name];
    }
    return tags.byGrade[name];
  });
</script>

<div class="flex flex-row items-center gap-3">
  <!-- tags -->
  {#if currentTags.has('completed')}
    <div class={`flex flex-row items-center justify-center`}>
      <div
        class={`flex flex-row items-center justify-center rounded-full bg-[#B9F8CF] px-2 py-1 text-[13px] font-medium text-[#016730]`}
      >
        Completado
      </div>
    </div>
  {:else if currentTags.has('priority')}
    <div class={`flex flex-row items-center justify-center`}>
      <div
        class={`flex flex-row items-center justify-center rounded-full bg-[#DDD6FF] px-2 py-1 text-[13px] font-medium text-[#5D0EC1]`}
      >
        Prioridad
      </div>
    </div>
  {:else if currentTags.has('low-availability')}
    <div class={`flex flex-row items-center justify-center`}>
      <div
        class={`flex flex-row items-center justify-center rounded-full bg-[#FEE685] px-2 py-1 text-[13px] font-medium text-[#E17100]`}
      >
        Baja disponibilidad
      </div>
    </div>
  {:else if currentTags.has('conflict')}
    <div class={`flex flex-row items-center justify-center`}>
      <div
        class={`flex flex-row items-center justify-center rounded-full bg-[#FFCACA] px-2 py-1 text-[13px] font-medium text-[#9E0812]`}
      >
        Conflicto
      </div>
    </div>
  {/if}

  <!-- completion bar -->
  <div class="w-[200px]">
    <CompletionBar {kind} {name} />
  </div>

  <Completion {kind} {name} />
</div>
