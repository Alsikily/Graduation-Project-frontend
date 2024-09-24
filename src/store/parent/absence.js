import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetParentAbsence(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`parent/absence?student_id=${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

    },

});