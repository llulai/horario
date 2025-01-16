<script lang="ts">
  const { duration }: { duration: 1 | 2 } = $props();
  const height = $derived(duration === 1 ? 'h-3' : 'h-6');
</script>

<div class={`${height} w-6 bg-white`}></div>
