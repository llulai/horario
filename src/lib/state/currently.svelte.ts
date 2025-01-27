import type { BlockedTimeslot, Lesson } from '$lib/state/Timetable.svelte';

export type Selected = {
  kind: 'teacher' | 'classGroup';
  name: string;
};

export type Dragging =
  | {
      kind: 'teacher' | 'classGroup';
      lecture: Lesson;
    }
  | {
      kind: 'blockedPeriod';
      blockedPeriod: Omit<BlockedTimeslot, 'timeslot'>;
    };

let selected = $state<Selected | null>(null);
let dragging = $state<Dragging | null>(null);
let hovering = $state<Dragging | null>(null);

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

  selectTeacher(name: string) {
    selected = {
      kind: 'teacher',
      name
    };
  },

  selectClass(name: string) {
    selected = {
      kind: 'classGroup',
      name
    };
  },

  setDragging(currentlyDragging: Dragging | null) {
    dragging = currentlyDragging;
  },

  setHovering(currentlyDragging: Dragging | null) {
    hovering = currentlyDragging;
  }
};

export default currently;
