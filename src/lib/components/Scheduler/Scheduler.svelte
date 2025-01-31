<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { tags } from '$lib/state/Tags.svelte';
  import Completion from '../Summary/Completion.svelte';
  import CompletionBar from '../Summary/CompletionBar.svelte';
  import Toggle from '../Toggle.svelte';
  import AvailableLessons from './AvailableLessons.svelte';
  import SchedulerCalendar from './SchedulerCalendar.svelte';
</script>

<div class="grid grid-rows-[min-content_1fr]">
  {#if currently.selected}
    <div class="flex flex-col items-center gap-10 pb-10">
      <div class="flex w-full flex-col items-center gap-6">
        <div
          class="flew-row flex h-[60px] w-full items-center justify-between bg-[#F9FAFB] px-[61px]"
        >
          <h2 class="text-[24px] font-light text-[#6B7280]">{currently.selected.name}</h2>
          <div class="flex flex-row items-center gap-3">
            <!-- tag -->
            {#if (currently.selected.kind === 'teacher' && tags.byTeacher[currently.selected.name].includes('completed')) || (currently.selected.kind === 'grade' && tags.byGrade[currently.selected.name].includes('completed'))}
              <div class={`flex flex-row items-center justify-center`}>
                <div
                  class={`flex flex-row items-center justify-center rounded-full bg-[#B9F8CF] text-[8px] text-[#016730]`}
                >
                  C
                </div>
              </div>
            {:else if currently.selected.kind === 'teacher' && tags.byTeacher[currently.selected.name].includes('priority')}
              <div class={`flex flex-row items-center justify-center`}>
                <div
                  class={`flex flex-row items-center justify-center rounded-full bg-[#DDD6FF] px-2 py-1 text-[13px] font-medium text-[#5D0EC1]`}
                >
                  Prioridad
                </div>
              </div>
            {/if}

            <!-- completion bar -->
            {#if currently.selected.kind !== 'category'}
              <div class="w-[200px]">
                <CompletionBar
                  kind={currently.selected.kind}
                  name={currently.selected.name}
                  small={false}
                />
              </div>

              <Completion
                kind={currently.selected.kind}
                name={currently.selected.name}
                small={false}
              />
            {/if}
          </div>
          <div class="flex flex-row gap-2 text-[14px] font-normal text-[#6B7280]">
            <Toggle
              onChange={() => {
                currently.setBlocking(!currently.blocking);
              }}
            /> bloquear períodos
          </div>
        </div>
        <SchedulerCalendar />
      </div>
    </div>

    <AvailableLessons />
  {/if}
</div>
