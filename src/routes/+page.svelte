<script lang="ts">
  import Current from '$lib/components/Current.svelte';
  import ClassGroups from '$lib/components/ClassGroups.svelte';
  import Teachers from '$lib/components/Teachers.svelte';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';
  import type {
    Lesson,
    Schedule,
    ClassSchedule,
    Lecture,
    TeacherSchedule,
    Timeslot,
    CurrentlySelected
  } from '$lib/Types';

  let lessons = $state<Lesson[]>([]);

  let lectures = $state<Record<string, Lecture>>({});

  const getEmptySchedule: () => Schedule = () => {
    return {
      1: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
      2: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
      3: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
      4: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null },
      5: { 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null }
    };
  };

  const lecturesByTeacher = $derived.by<Record<string, TeacherSchedule>>(() => {
    return Object.values(lectures).reduce(
      (lecByTeach: Record<string, TeacherSchedule>, lecture: Lecture) => {
        if (!(lecture.teacher in lecByTeach)) {
          lecByTeach[lecture.teacher] = { assigned: getEmptySchedule(), unassigned: [] };
        }

        if (lecture.timeslot !== undefined) {
          lecByTeach[lecture.teacher].assigned[lecture.timeslot.day][lecture.timeslot.period] =
            lecture;
        } else {
          lecByTeach[lecture.teacher].unassigned.push(lecture);
        }

        return lecByTeach;
      },
      {}
    );
  });

  const lecturesByCourse = $derived.by<Record<string, ClassSchedule>>(() => {
    return Object.values(lectures).reduce(
      (lecByCourse: Record<string, ClassSchedule>, lecture: Lecture) => {
        if (!(lecture.classGroup in lecByCourse)) {
          lecByCourse[lecture.classGroup] = { assigned: getEmptySchedule(), unassigned: [] };
        }

        if (lecture.timeslot !== undefined) {
          lecByCourse[lecture.classGroup].assigned[lecture.timeslot.day][lecture.timeslot.period] =
            lecture;
        } else {
          lecByCourse[lecture.classGroup].unassigned.push(lecture);
        }

        return lecByCourse;
      },
      {}
    );
  });

  let currentlySelected = $state<CurrentlySelected | null>(null);

  const selectTeacher = (name: string) => {
    currentlySelected = { kind: 'teacher', name };
  };

  const selectClass = (name: string) => {
    currentlySelected = { kind: 'classGroup', name };
  };

  onMount(async () => {
    const data = await fetch('/api/lessons').then((response) => response.json());
    lessons = data;

    lectures = lessons.reduce((lec: Record<string, Lecture>, lesson) => {
      for (let i = 0; i < lesson.hours; i++) {
        const uuid = uuidv4();
        lec[uuid] = {
          id: uuid,
          teacher: lesson.teacher,
          classGroup: lesson.classGroup,
          subject: lesson.subject,
          duration: 1
        };
      }

      return lec;
    }, {});
  });

  const setLectureTimeslot = (lectureId: string, timeslot: Timeslot) => {
    lectures[lectureId] = {
      ...lectures[lectureId],
      timeslot
    };
  };
</script>

<div class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-[1fr_440px_1fr] grid-rows-1">
  <Teachers {selectTeacher} {lecturesByTeacher} />
  <ClassGroups {selectClass} {lecturesByCourse} />
  <Current {currentlySelected} {lecturesByCourse} {lecturesByTeacher} {setLectureTimeslot} />
</div>
