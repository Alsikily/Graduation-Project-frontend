import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store'

// Auth Routes
import RegisterView from '../views/Auth/register.vue'
import LoginView from '../views/Auth/login.vue'

// Student
import StudentsView from '@/views/Dashboard/students/students.vue'
import StudentHomeView from '@/views/Dashboard/students/home/home.vue' // Home
import StudentCommunityView from '@/views/Dashboard/students/community/community.vue' // Community
import StudentExamsView from '@/views/Dashboard/students/exams/exams.vue' // Exams
import StudentSubjectExamsView from '@/views/Dashboard/students/exams/pages/SubjectExams' // Exams
import StartExamView from '@/views/Dashboard/students/exams/pages/StartExam' // Exams
import StudentAbsenceView from '@/views/Dashboard/students/absence/absence.vue' // Absence
import StudentCoursesView from '@/views/Dashboard/students/courses/courses.vue' // Courses
import StudentSubjectCoursesView from '@/views/Dashboard/students/courses/pages/subjectCourses' // Courses
import StudentCourseView from '@/views/Dashboard/students/courses/pages/StudentCourse' // Courses
import studentVideoView from '@/views/Dashboard/students/courses/pages/studentVideo' // Courses
import StudentBooksView from '@/views/Dashboard/students/books/books.vue' // Books
import subjectBooks from '@/views/Dashboard/students/books/pages/subjectBooks.vue' // Books
import studentResultView from '@/views/Dashboard/students/results/studentResult.vue' // Books
import cartView from '@/views/Dashboard/students/cart/cart.vue' // Books
import StudentNoticesView from '@/views/Dashboard/students/notices/notices.vue' // Notices
import StudentProfileView from '@/views/Dashboard/students/profile/profile.vue' // Notices

// Teacher
import TeachersView from '@/views/Dashboard/teachers/teachers.vue'
import TeacherHomeView from '@/views/Dashboard/teachers/home/home.vue'
import TeacherExamView from '@/views/Dashboard/teachers/exams/exams.vue'
import TeacherShowExamView from '@/views/Dashboard/teachers/exams/pages/exam.vue'
import TeacherCourseView from '@/views/Dashboard/teachers/courses/courses.vue'
import TeacherShowCourseView from '@/views/Dashboard/teachers/courses/pages/course.vue'
import TeacherBooksView from '@/views/Dashboard/teachers/books/books.vue'
import TeacherAbsenceView from '@/views/Dashboard/teachers/absences/absences.vue'
import TeacherProfileView from '@/views/Dashboard/teachers/profile/profile.vue'

// School
import SchoolsView from '@/views/Dashboard/schools/schools.vue'
import SchoolHomeView from '@/views/Dashboard/schools/home/home.vue'
import SchoolSubjectsView from '@/views/Dashboard/schools/subjects/subjects.vue'
import SchoolClassesView from '@/views/Dashboard/schools/classes/classes.vue'
import SchoolTeachersView from '@/views/Dashboard/schools/teachers/teachers.vue'
import SchoolRoomsView from '@/views/Dashboard/schools/rooms/rooms.vue'
import SchoolEditRoomView from '@/views/Dashboard/schools/rooms/pages/add.vue'
import schoolScheduleView from '@/views/Dashboard/schools/schedule/schedule.vue'
import schoolEditScheduleView from '@/views/Dashboard/schools/schedule/pages/edit.vue'
import schoolAbsence from '@/views/Dashboard/schools/absence/absence.vue'
import schoolResult from '@/views/Dashboard/schools/results/results.vue'
import SchoolProfileView from '@/views/Dashboard/schools/profile/profile.vue'

// Parent
import ParentsView from '@/views/Dashboard/parents/parents.vue'
import ParentHomeView from '@/views/Dashboard/parents/home/home.vue'
import ParentChildrenView from '@/views/Dashboard/parents/children/children.vue'
import ParentExamsView from '@/views/Dashboard/parents/exams/exams.vue'
import parentResultView from '@/views/Dashboard/parents/results/parentResult.vue'
import parentAbsence from '@/views/Dashboard/parents/absence/absence.vue'
import ParentProfileView from '@/views/Dashboard/parents/profile/profile.vue'

import SSV from '@/views/ssv.vue'

