import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performAddRoom(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("school/room", {

                    name: payload.name,
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

        performGetRooms(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/room", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        getRoom(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`school/room/${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performDeleteRoom(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`school/room/${payload}`, {

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

        // Add Students Page
        performGetStudents(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`school/students/${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performAddStudent(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post(`school/students`, {

                    email: payload.email,
                    room_id: payload.room_id,

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

        performDeleteRoomStudent(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`school/students/${payload}`, {

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