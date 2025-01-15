import type { BlockedPeriod, Lecture } from './timetable.svelte';

export type Selected = {
  kind: 'teacher' | 'classGroup';
  name: string;
};

export type Dragging =
  | {
      kind: 'teacher' | 'classGroup';
      lecture: Lecture;
    }
  | {
      kind: 'blockedPeriod';
      blockedPeriod: Omit<BlockedPeriod, 'timeslot'>;
    };

let selected = $state<Selected | null>(null);
let dragging = $state<Dragging | null>(null);

const currently = {
  get selected() {
    return selected;
  },
  get dragging() {
    return dragging;
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
  }
};

export default currently;
