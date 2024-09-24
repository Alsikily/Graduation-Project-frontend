import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetBooks(context) {

            return new Promise((resolve, reject) => {

                axios.get(`teacher/books`, {

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

        performAddBook(context, payload) {

            const FD = new FormData();
            FD.append('name', payload.name);
            FD.append('description', payload.description);
            FD.append('image', payload.url);
            FD.append('book', payload.book);

            return new Promise((resolve, reject) => {

                axios.post("teacher/books", FD, {
                    
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

        performDeleteBook(context, payload) {

            return new Promise((resolve, reject) => {

                axios.delete(`teacher/books/${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    resolve(resp);

                });

            });

        }

    },

});