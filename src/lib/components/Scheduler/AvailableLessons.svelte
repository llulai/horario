<script lang="ts">
  import currently from '$lib/state/currently.svelte';
  import { lessons, type Lesson } from '$lib/state/Timetable.svelte';
  import DraggableLesson from './DraggableLesson.svelte';

  const { kind, name }: { kind: 'teacher' | 'grade'; name: string } = $props();

  const availableLessons: Record<string, Lesson[]> = $derived.by(() => {
    // if we are assinging lessons to a teacher
    if (kind === 'teacher') {
      // group them by grade name
      return lessons.byTeacher[name].reduce((acc: Record<string, Lesson[]>, lesson) => {
        if (!(lesson.subjectName in acc)) {
          acc[lesson.subjectName] = [];
        }

        acc[lesson.subjectName].push(lesson);
        return acc;
      }, {});
    }

    // if we are assinging lessons to a grade
    // group them by teacher name
    return lessons.byGrade[name].reduce((acc: Record<string, Lesson[]>, lesson) => {
      if (!(lesson.teacherName in acc)) {
        acc[lesson.teacherName] = [];
      }

      acc[lesson.teacherName].push(lesson);
      return acc;
    }, {});
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
          event: 'removeLessonTimeslot',
          payload: { lessonId }
        });
      }
    }
  };

  const attributeToShow = $derived(kind === 'teacher' ? 'gradeName' : 'subjectName');
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  ondrop={handleOnDrop}
  ondragenter={handleDragEnter}
  ondragleave={handleDragLeave}
  ondragover={handleDragOver}
  class="grid grid-cols-2 gap-y-6 overflow-scroll p-8"
>
  {#each Object.entries(availableLessons) as [name, lessons]}
    <div class="grid grid-cols-[max-content_1fr] gap-6">
      <p class="text-[14px] font-semibold text-[#1D1F1E]">{name}</p>
      <div class="flex h-min max-w-[328px] flex-row flex-wrap gap-2">
        {#each lessons as lesson}
          <DraggableLesson {lesson} {attributeToShow} />
        {/each}
      </div>
    </div>
  {/each}
</div>
