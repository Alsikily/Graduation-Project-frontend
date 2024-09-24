import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetStudentBooks(context) {

            return new Promise((resolve, reject) => {

                axios.get(`student/books`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performRateBook(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post(`student/books`, {

                    book_id: payload.book_id,
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