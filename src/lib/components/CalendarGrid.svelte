<script lang="ts">
  import type { Snippet } from 'svelte';

  const { children, small }: { children: Snippet; small: boolean } = $props();

  const grid = $derived(
    small
      ? 'grid grid-cols-[repeat(auto-fit,minmax(164px,1fr))]'
      : 'grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))]'
  );
</script>

<div class={`${grid} w-full gap-8`}>
  {@render children()}
</div>
