import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetDays(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/days", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performAddPeriod(context, payload) {
            
            return new Promise((resolve, reject) => {

                axios.post("school/period", {

                    period: payload.period,
                    room_id: payload.room_id

                }, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                        ContentType: 'multipart/form-data',
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

        performGetRoomsSchedule(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/room?getter=schedule", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        },

        performUpdateLesson(context, payload) {

            return new Promise((resolve, reject) => {

                axios.put(`school/lesson/${payload.lesson_id}`, {

                    teacher_id: payload.teacher_id

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

        performGetAcceptedTeachers(context) {

            return new Promise((resolve, reject) => {

                axios.get("school/teacher", {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    }

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        }

    },

});