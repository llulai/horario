<script lang="ts">
  import currently from '$lib/state/currently.svelte';

  let { onChange, id }: { onChange: (isSelected: boolean) => void; id: string } = $props();

  let selected = $derived(currently.blocking === id);
  const bg = $derived(selected ? 'bg-[#008744]' : 'bg-[#C8CCCB]');
</script>

<button
  aria-label="Toggle para bloquear períodos disponibles"
  class={`h-5 w-10 rounded-full p-[2px] ${bg} flex flex-row ${selected ? 'justify-end' : 'justify-start'}`}
  type="button"
  onclick={() => {
    onChange(selected);
  }}
>
  <div class="h-4 w-4 rounded-full bg-white"></div>
</button>
