<script lang="ts">
  let selected = $state(false);

  let { onChange }: { onChange: (isSelected: boolean) => void } = $props();

  const bg = $derived(selected ? 'bg-[#6B7280]' : 'bg-[#E5E7EB]');
</script>

<button
  class={`h-6 w-10 rounded-full p-1 ${bg} flex flex-row ${selected ? 'justify-end' : 'justify-start'}`}
  type="button"
  onclick={() => {
    selected = !selected;
    onChange(selected);
  }}
>
  <div class="h-4 w-4 rounded-full bg-white"></div>
</button>
