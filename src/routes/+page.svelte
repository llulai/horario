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

  type Day = 1 | 2 | 3 | 4 | 5;
  type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7;

  type Timeslot = {
    day: Day;
    period: Period;
  };

  type Lecture = {
    id: string;
    teacher: string;
    course: string;
    subject: string;
    duration: number;
    timeslot?: Timeslot;
  };

  type Schedule = Record<Day, Record<Period, Lecture | null>>;

  type TeacherSchedule = {
    unassigned: Lecture[];
    assigned: Schedule;
  };

  type ClassSchedule = {
    unassigned: Lecture[];
    assigned: Schedule;
  };

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
        if (!(lecture.course in lecByCourse)) {
          lecByCourse[lecture.course] = { assigned: getEmptySchedule(), unassigned: [] };
        }

        if (lecture.timeslot !== undefined) {
          lecByCourse[lecture.course].assigned[lecture.timeslot.day][lecture.timeslot.period] =
            lecture;
        } else {
          lecByCourse[lecture.course].unassigned.push(lecture);
        }

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
