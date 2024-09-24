import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performStudentGetCourse(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`student/courses/${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        resolve(resp);

                    }


                });

            });

        },

        performGetStudentSubjectCourses(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`student/courses?for=${payload.for}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        resolve(resp);

                    }


                });

            });

        }

    },

});