<script lang="ts">
  import { completion } from '$lib/state/Completion.svelte';
  import { formatCompletion } from '$lib/utils';

  const { kind, name, small }: { kind: 'teacher' | 'grade'; name: string; small: boolean } =
    $props();

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

<div class={`${small ? 'text-[10px]' : 'text-[12px]'} text-center text-[#6B7280]`}>
  {formatCompletion(completionLevel)}
</div>
