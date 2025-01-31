<script lang="ts">
  import { tags } from '$lib/state/Tags.svelte';

  const { kind, name, small }: { kind: 'teacher' | 'grade'; name: string; small: boolean } =
    $props();
  const w = $derived(small ? 'w-6' : 'w-9');
</script>

{#if (kind === 'teacher' && tags.byTeacher[name].includes('completed')) || (kind === 'grade' && tags.byGrade[name].includes('completed'))}
  <div class={`${w} flex flex-row items-center justify-center`}>
    <div
      class={`${small ? 'size-3' : 'size-4'} flex flex-row items-center justify-center rounded-full bg-[#B9F8CF] text-[8px] text-[#016730]`}
    >
      C
    </div>
  </div>
{:else if kind === 'teacher' && tags.byTeacher[name].includes('priority')}
  <div class={`${w} flex flex-row items-center justify-center`}>
    <div
      class={`${small ? 'size-3' : 'size-4'} flex flex-row items-center justify-center rounded-full bg-[#DDD6FF] text-[8px] text-[#5D0EC1]`}
    >
      P
    </div>
  </div>
{/if}
