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

  const right = $derived((1 - completionLevel) * 200);
</script>

<div class="relative flex h-1 flex-grow overflow-hidden rounded-full bg-[#E2E8F1]">
  <div class="absolute inset-y-0 left-0 bg-[#6B7280]" style={`right: ${right}px;`}></div>
</div>
