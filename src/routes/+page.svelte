<script lang="ts">
  import Current from '$lib/components/Current.svelte';
  import Grades from '$lib/components/Grades.svelte';
  import Teachers from '$lib/components/Teachers.svelte';
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  type Lesson = {
    id: number;
    teacher: string;
    course: string;
    subject: string;
    hours: number;
  };

  type Timeslot = {
    day: 1 | 2 | 3 | 4 | 5;
    period: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };

  type Lecture = {
    id: string;
    teacher: string;
    course: string;
    subject: string;
    duration: number;
    timeslot?: Timeslot;
  };

  let lessons = $state<Lesson[]>([]);

  let lectures = $state<Record<string, Lecture>>({});

  const lecturesByTeacher = $derived.by<Record<string, Lecture[]>>(() => {
    return Object.values(lectures).reduce(
      (lecByTeach: Record<string, Lecture[]>, lecture: Lecture) => {
        if (!(lecture.teacher in lecByTeach)) {
          lecByTeach[lecture.teacher] = [];
        }
        lecByTeach[lecture.teacher].push(lecture);

        return lecByTeach;
      },
      {}
    );
  });

  const lecturesByCourse = $derived.by<Record<string, Lecture[]>>(() => {
    return Object.values(lectures).reduce(
      (lecByCourse: Record<string, Lecture[]>, lecture: Lecture) => {
        if (!(lecture.course in lecByCourse)) {
          lecByCourse[lecture.course] = [];
        }
        lecByCourse[lecture.course].push(lecture);

        return lecByCourse;
      },
      {}
    );
  });

  type CurrentlySelected = {
    kind: 'teacher' | 'class';
    name: string;
  };

  let currentlySelected = $state<CurrentlySelected | null>(null);

  const selectTeacher = (name: string) => {
    currentlySelected = { kind: 'teacher', name };
  };

  const selectClass = (name: string) => {
    currentlySelected = { kind: 'class', name };
  };

  onMount(async () => {
    const data = await fetch('/api/lessons').then((response) => response.json());
    lessons = data;

    lectures = lessons.reduce((lec: Record<string, Lecture>, lesson) => {
      // const twoBlocksLessons = Math.floor(lesson.hours / 2);
      // const oneBlockLessons = lesson.hours % 2;
      //
      // for (let i = 0; i < twoBlocksLessons; i++) {
      //   lec.push({
      //     teacher: lesson.teacher,
      //     course: lesson.course,
      //     subject: lesson.subject,
      //     duration: 2
      //   });
      // }
      //
      for (let i = 0; i < lesson.hours; i++) {
        const uuid = uuidv4();
        lec[uuid] = {
          id: uuid,
          teacher: lesson.teacher,
          course: lesson.course,
          subject: lesson.subject,
          duration: 1
        };
      }

      return lec;
    }, {});
  });

  const setTimeslotForLecture = (lectureId: string, timeslot: Timeslot) => {
    lectures[lectureId] = {
      ...lectures[lectureId],
      timeslot
    };
  };
</script>

<div class="absolute bottom-0 left-0 right-0 top-20 grid grid-cols-[1fr_440px_1fr] grid-rows-1">
  <Teachers {lectures} {selectTeacher} {lecturesByTeacher} />
  <Grades {lectures} {selectClass} {lecturesByCourse} />
  <Current {currentlySelected} {lecturesByCourse} {lecturesByTeacher} {setTimeslotForLecture} />
</div>
