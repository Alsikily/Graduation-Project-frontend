import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetStudentVideo(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`student/videos/${payload}`, {

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

        performRateVideo(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post(`student/videos`, {

                    video_id: payload.video_id,
                    rate: payload.rate

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