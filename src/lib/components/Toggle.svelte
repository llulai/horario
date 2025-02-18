<script lang="ts">
  let selected = $state(false);

  let { onChange }: { onChange: (isSelected: boolean) => void } = $props();

  const bg = $derived(selected ? 'bg-[#008744]' : 'bg-[#C8CCCB]');
</script>

<button
  aria-label="Toggle para bloquear períodos disponibles"
  class={`h-5 w-10 rounded-full p-[2px] ${bg} flex flex-row ${selected ? 'justify-end' : 'justify-start'}`}
  type="button"
  onclick={() => {
    selected = !selected;
    onChange(selected);
  }}
>
  <div class="h-4 w-4 rounded-full bg-white"></div>
</button>
