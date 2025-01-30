<script lang="ts">
  const { children } = $props();
</script>

<div class="grid w-full grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-y-6 bg-[#E2E8F1] p-10">
  {@render children()}
</div>
