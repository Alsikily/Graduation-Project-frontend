import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performAddTeacher(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("school/teacher", {

                    teacher_email: payload.teacher_email,
                    subject_id: payload.subject_id,

                }, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    resolve(resp);

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performGetTeachers(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/teacher", {

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

        performDeleteTeacher(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`school/teacher/${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

    },

});