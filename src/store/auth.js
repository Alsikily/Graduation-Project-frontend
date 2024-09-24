import axios from 'axios';

export default ({

    state: {
        activeSelector: 'students',
        isLogin: false,
        user: null,
        token: null,
        loginType: null,
    },
    getters: {
        getActiveSelector(state) {
            return state.activeSelector;
        },
        getLogin(state) {
            return state.isLogin;
        },
        getLoginType(state) {
            return state.loginType;
        },
        getToken(state) {
            return state.token;
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        changeActiveSelector(state, payload) {
            state.activeSelector = payload;
        },
        set_user(state, payload) {
            state.user = payload;
        },
        set_token(state, payload) {
            state.token = payload;
        },
        set_login(state, payload) {
            state.isLogin = payload;
        },
        set_loginType(state, payload) {
            state.loginType = payload;
        },
    },
    actions: {

        performRegister(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("register", {
                    name: payload.fullName,
                    email: payload.email,
                    password: payload.password,
                    register_type: context.getters.getActiveSelector
                })
                .then((resp) => {

                    if (resp.data.status == "success") {

                        context.commit("set_login", true);
                        context.commit("set_loginType", resp.data.loginType);
                        context.commit("set_user", resp.data.user);
                        context.commit("set_token", resp.data.authorisation.token);

                    }
                    resolve(resp);

                })
                .catch((error) => {

                    reject(error);

                });

            });

        },

        performLogin(context, payload) {

            return new Promise((resolve, reject) => {

                axios.post("login", {
                    email: payload.email,
                    password: payload.password,
                    register_type: context.getters.getActiveSelector
                })
                .then((resp) => {

                    if (resp.data.status == "success") {

                        context.commit("set_login", true);
                        context.commit("set_loginType", resp.data.loginType);
                        context.commit("set_user", resp.data.user);
                        context.commit("set_token", resp.data.authorisation.token);

                    }
                    resolve(resp);

                })
                .catch((error) => {



                });

            });

        },

        performLogout(context) {

            return new Promise((resolve, reject) => {

                axios.post("logout", {
                    token: context.getters.getToken
                })
                .then((resp) => {

                    resolve(resp);
                    if (resp.data.status == "success") {

                        context.commit("set_login", false);
                        context.commit("set_loginType", null);
                        context.commit("set_user", null);
                        context.commit("set_token", null);
                        context.commit("changeActiveSelector", 'students');

                    }

                });
                
            });

        }

    },

});