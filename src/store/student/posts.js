import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetPosts(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get("student/posts", {

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

        performAddPost(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("student/posts", {

                    body: payload.body,
                    subject_id: payload.subject_id,

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