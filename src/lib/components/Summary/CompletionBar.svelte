<script lang="ts">
  import { completion } from '$lib/state/Completion.svelte';
  const { kind, name }: { kind: 'teacher' | 'grade'; name: string } = $props();

  const completionLevel: number = $derived.by(() => {
    if (kind === 'teacher') {
      return completion.byTeacher[name][0] / completion.byTeacher[name][1];
    }

    if (kind === 'grade') {
      return completion.byGrade[name][0] / completion.byGrade[name][1];
    }

    return 0;
  });

  let width = $state(0);

  const right = $derived((1 - completionLevel) * width);
</script>

<div
  class="relative flex h-1 flex-grow overflow-hidden rounded-full bg-[#D1F0DF]"
  bind:clientWidth={width}
>
  <div class="absolute inset-y-0 left-0 bg-[#008744]" style={`right: ${right}px;`}></div>
</div>
