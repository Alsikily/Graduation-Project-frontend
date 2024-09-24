import axios from 'axios';

export default ({

    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {

        performGetStudentProfile(context, payload) {

            return new Promise((resolve, reject) => {

                axios.get(`profile/${payload}`, {

                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`
                    },

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

        performUpdatePhoto(context, payload) {

            const FD = new FormData();
            FD.append('photo', payload.url);

            axios.post(`photo/${payload.AuthType}`, FD, {
                
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

                    context.commit("set_user", resp.data.user[0]);

                }

            });

        },

        performUpdateProfile(context, payload) {


            return new Promise((resolve, reject) => {

                axios.post(`profile/${payload.AuthType}`, {
                    name: payload.name,
                    email: payload.email,
                    password: payload.password,
                    phone: payload.phone,
                    id: payload.id,
                    address: payload.address,
                }, {
                    
                    headers: {
                        Authorization: `Bearer ${context.getters.getToken}`,
                    },

                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        context.commit("set_user", resp.data.user[0]);
                        resolve(resp);

                    }
    
                })
                .catch(error => {
    
                    reject(error);
    
                });

            });

        },

    },

});