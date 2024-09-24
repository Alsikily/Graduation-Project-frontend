import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetTeacherExams(context) {

            return new Promise((resolve, reject) => {

                axios.get(`teacher/exams`, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == 'success') {

                        resolve(resp);

                    }

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performAddExam(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("teacher/exams", {

                    name: payload.name,
                    degree: payload.degree,
                    for: payload.activeFor,
                    roomsChoosen: payload.roomsChoosen,

                }, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == 'success') {

                        resolve(resp);

                    }

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performGetExam(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`teacher/exams/${payload}`, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == 'success') {

                        resolve(resp);

                    }

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performAddQuestion(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("teacher/questions", {

                    question: payload.question,
                    exam_id: payload.exam_id,

                }, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        resolve(resp);

                    }

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performDeleteQuestion(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`teacher/questions/${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        resolve(resp);

                    }

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performAddAnswer(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("teacher/answers", {

                    answer: payload.answer,
                    question_id: payload.question_id,
                    exam_id: payload.exam_id,

                }, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        resolve(resp);

                    }

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performUpdateAnswer(context, payload) {

            return new Promise((resolve, reject) => {

                axios.put(`teacher/answers`, {

                    question_id: payload.question_id,
                    answer_id: payload.answer_id,
                    exam_id: payload.exam_id,

                }, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == 'success') {

                        resolve(resp);

                    }

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performExam(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`teacher/exams/${payload}`, {

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