import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetChildrenExams(context) {

            return new Promise((resolve, reject) => {

                axios.get("parent/exams", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                }).then(resp => resolve(resp));

            });

        },

    },

});