<script lang="ts">
  import timetable from '$lib/state/timetable.svelte';
  import '../app.css';
  let { children } = $props();

  const saveFile = async () => {
    // @ts-expect-error: Using a new web api for saving file
    const newHandle = await window.showSaveFilePicker({ suggestedName: 'lectures.json' });
    const writableStream = await newHandle.createWritable();
    const exportedLectures = timetable.exportLectures();
    await writableStream.write(JSON.stringify(exportedLectures));
    await writableStream.close();
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
</div>
{@render children()}
