<script lang="ts">
  import ArrowUpTray from '$lib/components/Icons/ArrowUpTray.svelte';
  import MagnifyingGlass from '$lib/components/Icons/MagnifyingGlass.svelte';
  import Trash from '$lib/components/Icons/Trash.svelte';
  import ArrowDownTray from '$lib/components/Icons/ArrowDownTray.svelte';

  let { timetableFile = $bindable(), loadWorkload, handleFileChange } = $props();
  let fileInput = $state<HTMLInputElement>();
</script>

<div class="absolute inset-x-0 bottom-0 top-16 grid grid-cols-[555px_1fr] grid-rows-1 gap-32 p-8">
  <div class="flex flex-col gap-16 py-28">
    <!-- title -->
    <div class="flex flex-col gap-2 text-[40px] font-bold leading-[120%] text-[#1D1F1E]">
      <h1>Comencemos.</h1>
      <h1>Inicia subiendo tu carga horaria semanal.</h1>
    </div>

    <!-- form -->
    <div class="flex flex-col gap-6">
      <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
        Utiliza el archivo de ejemplo que te proporcionamos como base. Este archivo consta de cuatro
        columnas esenciales:
      </p>

      <a href="/downloads/carga horaria.xlsx" download class="btn-secondary btn-medium w-fit">
        <ArrowDownTray />
        <p>Descargar archivo de ejemplo</p>
      </a>
    </div>

    <!-- file upload -->
    <div
      class="flex h-[240px] flex-col items-center justify-center gap-6 rounded-[12px] border border-dashed border-[#A5A8A6] py-8 has-[button:hover]:bg-[#FAFFFC]"
    >
      {#if !timetableFile}
        <div class="flex flex-col items-center">
          <div
            class="flex size-8 flex-col items-center justify-center rounded-[2px] bg-[#008744] text-white"
          >
            <ArrowUpTray />
          </div>
          <label for="upload-file" class="mt-2">
            <p class="text-center text-[16px] font-semibold leading-[130%] text-[#1D1F1E]">
              Haz click para cargar o arrastra y suelta
            </p>
            <p class="mt-1 text-center text-[14px] font-normal leading-[130%] text-[#616663]">
              .xlsx, .csv, .ods o .csv
            </p>
          </label>
        </div>

        <button
          type="button"
          class="btn-secondary btn-medium"
          onclick={() => {
            fileInput?.click();
          }}
        >
          <MagnifyingGlass />
          <p>Buscar archivo</p>
        </button>
        <input
          bind:this={fileInput}
          id="upload-file"
          class="hidden"
          type="file"
          onchange={handleFileChange}
        />
      {:else}
        <div class="flex flex-col items-center">
          <label for="upload-file" class="mt-2">
            <p class="text-center text-[16px] font-semibold leading-[130%] text-[#1D1F1E]">
              Archivo cargado con éxito
            </p>
            <p class="mt-1 text-center text-[14px] font-normal leading-[130%] text-[#616663]">
              {timetableFile.name}
            </p>
          </label>
        </div>

        <button
          type="button"
          class="btn-secondary btn-medium"
          onclick={() => {
            timetableFile = null;
          }}
        >
          <Trash />
          <p>Borrar archivo</p>
        </button>
        <input
          bind:this={fileInput}
          id="upload-file"
          class="hidden"
          type="file"
          onchange={handleFileChange}
        />
      {/if}
    </div>

    <button
      type="button"
      class="btn-primary btn-medium w-fit !px-8"
      onclick={loadWorkload}
      disabled={!timetableFile}>Comenzar con el Horario</button
    >
  </div>
  <div class="h-full overflow-hidden rounded-[16px]">
    <img
      class="h-full w-full object-cover object-left-top"
      src="/img/screen-decoration.png"
      alt="decoration"
    />
  </div>
</div>
