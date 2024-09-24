import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

// Modules
import authStore from '@/store/auth'
import ProfileStore from '@/store/profile'

// School
import subjectsStore from '@/store/school/subjects'
import classesStore from '@/store/school/classes'
import roomsStore from '@/store/school/rooms'
import teachersStore from '@/store/school/teachers'
import scheduleStore from '@/store/school/schedule'
import schoolAbsenceStore from '@/store/school/absence'
import schoolResultsStore from '@/store/school/results'

// Teacher
import teacherStore from '@/store/teacher/teacher'
import examsStore from '@/store/teacher/exams'
import coursesStore from '@/store/teacher/courses'
import booksStore from '@/store/teacher/books'
import absencesStore from '@/store/teacher/absences'
import studentsStore from '@/store/teacher/students'

// Student
import communityStore from '@/store/student/community'
import postsStore from '@/store/student/posts'
import commentsStore from '@/store/student/comments'
import studentExamsStore from '@/store/student/exams'
import studentSubjectsStore from '@/store/student/subjects'
import studentCoursesStore from '@/store/student/courses'
import studentVideosStore from '@/store/student/videos'
import cartStore from '@/store/student/cart'
import SutdentBooksStore from '@/store/student/books'
import SutdentResultsStore from '@/store/results'
import SutdentAbsenceStore from '@/store/student/absence'

// Parent
import ChildrenStore from '@/store/parent/children'
import ChildrenExamsStore from '@/store/parent/exams'
import ParentAbsenceStore from '@/store/parent/absence'

export default createStore({
  state: {
  },
  getters: {
    getSchoolSotragePath(state) {
      return state.school_storage_path;
    }
  },
  mutations: {
  },
  actions: {
  },
  plugins: [new VuexPersistence().plugin],
  modules: {

    //  Auth
    authStore,
    ProfileStore,

    // School
    subjectsStore,
    classesStore,
    roomsStore,
    scheduleStore,
    teachersStore,
    schoolAbsenceStore,
    schoolResultsStore,

    // Teacher
    teacherStore,
    examsStore,
    coursesStore,
    booksStore,
    absencesStore,
    studentsStore,

    // Student
    communityStore,
    postsStore,
    commentsStore,
    studentExamsStore,
    studentSubjectsStore,
    studentCoursesStore,
    studentVideosStore,
    cartStore,
    SutdentBooksStore,
    SutdentResultsStore,
    SutdentAbsenceStore,

    // Parent
    ChildrenStore,
    ChildrenExamsStore,
    ParentAbsenceStore,

  }
})
