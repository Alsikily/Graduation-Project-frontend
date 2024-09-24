import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performAddClass(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("school/class", {

                    class_id: payload.class_id

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

        performGetConstClasses(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/const_classes", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performGetClasses(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/class", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performDeleteClass(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`school/class/${payload}`, {

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