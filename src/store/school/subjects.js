import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performAddSubject(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("school/subject", {

                    subject_id: payload

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

        performGetConstSubjects(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/const_subjects", {

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

        performGetSubjects(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/subject", {

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

        performDeleteSubject(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`school/subject/${payload}`, {

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