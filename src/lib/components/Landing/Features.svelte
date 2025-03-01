<script lang="ts">
  import classNames from 'classnames';

  const features = [
    {
      title: 'Interfaz Intuitiva',
      description: 'Arrastra y suelta las clases para asignarlas fácilmente a profesores y cursos.',
      imageURL: '/img/intuitive-interface.png'
    },
    {
      title: 'Sin conflictos',
      description: 'Visualiza de forma automática cuáles horarios están disponibles y cuáles no.',
      imageURL: '/img/no-conflicts.png'
    },
    {
      title: 'Panel de progreso',
      description:
        'Te orientamos para que priorices la asignación de clases y completes tu horario rápidamente.',
      imageURL: '/img/progress-panel.png'
    }
  ];
</script>

{#snippet featureSnippet(title: string, description: string, imageURL: string, idx: number)}
  <div
    class="top-0 flex flex-col items-center justify-center py-16 md:sticky md:flex-row md:gap-10 xl:gap-[90px]"
  >
    <div class="flex flex-col gap-4 bg-white py-6 md:w-[320px] md:py-10">
      <h2 class="text-[24px] font-bold leading-[110%] text-[#1D1F1E] md:text-[32px] xl:text-[48px]">
        {title}
      </h2>
      <p class="text-[14px] font-normal leading-[140%] text-[#737573]">{description}</p>
    </div>
    <img
      src={imageURL}
      alt="interfaz intuitiva"
      class={classNames(
        'w-[400px] lg:w-[480px] xl:w-[789px]',
        { 'xl:translate-8 md:translate-y-3 lg:translate-y-5': idx === 1 },
        { 'xl:translate-16 md:translate-y-6 lg:translate-y-10': idx === 2 }
      )}
    />
  </div>
{/snippet}
<div class="mx-4 md:mx-6">
  {#each features as feature, idx}
    {@render featureSnippet(feature.title, feature.description, feature.imageURL, idx)}
  {/each}
</div>
