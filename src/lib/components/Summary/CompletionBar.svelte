<script lang="ts">
  import { completion } from '$lib/state/Completion.svelte';
  import { tags } from '$lib/state/Tags.svelte';

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

  const hasTags = $derived(
    kind === 'teacher' ? tags.byTeacher[name].length : tags.byGrade[name].length > 0
  );

  const right = $derived(
    (1 - completionLevel) *
      ((24 + 12 * (1 - Number(small))) * (4 - Number(hasTags)) + 4 * (3 - Number(hasTags)))
  );
</script>

<div class="relative flex h-[2px] flex-grow overflow-hidden rounded-full bg-[#E2E8F1]">
  <div class="absolute inset-y-0 left-0 bg-[#6B7280]" style={`right: ${right}px;`}></div>
</div>
