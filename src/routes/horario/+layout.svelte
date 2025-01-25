<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  let { children, data } = $props();

  let loading = $state(false);

  const handleSignOut: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      update();
    };
  };
</script>

<div class="flex h-20 flex-row items-center justify-between border-b border-gray-200 px-6">
  <div class="text-[24px]">Super Horario</div>
  <div class="flex flex-row items-center gap-4">
    <pre>{data.session?.user.email}</pre>
    <a href="/account">Cuenta</a>
    <form method="post" action="account?/signout" use:enhance={handleSignOut}>
      <button class="w-fit bg-red-500 px-3 py-2 text-white" disabled={loading}>Salir</button>
    </form>
  </div>
</div>
{@render children()}
