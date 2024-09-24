<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">Profile</div>
            <div class="profile">
                <form @submit.prevent="updateSchoolProfile">
                    <div class="img">
                        <img :src="url">
                        <div class="cover-img">
                            <input type="file" @change="onChangeFile">
                            <font-awesome-icon :icon="['fas', 'upload']" />
                        </div>
                    </div>
                    <div class="info">
                        <div class="container-form">
                            <div class="input">
                                <label for="name">Full name</label>
                                <input v-model="name" type="text" id="name">
                            </div>
                            <div class="input">
                                <label for="email">E-mail</label>
                                <input v-model="email" type="text" id="email">
                            </div>
                        </div>
                        <div class="container-form">
                            <div class="input">
                                <label for="password">Password</label>
                                <input v-model="password" type="password" id="password">
                            </div>
                            <div class="input">
                                <label for="phone">phone</label>
                                <input v-model="phone" type="text" id="phone">
                            </div>
                        </div>
                        <div class="container-form">
                            <div class="input">
                                <label for="address">address</label>
                                <textarea v-model="address" id="address"></textarea>
                            </div>
                        </div>
                        <div class="container-form" v-if="updated" style="margin-top: -20px;">
                            <div class="input">
                                <div class="message">
                                    Updated Successfully
                                </div>
                            </div>
                        </div>
                        <div class="container-form">
                            <div class="input">
                                <input type="submit" value="Update">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'

export default {

    data() {

        return {
            name: null,
            email: null,
            password: null,
            phone: "",
            address: "",
            url: null,
            updated: false,
        };

    },

    created() {

        this.getSchoolProfile();

    },

    methods: {

        onChangeFile(e) {
            this.url = e.target.files[0];
            this.updateSchoolProfilePhoto();
            const file = e.target.files[0];
            this.url = URL.createObjectURL(file);
        },

        getSchoolProfile() {

            this.$store.dispatch("performGetStudentProfile", 'school')
            .then(resp => {

                if (resp.data.status == "success") {

                    let responseData = resp.data.profile[0];

                    this.name = responseData.name;
                    this.email = responseData.email;
                    this.phone = responseData.phone;
                    this.address = responseData.address;
                    this.url = responseData.photo;

                }

            })

        },

        updateSchoolProfile() {

            this.updated = false;
            this.$store.dispatch("performUpdateProfile", {

                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
                password: this.password,
                AuthType: "school"

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.updated = true;

                }

            })

        },

        updateSchoolProfilePhoto() {

            this.updated = false;
            this.$store.dispatch("performUpdatePhoto", {

                url: this.url,
                AuthType: "school"

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.updated = true;

                }

            })

        }

    },

    components: {
        SchoolAsideComp
    }

}

</script>

<style>



</style>