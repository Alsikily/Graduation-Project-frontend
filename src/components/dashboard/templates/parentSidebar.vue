<template>
    <aside :style="[extended ? 'width: 0' : '']">
        <span class="extend" @click="extendAside">
            <font-awesome-icon icon="fa-solid fa-chevron-left" v-if="!extended" />
            <font-awesome-icon icon="fa-solid fa-chevron-right" v-if="extended" />
        </span>
        <div class="nav">
            <div class="logo">
                <div class="img">
                    <img src="../../../assets/photo.jpg" alt="photo">
                </div>
                <div class="info">
                    <h4 class="name">Hassan Alsikily</h4>
                    <span class="par">
                        <font-awesome-icon icon="fa-solid fa-award" />
                        <span>15K</span>
                    </span>
                </div>
            </div>
            <ul>
                <div class="top">
                    <router-link :to="{name: link[0]}" v-for="link in list">
                        <font-awesome-icon :icon="link[1]" />
                        <span>{{ link[2] }}</span>
                    </router-link>
                </div>
                <div class="bottom">
                    <router-link :to="{name: 'parentProfile'}">
                        <font-awesome-icon icon="fa-solid fa-user" />
                        <span>Profile</span>
                    </router-link>
                    <a @click="performLogout">
                        <font-awesome-icon icon="fa-solid fa-arrow-left" />
                        <span>Sign Out</span>
                    </a>
                </div>
            </ul>
        </div>
    </aside>
</template>

<script>

export default {

    data() {
        return {
            extended: false,
            list: [
                ["parentHome", "fa-solid fa-home", "home"],
                ["parentChildren", "fa-solid fa-users", "children"],
                ["parentExams", "fa-solid fa-calendar", "exams"],
                ["parentResult", "fa-solid fa-chart-simple", "results"],
                ["parentAbsence", "fa-solid fa-list", "Absence"],
            ]
        };
    },

    methods: {

        extendAside() {
            this.extended = !this.extended;
        },

        performLogout() {

            this.$store.dispatch("performLogout")
            .then((resp) => {
                if (resp.data.status == "success") {

                    this.$router.push({
                        name: 'login'
                    });

                }

            });

        }

    }

}

</script>
