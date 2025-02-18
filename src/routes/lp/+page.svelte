<script>
  import Logo from '$lib/components/Icons/Logo.svelte';
</script>

<div class="absolute inset-x-0 bottom-0 top-16 space-y-12 overflow-x-hidden pt-8">
  <!-- hero -->

  <div
    class="mx-8 flex flex-col items-center gap-24 rounded-[32px] bg-[url(/img/background-hero.png)] bg-cover px-24 pt-24"
  >
    <div class="flex w-full flex-row items-start justify-center gap-32">
      <h1 class="w-[725px] text-[72px] font-bold leading-[110%] text-[#1D1F1E]">
        Haz el horario de tu colegio en menos de una tarde
      </h1>
      <div class="flex w-[320px] flex-col items-start gap-6 pt-24">
        <p class="text-[16px] font-normal text-[#737573]">
          La hora del horario te ayuda a crear tu horario de clases en tiempo récord
        </p>
        <button class="rounded-[8px] bg-[#1D1F1E] px-16 py-4 text-[16px] text-white"
          >Registrate</button
        >
      </div>
    </div>
    <img src="/img/platform-preview.png" alt="preview de la plataforma" class="w-[1182px]" />
  </div>

  <!-- features -->

  <div class="mx-8 w-full">
    <div class="sticky top-0 flex flex-row items-center justify-center gap-[90px] py-16">
      <div class="flex w-[390px] flex-col gap-4">
        <h2 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">Interfaz Intuitiva</h2>
        <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
          Arrastra y suelta las clases para asignarlas fácilmente a profesores y cursos.
        </p>
      </div>
      <img src="/img/intuitive-interface.png" alt="interfaz intuitiva" class="w-[789px]" />
    </div>

    <div class="sticky top-0 flex flex-row items-center justify-center gap-[90px] py-16">
      <div class="flex w-[390px] flex-col gap-4 bg-white">
        <h2 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">Sin conflictos</h2>
        <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
          Visualiza de forma automática cuáles horarios están disponibles y cuáles no.
        </p>
      </div>
      <img src="/img/no-conflicts.png" alt="sin conflictos" class="w-[789px] translate-y-8" />
    </div>

    <div class="sticky top-0 flex flex-row items-center justify-center gap-[90px] py-16">
      <div class="flex w-[390px] flex-col gap-4 bg-white">
        <h2 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">Panel de progreso</h2>
        <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
          Te orientamos para que priorices la asignación de clases y completes tu horario
          rápidamente.
        </p>
      </div>
      <img src="/img/progress-panel.png" alt="panel de progreso" class="w-[789px] translate-y-16" />
    </div>
  </div>

  <!-- chilean case -->
  <div class="flex flex-col items-center gap-14 py-32">
    <div class="flex w-[646px] flex-col items-center gap-4">
      <h2 class="text-center text-[56px] font-bold leading-[120%] text-[#1D1F1E]">
        Adaptado a Colegios de Chile
      </h2>
      <p class="text-center text-[16px] font-normal text-[#737573]">
        Con La hora del horario podrás:
      </p>
    </div>

    <div class="flex w-full flex-row items-start gap-8 overflow-x-scroll px-8">
      <div
        class="h-[728px] w-[555px] flex-shrink-0 rounded-[12px] bg-[url(/img/sequential-courses-background.png)] bg-contain pl-16 pt-16"
      >
        <div class="flex w-[380px] flex-col gap-4">
          <h3 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">
            Asignar cursos consecutivos
          </h3>
          <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
            Programa el mismo curso en dos horas lectivas seguidas sin complicaciones.
          </p>
        </div>
      </div>

      <div
        class="h-[728px] w-[555px] flex-shrink-0 rounded-[12px] bg-[url(/img/manage-electives-background.png)] bg-contain pl-16 pt-16"
      >
        <div class="flex w-[380px] flex-col gap-4">
          <h3 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">Gestionar electivos</h3>
          <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
            Coordina electivos para diferentes cursos en el mismo horario.
          </p>
        </div>
      </div>

      <div
        class="h-[728px] w-[555px] flex-shrink-0 rounded-[12px] bg-[url(/img/multiple-periods-background.png)] bg-contain pl-16 pt-16"
      >
        <div class="flex w-[432px] flex-col gap-4">
          <h3 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">
            Manejar múltiples jornadas
          </h3>
          <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
            Configura horarios para diversas jornadas de forma sencilla.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- pricing -->
  <div class="flex flex-col gap-14 bg-[#ECE0FF] pb-60 pt-32">
    <div class="flex flex-col items-center gap-4">
      <h2 class="text-[56px] font-bold text-[#1D1F1E]">Tarifas y planes</h2>
      <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
        ¡Elige el plan que se ajuste a tus necesidades!
      </p>
    </div>

    <div class="mx-auto flex flex-row items-center gap-8">
      <div class="flex h-[580px] w-[672px] flex-col gap-10 rounded-[12px] bg-white pl-16 pt-16">
        <div class="flex flex-col gap-4">
          <h3 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">Plan $50.000</h3>
          <h4 class="text-[32px] font-bold leading-[110%] text-[#1D1F1E]">Haz tu propio horario</h4>
        </div>

        <div class="flex w-[380px] flex-col gap-4">
          <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
            <b>Control total:</b> Crea y personaliza tu horario de clases de forma autónoma.
          </p>
          <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
            <b>Límite:</b> Permite configurar un horario con hasta 10 cursos.
          </p>
        </div>
      </div>

      <div class="flex h-[580px] w-[672px] flex-col gap-10 rounded-[12px] bg-white pl-16 pt-16">
        <div class="flex flex-col gap-4">
          <h3 class="text-[48px] font-bold leading-[110%] text-[#1D1F1E]">Plan $100.000</h3>
          <h4 class="text-[32px] font-bold leading-[110%] text-[#1D1F1E]">Horario personalizado</h4>
        </div>

        <div class="flex w-[480px] flex-col gap-4">
          <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
            <b>Nosotros nos encargamos:</b> Solo necesitas enviarnos tu carga semanal y nosotros elaboramos
            el horario para ti.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- nav bar -->
<div
  class="fixed inset-x-0 top-0 flex h-16 flex-row items-center justify-between border-b border-[#E1E6E4] bg-white px-8"
>
  <div class="flex flex-row gap-[10px]">
    <Logo h={30} w={31} />
    <h1 class="flex items-center justify-center text-[18px] font-bold text-[#1D1F1E]">
      La Hora del Horario
    </h1>
  </div>

  <button
    class="rounded-[8px] border border-[#1D1F1E] px-8 py-2 text-[14px] font-semibold text-[#1D1F1E]"
    >Login</button
  >
</div>
