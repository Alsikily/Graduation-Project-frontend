import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetStudentExams(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`student/exams?teacher=${payload.teacher}&exam=${payload.exam}`, {

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

        performGetExamQuestions(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`student/exams/${payload.exam_id}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performCheckExam(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post(`student/exams/${payload.exam_id}`, {

                    answers: payload.answers

                }, {

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

    },

});