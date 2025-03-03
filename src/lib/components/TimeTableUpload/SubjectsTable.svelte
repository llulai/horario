<script lang="ts">
  import { weeklyLoad } from '$lib/state/WeeklyLoad.svelte';
</script>

<div class="flex w-[640px] flex-col gap-8">
  <div
    class="flex flex-row items-center justify-stretch pr-4 text-[20px] font-bold leading-[130%] text-[#1D1F1E]"
  >
    <div class="flex-grow">Asignatura</div>
    <div class="w-[200px]">Código</div>
  </div>
  <div class="flex flex-col gap-4">
    {#each weeklyLoad.subjects as subject}
      <div
        class="flex flex-row items-center justify-stretch rounded-[12px] border border-[#DCE0DD] py-4 pl-5 pr-4"
      >
        <div class="flex-grow text-[16px] font-bold leading-[130%] text-[#616663]">
          {subject.name}
        </div>
        <div>
          <input
            class="w-[200px]"
            type="text"
            required={true}
            minlength="3"
            maxlength="3"
            onchange={(event) => {
              const target = event.target as HTMLInputElement;
              weeklyLoad.dispatch({
                event: 'setSubjectCode',
                payload: { name: subject.name, code: target.value }
              });
            }}
          />
        </div>
      </div>
    {/each}
  </div>
</div>
