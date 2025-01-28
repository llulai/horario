import type { Lesson } from '$lib/state/Timetable.svelte';

export type Selected = {
  kind: 'teacher' | 'grade';
  name: string;
};

let selected = $state<Selected | null>(null);
let dragging = $state<Lesson | null>(null);
let hovering = $state<Lesson | null>(null);
let blocking = $state<boolean>(false);

const currently = {
  get selected() {
    return selected;
  },

  get dragging() {
    return dragging;
  },

  get hovering() {
    return hovering;
  },

  get blocking() {
    return blocking;
  },

  selectTeacher(name: string) {
    selected = {
      kind: 'teacher',
      name
    };
  },

  selectGrade(name: string) {
    selected = {
      kind: 'grade',
      name
    };
  },

  setDragging(currentlyDragging: Lesson | null) {
    dragging = currentlyDragging;
  },

  setHovering(currentlyDragging: Lesson | null) {
    hovering = currentlyDragging;
  },

  setBlocking(currentlyBlocking: boolean) {
    blocking = currentlyBlocking;
  }
};

export default currently;
