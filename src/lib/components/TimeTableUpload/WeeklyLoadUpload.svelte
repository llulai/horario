<script lang="ts">
  import ArrowUpTray from '../Icons/ArrowUpTray.svelte';
  import MagnifyingGlass from '../Icons/MagnifyingGlass.svelte';
  import Trash from '../Icons/Trash.svelte';

  let {
    timetableName = $bindable(),
    timetableFile = $bindable(),
    loadWorkload,
    handleFileChange
  } = $props();
  let fileInput: HTMLInputElement;
</script>

<div class="absolute inset-x-0 bottom-0 top-10 grid grid-cols-[555px_1fr] p-8">
  <div class="my-auto flex flex-col gap-16">
    <!-- title -->
    <div class="flex flex-col gap-2 text-[40px] font-bold leading-[120%] text-[#1D1F1E]">
      <h1>Comencemos.</h1>
      <h1>Inicia subiendo tu carga horaria semanal.</h1>
    </div>

    <!-- form -->
    <div class="flex flex-col gap-1">
      <label for="timetable-name" class="text-[16px] font-semibold leading-[130%] text-[#1D1F1E]"
        >Nombre del horario</label
      >
      <input
        type="text"
        id="timetable-name"
        bind:value={timetableName}
        placeholder="Horario 2025"
      />
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
            fileInput.click();
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
      disabled={!timetableFile || !timetableName}>Comenzar con el Horario</button
    >
  </div>
</div>

<!-- <div class="absolute inset-x-0 bottom-0 top-10 flex flex-col items-center">
  <div class="flex flex-col items-end gap-12 p-10">
    <div class="flex flex-col gap-6">
      <!-- name -->
<!-- <div class="flex flex-col gap-2">
        <label for="timetable-name" class="text-[12px] text-[#6B7280]">Nombre del horario</label>
        <input
          class="w-[300px] rounded-[2px] border-[#6B7280] px-3 py-1 text-[12px] font-medium placeholder:text-[#6B7280]/50"
          id="timetable-name"
          bind:value={timetableName}
          placeholder="Horario mañana JPL"
        />
      </div>

      <!-- file -->
<!-- <div class="flex flex-col gap-2">
        <label for="timetable-name" class="text-[12px] text-[#6B7280]">Carga horaria semanal</label>
        <button
          class="w-fit rounded-[2px] bg-[#E2E8F1] px-3 py-1 text-[12px] font-medium text-[#6B7280]"
          onclick={() => {
            fileInput.click();
          }}>Elegir archivo</button
        >
        <input
          bind:this={fileInput}
          id="timetable-name"
          class="hidden"
          type="file"
          onchange={handleFileChange}
        />
      </div>
    </div>

    <!-- FIXME: disable button until file is uploaded -->
<!-- <button
      type="button"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      onclick={loadWorkload}>Comenzar con el horario</button
    >
  </div>
</div> -->
