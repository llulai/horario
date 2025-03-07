<script lang="ts">
  import classNames from 'classnames';

  const examples = [
    {
      title: 'Asignar cursos consecutivos',
      description: 'Programa el mismo curso en dos horas lectivas seguidas sin complicaciones.',
      bgURL: 'bg-[url(/img/sequential-courses-background.png)]'
    },
    {
      title: 'Gestionar electivos',
      description: 'Coordina electivos para diferentes cursos en el mismo horario.',
      bgURL: 'bg-[url(/img/manage-electives-background.png)]'
    },
    {
      title: 'Manejar múltiples jornadas',
      description: 'Configura horarios para diversas jornadas de forma sencilla.',
      bgURL: 'bg-[url(/img/multiple-periods-background.png)]'
    }
  ];
</script>

{#snippet exampleSnippet(title: string, description: string, bgURL: string)}
  <div
    class={classNames(
      'aspect-[0.7623] w-[300px] flex-shrink-0 rounded-[12px] bg-contain p-8 md:w-[440px] md:p-16 xl:w-[555px]',
      bgURL
    )}
  >
    <div class="flex flex-col gap-2 md:gap-4">
      <h3 class="text-[20px] font-bold leading-[110%] text-[#1D1F1E] md:text-[32px] xl:text-[48px]">
        {title}
      </h3>
      <p class="text-[14px] font-normal leading-[140%] text-[#737573] md:text-[16px]">
        {description}
      </p>
    </div>
  </div>
{/snippet}

<div class="flex flex-col items-center gap-8 bg-[#ECE0FF] py-10 md:gap-14 md:py-20 xl:py-32">
  <div class="flex flex-col items-center gap-4 p-4 md:w-[646px]">
    <h2 class="text-center text-[24px] font-bold leading-[120%] text-[#1D1F1E] md:text-[56px]">
      Adaptado a Colegios de Chile
    </h2>
    <p class="text-center text-[14px] font-normal leading-[140%] text-[#737573] md:text-[16px]">
      Con La hora del horario podrás:
    </p>
  </div>

  <div
    class="mx-auto flex w-full max-w-[1793px] flex-row items-start gap-4 overflow-x-scroll px-4 md:gap-8 md:px-8"
  >
    {#each examples as example}
      {@render exampleSnippet(example.title, example.description, example.bgURL)}
    {/each}
  </div>
</div>
