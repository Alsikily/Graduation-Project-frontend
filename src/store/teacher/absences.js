import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetTeachersAbsence(context) {

            return new Promise((resolve, reject) => {

                axios.get("teacher/absence", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performAddTeachersAbsence(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("teacher/absence", {

                    room_id: payload.room_id,
                    students: payload.comes

                }, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        }

    },

});