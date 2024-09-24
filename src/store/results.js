import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetStudentResults(context) {

            return new Promise((resolve, reject) => {

                axios.get("student/results", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
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

        performGetParentStudentResults(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`parent/results?student_id=${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
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

    },

});