<script lang="ts">
  import { Tooltip } from 'bits-ui';

  const { content, trigger } = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root delayDuration={0}>
    <Tooltip.Trigger>
      {@render trigger()}
    </Tooltip.Trigger>
    <Tooltip.Content
      class="rounded-[8px] bg-[#1D1F1E] p-3 text-[12px] font-normal leading-[16px] text-white"
    >
      {@render content()}
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
