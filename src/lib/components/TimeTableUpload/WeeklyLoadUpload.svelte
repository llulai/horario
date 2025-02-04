<script lang="ts">
  let {
    timetableName = $bindable(),
    timetablePeriods = $bindable(),
    loadWorkload,
    handleFileChange
  } = $props();
  let fileInput: HTMLInputElement;
</script>

<div class="absolute inset-x-0 bottom-0 top-10 flex flex-col items-center">
  <div class="flex flex-col items-end gap-12 p-10">
    <div class="flex flex-col gap-6">
      <!-- name -->
      <div class="flex flex-col gap-2">
        <label for="timetable-name" class="text-[12px] text-[#6B7280]">Nombre del horario</label>
        <input
          class="w-[300px] rounded-[2px] border-[#6B7280] px-3 py-1 text-[12px] font-medium placeholder:text-[#6B7280]/50"
          id="timetable-name"
          bind:value={timetableName}
          placeholder="Horario mañana JPL"
        />
      </div>

      <!-- file -->
      <div class="flex flex-col gap-2">
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

      <!-- periods -->
      <div class="flex flex-col gap-2">
        <label for="timetable-periods" class="text-[12px] text-[#6B7280]">Número de períodos</label>
        <input
          class="w-16 rounded-[2px] border-[#6B7280] px-3 py-1 text-[12px] font-medium placeholder:text-[#6B7280]/50"
          id="timetable-periods"
          bind:value={timetablePeriods}
          type="number"
          min="1"
          max="10"
          step="1"
        />
      </div>
    </div>

    <!-- FIXME: disable button until file is uploaded -->
    <button
      type="button"
      class="w-fit rounded-[2px] bg-blue-500 px-3 py-1 text-[12px] font-medium text-white"
      onclick={loadWorkload}>Comenzar con el horario</button
    >
  </div>
</div>
