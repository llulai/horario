<script lang="ts">
  import { enhance } from '$app/forms';
  import type { ActionData, SubmitFunction } from './$types.js';

  export let form: ActionData;

  let loading = false;

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      update();
      loading = false;
    };
  };
</script>

<form class="flex flex-col items-center gap-6 p-10" method="POST" use:enhance={handleSubmit}>
  <h1 class="text-[20px]">Super Horario</h1>
  <p class="description">Ingresa tu email para entrar en la plataforma</p>
  {#if form?.message !== undefined}
    <div class={form?.success ? 'text-green-700' : 'text-red-700'}>
      {form?.message}
    </div>
  {/if}
  <div>
    <label for="email">Email:</label>
    <input
      id="email"
      name="email"
      type="email"
      placeholder="juanito@gmail.com"
      value={form?.email ?? ''}
    />
  </div>
  {#if form?.errors?.email}
    <span class="text-sm text-red-700">
      {form?.errors?.email}
    </span>
  {/if}
  <button class="bg-blue-500 px-3 py-3 text-white">
    {loading ? 'Cargando...' : 'Recibir link para entrar'}
  </button>
</form>
