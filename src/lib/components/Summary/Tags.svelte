<script lang="ts">
  import { tags } from '$lib/state/Tags.svelte';
  import ArrowUp from '../Icons/ArrowUp.svelte';
  import Check from '../Icons/Check.svelte';
  import XMark from '../Icons/XMark.svelte';

  const { kind, name, small }: { kind: 'teacher' | 'grade'; name: string; small: boolean } =
    $props();
  const w = $derived(small ? 'w-6' : 'w-9');

  $inspect(tags);
</script>

<!-- completed -->
{#if (kind === 'teacher' && tags.byTeacher[name].has('completed')) || (kind === 'grade' && tags.byGrade[name].has('completed'))}
  <div class={`${w} flex flex-row items-center justify-center`}>
    <div
      class={`${small ? 'size-3' : 'size-4'} flex flex-row items-center justify-center rounded-full bg-[#B9F8CF] text-[8px] text-[#016730]`}
    >
      <Check h={12} w={12} />
    </div>
  </div>

  <!-- priority -->
{:else if kind === 'teacher' && tags.byTeacher[name].has('priority')}
  <div class={`${w} flex flex-row items-center justify-center`}>
    <div
      class={`${small ? 'size-3' : 'size-4'} flex flex-row items-center justify-center rounded-full bg-[#DDD6FF] text-[8px] text-[#5D0EC1]`}
    >
      <ArrowUp h={12} w={12} />
    </div>
  </div>

  <!-- low-availability -->
{:else if (kind === 'teacher' && tags.byTeacher[name].has('low-availability')) || (kind === 'grade' && tags.byGrade[name].has('low-availability'))}
  <div class={`${w} flex flex-row items-center justify-center`}>
    <div
      class={`${small ? 'size-3' : 'size-4'} flex flex-row items-center justify-center rounded-full bg-[#FEE685] text-[8px] text-[#E17100]`}
    >
      !
    </div>
  </div>

  <!-- conflict -->
{:else if (kind === 'teacher' && tags.byTeacher[name].has('conflict')) || (kind === 'grade' && tags.byGrade[name].has('conflict'))}
  <div class={`${w} flex flex-row items-center justify-center`}>
    <div
      class={`${small ? 'size-3' : 'size-4'} flex flex-row items-center justify-center rounded-full bg-[#FFCACA] text-[8px] text-[#9E0812]`}
    >
      <XMark h={12} w={12} />
    </div>
  </div>
{/if}
