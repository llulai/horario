<script>
  import AcademicCap from '$lib/components/Icons/AcademicCap.svelte';
  import ArrowDownTray from '$lib/components/Icons/ArrowDownTray.svelte';
  import ArrowRight from '$lib/components/Icons/ArrowRight.svelte';
  import Calendar from '$lib/components/Icons/Calendar.svelte';
  import CheckCircle from '$lib/components/Icons/CheckCircle.svelte';
  import ListBullet from '$lib/components/Icons/ListBullet.svelte';
  import Logo from '$lib/components/Icons/Logo.svelte';
  import User from '$lib/components/Icons/User.svelte';
  import { fly } from 'svelte/transition';

  let scrollTop = $state(0);

  // @ts-expect-error: type event
  const handleScroll = (event) => {
    scrollTop = event.target.scrollTop;
  };
</script>

<div
  class="absolute inset-x-0 bottom-0 top-16 space-y-12 overflow-x-hidden pt-8"
  onscroll={handleScroll}
>
  <!-- hero -->

  <div
    class="mx-8 flex flex-col items-center gap-24 rounded-[32px] bg-[url(/img/background-hero.png)] bg-cover px-24 pt-24"
  >
    <div class="flex w-full flex-row items-start justify-center gap-32">
      <h1 class="w-[725px] text-[72px] font-bold leading-[110%] text-[#1D1F1E]">
        Haz el horario de tu colegio en tiempo récord
      </h1>
      <div class="flex w-[320px] flex-col items-start gap-6 pt-24">
        <p class="text-[16px] font-normal text-[#737573]">
          La hora del horario te ayuda a crear tu horario de clases como nunca antes.
        </p>
        <a
          href="https://tally.so/r/nGQgBQ"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary btn-medium !px-16">Regístrate</a
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
  <div class="flex flex-col items-center gap-14 bg-[#ECE0FF] py-32">
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
  <div class="flex flex-col gap-14 py-32">
    <div class="flex flex-col items-center gap-4">
      <h2 class="text-[56px] font-bold text-[#1D1F1E]">Tarifas y planes</h2>
      <p class="text-[16px] font-normal leading-[140%] text-[#737573]">
        ¡Elige el plan que se ajuste a tus necesidades!
      </p>
    </div>

    <div class="grid grid-cols-2 grid-rows-1 items-center gap-8">
      <div
        class="ml-auto flex h-full flex-col items-start gap-8 rounded-[12px] border border-[#E1E6E4] p-16"
      >
        <div
          class="flex size-10 flex-row items-center justify-center rounded-[8px] bg-[#DDC7FF] text-[16px] font-bold text-[#1D1F1E]"
        >
          1
        </div>
        <div class="w-[400px] text-[48px] font-bold leading-[110%] text-[#1D1F1E]">
          Haz tu propio horario
        </div>
        <div class="flex w-[400px] flex-col gap-6">
          <div class="itemst-start flex flex-row gap-2 text-[#BE94FF]">
            <div class="size-6">
              <CheckCircle h={24} w={24} />
            </div>
            <div class="text-[#737573]">
              <b>Control total:</b> Crea y personaliza tu horario de clases de forma autónoma.
            </div>
          </div>

          <div class="itemst-start flex flex-row gap-2 text-[#BE94FF]">
            <div class="size-6">
              <CheckCircle h={24} w={24} />
            </div>
            <div class="text-[#737573]">
              <b>Límite:</b> Permite configurar un horario con hasta 20 cursos.
            </div>
          </div>
        </div>
        <div class="mt-3 text-[40px] font-bold text-[#1D1F1E]">50.000 CLP</div>
      </div>

      <div
        class="mr-auto flex h-full flex-col items-start gap-8 rounded-[12px] border border-[#E1E6E4] p-16"
      >
        <div
          class="flex size-10 flex-row items-center justify-center rounded-[8px] bg-[#A1F7A2] text-[16px] font-bold text-[#1D1F1E]"
        >
          2
        </div>
        <div class="w-[400px] text-[48px] font-bold leading-[110%] text-[#1D1F1E]">
          Hacemos tu horario por ti
        </div>
        <div class="flex w-[400px] flex-col gap-6">
          <div class="flex flex-row items-start gap-2 text-[#4FD152]">
            <div class="size-6">
              <CheckCircle h={24} w={24} />
            </div>
            <div class="text-[#737573]">
              <b>Nosotros nos encargamos:</b> Solo necesitas enviarnos tu carga semanal y nosotros elaboramos
              el horario para ti.
            </div>
          </div>
        </div>
        <div class="mt-auto text-[40px] font-bold text-[#1D1F1E]">100.000 CLP</div>
      </div>
    </div>

    <div class="mx-auto mt-3 flex flex-col items-center gap-5">
      <h2 class="text-center text-[40px] font-bold leading-[110%] text-[#1D1F1E]">
        ¿Cómo empezar?
      </h2>
      <h3 class="w-[450px] text-center text-[16px] font-normal leading-[140%] text-[#737573]">
        Prueba sin compromiso: Accede a nuestra plataforma de test sin necesidad de crear cuenta.
      </h3>
      <a href="/test" class="btn-primary btn-medium">
        <p>Ir a la plataforma de test</p>
        <ArrowRight h={24} w={24} />
      </a>
    </div>
  </div>

  <!-- weekly load -->

  <div class="flex flex-col items-center gap-20 bg-[#FBFAF9] py-32">
    <!-- title -->
    <div class="flex flex-col items-center gap-4">
      <h2 class="text-center text-[56px] font-bold text-[#1D1F1E]">Cómo crear tu carga semanal</h2>
      <p class="text-[16px] font-normal text-[#737573]">
        Utiliza el archivo de ejemplo que te proporcionamos como base. Este archivo consta de cuatro
        columnas esenciales:
      </p>
      <a href="/downloads/carga horaria.xlsx" download class="btn-secondary btn-medium">
        <ArrowDownTray />
        <p>Descargar archivo de ejemplo</p>
      </a>
    </div>

    <!-- columns -->
    <div class="flex flex-row gap-14">
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

  <div class="flex flex-row gap-4">
    {#if scrollTop > 360}
      <a
        href="https://tally.so/r/nGQgBQ"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary btn-small"
        transition:fly={{ y: 20, duration: 200 }}>Regístrate</a
      >
    {/if}

    <a href="/test" class="btn-secondary btn-small">Plataforma de test</a>
  </div>
</div>
