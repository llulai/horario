<script lang="ts">
  let props = $props();
  let isHover = $state(false);
  let bg = $derived(isHover ? 'bg-green-100' : 'bg-gray-100');

  const handleDragEnter = (ev) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
    isHover = true;
  };

  const handleDragOver = (ev) => {
    ev.preventDefault();
  };

  const handleDragLeave = (ev) => {
    isHover = false;
  };

  const handleOnDrop = (event) => {
    const lectureId = event.dataTransfer.getData('text/plain');
    props.setTimeslotForLecture(lectureId, { day: props.day, period: props.period });
  };
</script>

<div
  class={`rounded-[2px] ${bg}`}
  ondragenter={handleDragEnter}
  ondragover={handleDragOver}
  ondragleave={handleDragLeave}
  ondrop={handleOnDrop}
></div>
