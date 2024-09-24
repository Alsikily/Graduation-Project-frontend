import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetCartCourses(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get("student/cart", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);
                    if (resp.data.status == "success") {


                    }

                });

            });

        },

        perfromShowCart(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`student/cart/${payload}`, {

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

        perfromChangeCart(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("student/cart", {

                    course_id: payload,

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