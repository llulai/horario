<script lang="ts">
  import Current from '$lib/components/Current.svelte';
  import ClassGroups from '$lib/components/ClassGroups.svelte';
  import Teachers from '$lib/components/Teachers.svelte';
</script>

<div class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-[1fr_418px_600px] grid-rows-1">
  <Teachers />
  <ClassGroups />
  <Current />
</div>
