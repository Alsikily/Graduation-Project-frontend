import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetComments(context, payload) {

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

        performAddComment(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("student/comments", {

                    body: payload.body,
                    post_id: payload.post_id,

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