<script lang="ts">
  import Logo from '$lib/components/Icons/Logo.svelte';
  import ChileanCase from '$lib/components/Landing/ChileanCase.svelte';
  import Features from '$lib/components/Landing/Features.svelte';
  import Hero from '$lib/components/Landing/Hero.svelte';
  import Pricing from '$lib/components/Landing/Pricing.svelte';
  import WeeklyLoad from '$lib/components/Landing/WeeklyLoad.svelte';
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
  <WeeklyLoad />
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

  <div class="hidden flex-row gap-4 lg:flex">
    {#if scrollTop > 360}
      <a
        href="/login"
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
