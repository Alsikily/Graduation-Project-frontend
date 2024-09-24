// Set Default BaseUrl For Axios
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/scss/main.scss'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faIdCard, faLock, faEye, faEyeSlash, faCheck, faSignature, faEnvelope, faAward, faChevronLeft, faChevronRight, faHome, faUsers, faClipboard, faList, faPlay, faBook, faBell, faArrowLeft, faUser, faFlask, faPlus, faClose, faUpload, faPenToSquare, faTrash, faCalendar, faLandmark, faPersonChalkboard, faStar, faThumbsUp, faThumbsDown, faTurnUp, faCartShopping, faChevronDown, faUserTie, faBookOpen, faClock, faMinus, faChartSimple } from '@fortawesome/free-solid-svg-icons'
import { faClipboard as reqClipboard, faThumbsUp as freeFaThumbsUp, faThumbsDown as freeFaThumbsDown, faComment, faStar as regualrStar } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faIdCard, reqClipboard, faLock, faEye, faEyeSlash, faCheck, faSignature, faEnvelope, faAward, faChevronLeft, faChevronRight, faHome, faUsers, faClipboard, faList, faPlay, faBook, faBell, faArrowLeft, faUser, faFlask, faPlus, faClose, faUpload, faPenToSquare, faTrash, faCalendar, faLandmark, faPersonChalkboard, faStar, faThumbsUp, faThumbsDown, freeFaThumbsUp, freeFaThumbsDown, faComment, faTurnUp, regualrStar, faCartShopping, faChevronDown, faUserTie, faBookOpen, faClock, faMinus, faChartSimple)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
