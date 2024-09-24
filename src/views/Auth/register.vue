<template>
    <div class="container">
        <div class="auth">
            <Image />
            <div class="form">
                <Welcome />
                <form id="register-form" @submit.prevent="registerForm">
                    <div class="input-container">
                        <div class="icon">
                            <font-awesome-icon icon="fa-solid fa-signature" />
                        </div>
                        <div class="input">
                            <input type="text" placeholder="Full name" v-model="fullName" required maxlength="100">
                        </div>
                    </div>
                    <div class="form-error" v-if="errors.name">{{ errors.name[0] }}</div>
                    <div class="input-container">
                        <div class="icon">
                            <font-awesome-icon icon="fa-solid fa-envelope" />
                        </div>
                        <div class="input">
                            <input type="email" placeholder="E-mail" v-model="email" required maxlength="100">
                        </div>
                    </div>
                    <div class="form-error" v-if="errors.email">{{ errors.email[0] }}</div>
                    <div class="input-container">
                        <div class="icon">
                            <font-awesome-icon icon="fa-solid fa-lock" />
                        </div>
                        <div class="input">
                            <input :type="inputType" placeholder="Password" v-model="password" required minlength="4">
                        </div>
                        <div class="icon eye" @click="changeEye()">
                            <font-awesome-icon icon="fa-solid fa-eye" v-show="showEye" />
                            <font-awesome-icon icon="fa-solid fa-eye-slash" v-show="!showEye" />
                        </div>
                    </div>
                </form>
                <Selector />
                <div class="submit-input">
                    <input type="submit" value="Sign In" form="register-form">
                </div>
                <Switch :textval="'Have account ? Sign In'" :btnval="'login'" />
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
                    name: null,
                    email: null
                },
                showEye: false,
                fullName: null,
                name_error: null,
                email: null,
                email_error: null,
                password: null,
                password_error: null,
                inputType: 'password'
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

            registerForm() {

                this.$store.dispatch("performRegister", {
                    fullName: this.fullName,
                    email: this.email,
                    password: this.password
                })
                .then((resp) => {
                    
                    if (resp.data.status == "success") {

                        this.$router.push(`/${resp.data.loginType}/home`);

                    } else {

                        this.errors = resp.data.messages;

                    }

                })
                .catch((error) => {

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
