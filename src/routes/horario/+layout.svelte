<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import timetable from '$lib/state/timetable.svelte';
  let { children, data } = $props();

  const saveFile = async () => {
    // @ts-expect-error: Using a new web api for saving file
    const newHandle = await window.showSaveFilePicker({ suggestedName: 'lectures.json' });
    const writableStream = await newHandle.createWritable();
    const exportedLectures = timetable.exportLectures();
    await writableStream.write(JSON.stringify(exportedLectures));
    await writableStream.close();
  };

  let loading = $state(false);

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<div class="flex h-20 flex-row items-center justify-between border-b border-gray-200 px-6">
  <div class="text-[24px]">Super Horario</div>
  <div class="flex flex-row items-center gap-6 text-[14px]">
    <button onclick={saveFile}>Export</button>
    <div>Profesores</div>
    <div>Cursos</div>
    <div>Clases</div>
  </div>
  <pre>{data.session?.user.email}</pre>
  <form method="post" action="account?/signout" use:enhance={handleSignOut}>
    <div>
      <button class="w-fit bg-red-500 px-3 py-2 text-white" disabled={loading}>Salir</button>
    </div>
  </form>
</div>
{@render children()}
