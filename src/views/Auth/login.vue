<template>
    <div class="container">
        <div class="auth">
            <Image />
            <div class="form">
                <Welcome />
                <form id="login-form" @submit.prevent="loginForm">
                    <div class="form-error" v-if="errors.email">{{ errors.email[0] }}</div>
                    <div class="input-container">
                        <div class="icon">
                            <font-awesome-icon icon="fa-solid fa-envelope" />
                        </div>
                        <div class="input">
                            <input type="email" placeholder="E-mail" v-model="email" required maxlength="100">
                        </div>
                    </div>
                    <div class="input-container">
                        <div class="icon">
                            <font-awesome-icon icon="fa-solid fa-lock" />
                        </div>
                        <div class="input">
                            <input :type="inputType" placeholder="Password" v-model="password" required minlength="6">
                        </div>
                        <div class="icon eye" @click="changeEye()">
                            <font-awesome-icon icon="fa-solid fa-eye" v-show="showEye" />
                            <font-awesome-icon icon="fa-solid fa-eye-slash" v-show="!showEye" />
                        </div>
                    </div>
                </form>
                <Selector />
                <div class="submit-input">
                    <input type="submit" value="Sign In" form="login-form">
                </div>
                <Switch :textval="'Don’t have account ? Sign Up'" :btnval="'register'" />
            </div>
        </div>
    </div>
</template>

<script>

    import Image from "@/components/auth/image.vue";
    import Welcome from "@/components/auth/welcome.vue";
    import Selector from "@/components/auth/selector.vue";
    import Switch from "@/components/auth/switch.vue";

    export default {

        data() {
            return {
                errors: {
                    email: null,
                },
                showEye: false,
                email: null,
                password: null,
                inputType: 'password',
                // x: 1,
                // y: 1,
            };
        },

        methods: {

            changeEye() {

                this.showEye = !this.showEye;
                if (!this.showEye) {

                    this.inputType = 'password';

                } else {

                    this.inputType = 'text';

                }

            },

            loginForm() {

                this.$store.dispatch("performLogin", {
                    email: this.email,
                    password: this.password
                })
                .then(resp => {

                    if (resp.data.status == "success") {

                        this.$router.push(`/${resp.data.loginType}/home`);

                    } else {

                        this.errors = resp.data.messages;

                    }

                })
                .catch(error => {

                    console.log(error);

                });

            }

        },

        
        components: {
            Image,
            Welcome,
            Selector,
            Switch
        }

    }

</script>
