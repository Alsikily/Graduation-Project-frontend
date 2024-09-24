import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetTeacherAbsence(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/absence", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performSubmitAbsence(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("school/absence", {
                    
                    teachers: payload.comes

                }, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        }

    },

});