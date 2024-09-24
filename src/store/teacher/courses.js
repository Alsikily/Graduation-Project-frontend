import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performAddCourse(context, payload) {

            const FD = new FormData();
            FD.append('name', payload.name);
            FD.append('description', payload.description);
            FD.append('image', payload.url);
            FD.append('forWhich', payload.forWhich);
            FD.append('roomsChoosen', JSON.stringify(payload.roomsChoosen));

            return new Promise((resolve, reject) => {

                axios.post("teacher/courses", FD, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                        ContentType: 'multipart/form-data',
                    },
                    onUploadProgress: uploadEvent => {
                        this.progress = Math.round(uploadEvent.loaded / uploadEvent.total * 100);
                        console.log(`Upload Progress: ` + this.progress + '%');
                    }

                })
                .then(resp => {
    
                    if (resp.data.status == "success") {

                        resolve(resp);

                    }
    
                })
                .catch(error => {
    
                    reject(error);
    
                });

            });

        },

        performAddVideo(context, payload) {

            const FD = new FormData();
            FD.append('name', payload.name);
            FD.append('description', payload.description);
            FD.append('video', payload.video);
            FD.append('course_id', payload.course_id);

            return new Promise((resolve, reject) => {

                axios.post("teacher/videos", FD, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                        ContentType: 'multipart/form-data',
                    },
                    onUploadProgress: uploadEvent => {
                        this.progress = Math.round(uploadEvent.loaded / uploadEvent.total * 100);
                        console.log(`Upload Progress: ` + this.progress + '%');
                    }

                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        resolve(resp);

                    }

                })
                .catch(error => {
    
                    reject(error);
    
                });

            });

        },

        performGetTeacherCourses(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get("teacher/courses", {

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

        performGetCourse(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`teacher/courses/${payload}`, {

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

        performDeleteCourse(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`teacher/courses/${payload}`, {

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

        performDeleteVideo(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`teacher/videos/${payload}`, {

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