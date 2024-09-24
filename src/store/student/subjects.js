import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetStudentSubjects(context) {

            return new Promise((resolve, reject) => {

                axios.get("student/subjects", {
                    
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