const routes = [
  {
    path: '/',
    component: SSV
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      guest: true
    }
  },
  { // Student
    path: '/students',
    name: 'students',
    component: StudentsView,
    meta: {
      studentAuthed: true
    },
    children: [
      {
        path: "home",
        name: "home",
        component: StudentHomeView
      },
      {
        path: "community",
        name: "community",
        component: StudentCommunityView
      },
      {
        path: "exams",
        children: [
          {
            path: "",
            name: "exams",
            component: StudentExamsView,
          },
          {
            path: ":id",
            children: [
              {
                path: "",
                name: "subjectExams",
                component: StudentSubjectExamsView,
              },
              {
                path: "exam/:exam_id",
                name: "startExam",
                component: StartExamView,
              },
            ]
          },
        ]
      },
      {
        path: "absence",
        name: "absence",
        component: StudentAbsenceView
      },
      {
        path: "courses",
        children: [
          {
            path: "",
            name: "courses",
            component: StudentCoursesView
          },
          {
            path: ":subject_id",
            children: [
              {
                path: "",
                name: "subjectCourses",
                component: StudentSubjectCoursesView,
              },
              {
                path: "course/:course_id",
                children: [
                  {
                    path: "",
                    name: "studentCourse",
                    component: StudentCourseView,
                  },
                  {
                    path: "videos/:video_id",
                    name: "studentVideo",
                    component: studentVideoView,
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        path: "books",
        children: [
          {
            path: '',
            name: "books",
            component: StudentBooksView
          },
          {
            path: ":id",
            children: [
              {
                path: "",
                name: "subjectBooks",
                component: subjectBooks,
              },
            ]
          },
        ]
      },
      {
        path: "results",
        name: "studentResult",
        component: studentResultView
      },
      {
        path: "cart",
        name: "cart",
        component: cartView
      },
      {
        path: "notices",
        name: "notices",
        component: StudentNoticesView
      },
      {
        path: "profile",
        name: "profile",
        component: StudentProfileView
      },
    ]
  },
  { // Teacher
    path: '/teachers',
    name: 'teachers',
    component: TeachersView,
    meta: {
      teacherAuthed: true
    },
    children: [
      {
        path: "home",
        name: "teacherHome",
        component: TeacherHomeView
      },
      {
        path: "exams",
        children: [
          {
            path: "",
            name: "teacherExams",
            component: TeacherExamView
          },
          {
            path: ":exam",
            name: "teacherExam",
            component: TeacherShowExamView
          },
        ]
      },
      {
        path: "courses",
        children: [
          {
            path: "",
            name: "teacherCourses",
            component: TeacherCourseView
          },
          {
            path: ":course",
            name: "teacherCourse",
            component: TeacherShowCourseView
          },
        ]
      },
      {
        path: "books",
        children: [
          {
            path: "",
            name: "teacherBooks",
            component: TeacherBooksView
          },
        ]
      },
      {
        path: "absences",
        children: [
          {
            path: "",
            name: "teacherAbsence",
            component: TeacherAbsenceView
          },
        ]
      },
      {
        path: "profile",
        name: "TeacherProfile",
        component: TeacherProfileView
      },
    ]
  },
  { // Parent
    path: '/parents',
    name: 'parents',
    component: ParentsView,
    meta: {
      parentAuthed: true
    },
    children: [
      {
        path: "home",
        name: "parentHome",
        component: ParentHomeView
      },
      {
        path: "profile",
        name: "parentProfile",
        component: ParentProfileView
      },
      {
        path: "children",
        name: "parentChildren",
        component: ParentChildrenView
      },
      {
        path: "exams",
        name: "parentExams",
        component: ParentExamsView
      },
      {
        path: "results",
        name: "parentResult",
        component: parentResultView
      },
      {
        path: "absence",
        name: "parentAbsence",
        component: parentAbsence
      },
    ]
  },
  { // School
    path: '/schools',
    name: 'schools',
    component: SchoolsView,
    meta: {
      schoolAuthed: true
    },
    children: [
      {
        path: "home",
        name: "schoolHome",
        component: SchoolHomeView
      },
      {
        path: "subjects",
        name: "schoolSubjects",
        component: SchoolSubjectsView
      },
      {
        path: "classes",
        children: [
          {
            path: "",
            name: "schoolClasses",
            component: SchoolClassesView
          },
        ]
      },
      {
        path: "rooms",
        children: [
          {
            path: '',
            name: 'schoolRooms',
            component: SchoolRoomsView,
          },
          {
            path: ":room_id",
            name: "addStudents",
            component: SchoolEditRoomView
          },
        ]
      },
      {
        path: "teachers",
        name: "schoolTeachers",
        component: SchoolTeachersView
      },
      {
        path: "schedule",
        children: [
          {
            path: "",
            name: "schoolSchedule",
            component: schoolScheduleView
          },
          {
            path: "edit/:id",
            name: "schoolEditSchedule",
            component: schoolEditScheduleView
          }
        ]
        
      },
      {
        path: "absence",
        children: [
          {
            path: "",
            name: "schoolAbsence",
            component: schoolAbsence
          },
        ]
        
      },
      {
        path: "results",
        name: "schoolResult",
        component: schoolResult
      },
      {
        path: "profile",
        name: "SchoolProfile",
        component: SchoolProfileView
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.guest)) {

    if (store.getters.getLogin) {

      switch(store.getters.getLoginType) {
        case 'students':
          next({
            path: "/students/home"
          });
          break;
        case 'parents':
          next({
            path: "/parents/home"
          });
          break;
        case 'schools':
          next({
            path: "/schools/home"
          });
          break;
        case 'teachers':
          next({
            path: "/teachers/home"
          });
          break;
      }

      next({
        path: "/dashboard"
      });

    } else {

      next();

    }

  } else if (to.matched.some(record => record.meta.studentAuthed)) {

    if (store.getters.getLogin && store.getters.getLoginType == "students") {

      next();

    } else {

      next({
        path: "/login"
      });

    }

  } else if (to.matched.some(record => record.meta.parentAuthed)) {

    if (store.getters.getLogin && store.getters.getLoginType == "parents") {

      next();

    } else {

      next({
        path: "/login"
      });

    }

  } else if (to.matched.some(record => record.meta.schoolAuthed)) {

    if (store.getters.getLogin && store.getters.getLoginType == "schools") {

      next();

    } else {

      next({
        path: "/login"
      });

    }

  } else if (to.matched.some(record => record.meta.teacherAuthed)) {

    if (store.getters.getLogin && store.getters.getLoginType == "teachers") {

      next();

    } else {

      next({
        path: "/login"
      });

    }

  } else {

    next();

  }

});

export default router