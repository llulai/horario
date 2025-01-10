<script lang="ts">
  import Current from '$lib/components/Current.svelte';
  import Grades from '$lib/components/Grades.svelte';
  import Teachers from '$lib/components/Teachers.svelte';
  import { onMount } from 'svelte';

  type Lesson = {
    id: number;
    teacher: string;
    course: string;
    subject: string;
  };

  let lessons = $state<Lesson[]>([]);

  onMount(async () => {
    const data = await fetch('/api/lessons').then((response) => response.json());
    lessons = data;
  });
</script>

<div class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-3 grid-rows-1">
  <Teachers {lessons} />
  <Grades {lessons} />
  <Current />
</div>
