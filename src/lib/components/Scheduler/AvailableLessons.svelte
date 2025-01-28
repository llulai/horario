<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { lessons, type Lesson } from '$lib/state/Timetable.svelte';
  import DraggableLesson from './DraggableLesson.svelte';

  const availableLessons: Record<string, Lesson[]> = $derived.by(() => {
    if (currently.selected) {
      const { name, kind } = currently.selected;

      if (kind === 'teacher') {
        return lessons.byTeacher[name].reduce((acc: Record<string, Lesson[]>, lesson) => {
          if (!(lesson.gradeName in acc)) {
            acc[lesson.gradeName] = [];
          }

          acc[lesson.gradeName].push(lesson);
          return acc;
        }, {});
      }

      if (kind === 'grade') {
        return lessons.byGrade[name].reduce((acc: Record<string, Lesson[]>, lesson) => {
          if (!(lesson.teacherName in acc)) {
            acc[lesson.teacherName] = [];
          }

          acc[lesson.teacherName].push(lesson);
          return acc;
        }, {});
      }
    }
    return {};
  });

  const handleDragEnter = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleDragLeave = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };

  const handleOnDrop = () => {
    if (currently.dragging) {
      if (currently.dragging && currently.dragging.timeslot) {
        const lessonId = currently.dragging.id;
        lessons.dispatch({
          event: 'removeLectureTimeslot',
          payload: { lessonId }
        });
      }
    }
  };
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  ondrop={handleOnDrop}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondragover={handleDragOver}
  class="grid grid-cols-2 gap-y-6 overflow-scroll bg-[#F4F4F5] p-8"
>
  {#each Object.entries(availableLessons) as [name, lessons]}
    <div class="grid grid-cols-[max-content_1fr] gap-6">
      <p class="text-[16px]">{name}</p>
      <div class="flex h-14 w-min flex-col flex-wrap gap-2">
        {#each lessons as lesson}
          <DraggableLesson {lesson} />
        {/each}
      </div>
    </div>
  {/each}
</div>
