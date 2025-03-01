<script lang="ts">
  import AcademicCap from '$lib/components/Icons/AcademicCap.svelte';
  import ArrowDownTray from '$lib/components/Icons/ArrowDownTray.svelte';
  import Calendar from '$lib/components/Icons/Calendar.svelte';
  import ListBullet from '$lib/components/Icons/ListBullet.svelte';
  import User from '$lib/components/Icons/User.svelte';
</script>

<div class="hidden flex-col items-center gap-20 bg-[#FBFAF9] py-32 lg:flex">
  <!-- title -->
  <div class="flex w-[680px] flex-col items-center gap-4 text-center">
    <h2 class="text-center text-[56px] font-bold leading-[120%] text-[#1D1F1E]">
      Cómo crear tu carga semanal
    </h2>
    <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
      Utiliza el archivo de ejemplo que te proporcionamos como base. Este archivo consta de cuatro
      columnas esenciales:
    </p>
    <a href="/downloads/carga horaria.xlsx" download class="btn-secondary btn-medium">
      <ArrowDownTray />
      <p>Descargar archivo de ejemplo</p>
    </a>
  </div>

  <!-- columns -->
  <div class="flex flex-col gap-14 2xl:flex-row">
    <div class="flex flex-row gap-14 2xl:contents">
      <!-- teacher -->
      <div class="flex flex-col items-center gap-10 rounded-xl border border-[#E1E6E4] p-10">
        <div
          class="flex size-14 flex-row items-center justify-center rounded-lg bg-[#E0F7FF] text-[#1D1F1E]"
        >
          <User />
        </div>

        <div class="flex w-[240px] flex-col items-center gap-4">
          <p class="text-center text-[32px] font-bold leading-[110%] text-[#1D1F1E]">Profesor</p>
          <p class="text-center text-[16px] font-normal leading-[140%] text-[#737573]">
            Nombre del docente encargado
          </p>
        </div>
      </div>

      <!-- grade -->
      <div class="flex flex-col items-center gap-10 rounded-xl border border-[#E1E6E4] p-10">
        <div
          class="flex size-14 flex-row items-center justify-center rounded-lg bg-[#FFE0E0] text-[#1D1F1E]"
        >
          <AcademicCap />
        </div>

        <div class="flex w-[240px] flex-col items-center gap-4">
          <p class="text-center text-[32px] font-bold leading-[110%] text-[#1D1F1E]">Curso</p>
          <p class="text-center text-[16px] font-normal leading-[140%] text-[#737573]">
            Curso o grado correspondiente
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-row gap-14 2xl:contents">
      <!-- subject -->
      <div class="flex flex-col items-center gap-10 rounded-xl border border-[#E1E6E4] p-10">
        <div
          class="flex size-14 flex-row items-center justify-center rounded-lg bg-[#E0FFEB] text-[#1D1F1E]"
        >
          <ListBullet />
        </div>

        <div class="flex w-[240px] flex-col items-center gap-4">
          <p class="text-center text-[32px] font-bold leading-[110%] text-[#1D1F1E]">Asignatura</p>
          <p class="text-center text-[16px] font-normal leading-[140%] text-[#737573]">
            Materia que se impartirá
          </p>
        </div>
      </div>

      <!-- weekly hours -->
      <div class="flex flex-col items-center gap-10 rounded-xl border border-[#E1E6E4] p-10">
        <div
          class="flex size-14 flex-row items-center justify-center rounded-lg bg-[#ECE0FF] text-[#1D1F1E]"
        >
          <Calendar />
        </div>

        <div class="flex w-[240px] flex-col items-center gap-4">
          <p class="text-center text-[32px] font-bold leading-[110%] text-[#1D1F1E]">
            Horas Semanales
          </p>
          <p class="text-center text-[16px] font-normal leading-[140%] text-[#737573]">
            Horas semanales por asignatura
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
