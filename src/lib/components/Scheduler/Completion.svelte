<script lang="ts">
  import { completion } from '$lib/state/Completion.svelte';
  import { formatCompletion } from '$lib/utils';

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
</script>

<div class="text-center text-[16px] text-[#6B7280]">
  {formatCompletion(completionLevel)}
</div>
