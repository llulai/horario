<script lang="ts">
  import ArrowRight from '$lib/components/Icons/ArrowRight.svelte';
  import CheckCircle from '$lib/components/Icons/CheckCircle.svelte';
</script>

<div class="flex flex-col gap-14 py-32">
  <div class="flex flex-col items-center gap-4">
    <h2 class="text-[24px] font-bold text-[#1D1F1E] md:text-[40px] lg:text-[56px]">
      Tarifas y planes
    </h2>
    <p class="text-[14px] font-normal leading-[140%] text-[#737573] md:text-[16px]">
      ¡Elige el plan que se ajuste a tus necesidades!
    </p>
  </div>

  <div class="grid grid-cols-1 grid-rows-2 items-center gap-8 p-4 md:grid-cols-2 md:grid-rows-1">
    <div
      class="mx-auto flex h-full w-fit flex-col items-start gap-8 rounded-[12px] border border-[#E1E6E4] p-12 lg:ml-auto lg:mr-0 xl:p-16"
    >
      <div
        class="flex size-10 flex-row items-center justify-center rounded-[8px] bg-[#DDC7FF] text-[16px] font-bold text-[#1D1F1E]"
      >
        1
      </div>
      <div
        class="max-w-[380px] text-[32px] font-bold leading-[110%] text-[#1D1F1E] lg:text-[40px] xl:w-[400px] xl:text-[48px]"
      >
        Haz tu propio horario
      </div>
      <div class="flex max-w-[400px] flex-col gap-6 text-[14px] md:text-[16px]">
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
            <b>Límite:</b> Permite configurar un horario con hasta 25 cursos.
          </div>
        </div>
      </div>
      <div class="mt-3 text-[24px] font-bold text-[#1D1F1E] lg:text-[40px]">Gratis</div>
    </div>

    <div
      class="mx-auto flex h-full w-fit flex-col items-start gap-8 rounded-[12px] border border-[#E1E6E4] p-12 lg:ml-0 lg:mr-auto xl:p-16"
    >
      <div
        class="flex size-10 flex-row items-center justify-center rounded-[8px] bg-[#A1F7A2] text-[16px] font-bold text-[#1D1F1E]"
      >
        2
      </div>
      <div
        class="max-w-[380px] text-[32px] font-bold leading-[110%] text-[#1D1F1E] lg:text-[40px] xl:text-[48px]"
      >
        Hacemos tu horario
      </div>
      <div class="flex max-w-[400px] flex-col gap-6 text-[14px] md:text-[16px]">
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
      <div class="mt-auto text-[24px] font-bold text-[#1D1F1E] lg:text-[40px]">100.000 CLP</div>
    </div>
  </div>

  <div class="mx-auto mt-3 flex flex-col items-center gap-5 p-4">
    <h2 class="text-center text-[24px] font-bold leading-[110%] text-[#1D1F1E] md:text-[40px]">
      ¿Cómo empezar?
    </h2>
    <div class="hidden lg:contents">
      <h3
        class="max-w-[450px] text-center text-[14px] font-normal leading-[140%] text-[#737573] md:text-[16px]"
      >
        Prueba sin compromiso: Accede a nuestra plataforma de test sin necesidad de crear cuenta.
      </h3>
      <a href="/test" class="btn-primary btn-medium">
        <p>Ir a la plataforma de test</p>
        <ArrowRight h={24} w={24} />
      </a>
    </div>
    <h3
      class="max-w-[450px] text-center text-[14px] font-normal leading-[140%] text-[#737573] md:text-[16px] lg:hidden"
    >
      Prueba sin compromiso: Accede a nuestra plataforma de desde tu computador y hazte una cuenta
      gratis.
    </h3>
  </div>
</div>
