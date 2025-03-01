<script>
  import AcademicCap from '$lib/components/Icons/AcademicCap.svelte';
  import ArrowDownTray from '$lib/components/Icons/ArrowDownTray.svelte';
  import Calendar from '$lib/components/Icons/Calendar.svelte';
  import ListBullet from '$lib/components/Icons/ListBullet.svelte';
  import Logo from '$lib/components/Icons/Logo.svelte';
  import User from '$lib/components/Icons/User.svelte';
  import ChileanCase from '$lib/components/Landing/ChileanCase.svelte';
  import Features from '$lib/components/Landing/Features.svelte';
  import Hero from '$lib/components/Landing/Hero.svelte';
  import Pricing from '$lib/components/Landing/Pricing.svelte';
  import { fly } from 'svelte/transition';

  let { data } = $props();

  let scrollTop = $state(0);

  // @ts-expect-error: type event
  const handleScroll = (event) => {
    scrollTop = event.target.scrollTop;
  };

  const title = 'La hora del horario';
  const description =
    'Haz el horario de tu colegio en tiempo récord. Descubre cómo funciona la plataforma y pruébalo gratis.';
  const thumbnail = '/img/platform-preview.png';
  const pageUrl = 'https://www.lahoradelhorario.cl';
</script>

<svelte:head>
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={thumbnail} />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {#if thumbnail}
    <meta property="og:image" content={thumbnail} />
  {/if}
  <meta property="og:site_name" content="La hora del horario" />
  <meta property="og:type" content="website" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={pageUrl} />
  <meta name="thumbnail" content={thumbnail} />
</svelte:head>

<div
  class="absolute inset-x-0 bottom-0 top-16 space-y-12 overflow-x-hidden"
  onscroll={handleScroll}
>
  <Hero />
  <Features />
  <ChileanCase />
  <Pricing />

  <!-- weekly load -->

  <div class="flex flex-col items-center gap-20 bg-[#FBFAF9] py-32">
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
            <p class="text-center text-[32px] font-bold leading-[110%] text-[#1D1F1E]">
              Asignatura
            </p>
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
</div>

<!-- nav bar -->
<div
  class="fixed inset-x-0 top-0 flex h-16 flex-row items-center justify-between border-b border-[#E1E6E4] bg-white px-4 sm:px-8"
>
  <div class="flex flex-row gap-[10px]">
    <Logo h={30} w={31} />
    <h1 class="flex items-center justify-center text-[18px] font-bold text-[#1D1F1E]">
      La Hora del Horario
    </h1>
  </div>

  <div class="hidden flex-row gap-4 sm:flex">
    {#if scrollTop > 360}
      <a
        href="https://tally.so/r/nGQgBQ"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-primary btn-small"
        transition:fly={{ y: 20, duration: 200 }}>Regístrate</a
      >
    {/if}

    {#if data.user}
      <a href="/horario" data-sveltekit-reload class="btn-secondary btn-small">Plataforma</a>
    {:else}
      <a href="/test" class="btn-secondary btn-small">Plataforma de test</a>
    {/if}
  </div>
</div>
