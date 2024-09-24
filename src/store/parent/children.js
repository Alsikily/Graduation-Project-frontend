import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performAddChildren(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("parent/children", {

                    email: payload.email,

                }, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    resolve(resp);

                })
                .catch(error => {

                    reject(error);

                });

            });

        },

        performGetChildren(context) {

            return new Promise((resolve, reject) => {

                axios.get("parent/children", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                }).then(resp => resolve(resp));

            });

        },

        performDeleteChild(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`parent/children/${payload}`, {

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