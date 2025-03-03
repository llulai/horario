<script lang="ts">
  import { enhance } from '$app/forms';
  import NavBar from '$lib/components/Base/NavBar.svelte';
  import ArrowPath from '$lib/components/Icons/ArrowPath.svelte';
  import Envelope from '$lib/components/Icons/Envelope.svelte';
  import type { SubmitFunction } from './$types.js';

  let loading = $state(false);

  const { data, form } = $props();

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      update();
      loading = false;
    };
  };
</script>

<NavBar showTimetableButtons={false} user={data.user} />
<form
  method="POST"
  use:enhance={handleSubmit}
  class="absolute inset-x-0 bottom-0 top-16 grid grid-cols-[555px_1fr] grid-rows-1 justify-start gap-32 p-8 px-8"
>
  <div class="flex flex-col gap-16 py-28">
    <!-- title -->
    <div class="flex flex-col gap-2 text-[40px] font-bold leading-[120%] text-[#1D1F1E]">
      <h1>Bienvenido.</h1>
      <h1>Ingresa tu correo para iniciar sesión</h1>
    </div>

    <!-- form -->
    {#if !loading}
      {#if form?.success}
        <div
          class="flex w-fit flex-row items-center justify-center gap-2 rounded-[8px] bg-[#008744] px-8 py-4 text-[16px] font-semibold leading-[130%] text-white"
        >
          <Envelope />
          <p>Revisa tu correo</p>
        </div>
      {:else}
        <div class="flex flex-col gap-1">
          <label for="email" class="text-[16px] font-semibold leading-[130%] text-[#1D1F1E]"
            >Email</label
          >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="juanito@perez.cl"
            value={form?.email ?? ''}
          />
        </div>

        <button class="btn-primary btn-medium w-fit !px-8">
          {loading ? 'Cargando...' : 'Recibir link para entrar'}
        </button>
      {/if}
    {:else}
      <div
        class="flex w-fit flex-row items-center justify-center gap-2 rounded-[8px] bg-[#008744] px-8 py-4 text-[16px] font-semibold leading-[130%] text-white"
      >
        <div class="animate-spin">
          <ArrowPath />
        </div>
        <p>Cargando</p>
      </div>
    {/if}
  </div>
  <div class="h-full overflow-hidden rounded-[16px]">
    <img
      class="h-full w-full object-cover object-left-top"
      src="/img/screen-decoration.png"
      alt="decoration"
    />
  </div>
</form>
