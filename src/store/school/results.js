import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetSchoolResults(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`school/results?status=${payload.status}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performAddSchoolResults(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post('school/results', {

                    results: payload.results,
                    name: payload.name,
                    room_id: payload.room_id

                }, {

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