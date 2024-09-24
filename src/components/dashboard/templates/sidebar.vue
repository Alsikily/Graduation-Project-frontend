<template>
    <aside :style="[extended ? 'width: 0' : '']">
        <span class="extend" @click="extendAside">
            <font-awesome-icon icon="fa-solid fa-chevron-left" v-if="!extended" />
            <font-awesome-icon icon="fa-solid fa-chevron-right" v-if="extended" />
        </span>
        <div class="nav">
            <div class="logo">
                <div class="img">
                    <img v-if="getUser.photo != null" :src="getUser.photo">
                    <img v-else src="@/assets/avatar.png">
                </div>
                <div class="info">
                    <h4 class="name">{{ getUser.name }}</h4>
                    <span class="par">
                        <font-awesome-icon icon="fa-solid fa-award" />
                        <span>{{ getUser.rank }}</span>
                    </span>
                </div>
            </div>
            <ul>
                <div class="top">
                    <router-link :to="{name: link[0]}" v-for="link in li_list">
                        <font-awesome-icon :icon="link[1]" />
                        <span>{{ link[2] }}</span>
                    </router-link>
                </div>
                <div class="bottom">
                    <router-link :to="{name: 'profile'}">
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
            li_list: this.list
        };
    },

    props: [
        "list"
    ],

    computed: {
        getUser() {

            return this.$store.getters.getUser;

        }
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

<style lang="scss" scoped>

@use '@/scss/helpers/variables' as *;
@use '@/scss/helpers/mixins' as *;

aside {
    $logo-height: 100px;
    position: relative;
    width: 265px;
    background-color: $main-color;
    height: 100%;
    .extend {
        $extend-dem: 50px;
        position: absolute;
        right: -$extend-dem;
        bottom: 15px;
        width: $extend-dem;
        height: $extend-dem;
        border-radius: 5px;
        background-color: #d7dae7b8;
        cursor: pointer;
        @include center;
    }
    .nav {
        height: 100%;
        overflow: hidden;
        .logo {
            height: $logo-height;
            border-bottom: 1px dashed #fff;
            padding: 0px 10px;
            @include center;
            .img {
                margin-right: 7px;
                @include square(55px);
                overflow: hidden;
                img {
                    @include circle(100%);
                }
            }
            .info {
                flex: 1;
                color: #fff;
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                > * {
                    width: 100%;
                }
                .name {
                }
                .par {
                    font-size: 14px;
                    display: flex;
                    gap: 5px;
                    svg {
                        margin-right: 2px;
                    }
                }
            }
        }
        ul {
            height: calc(100% - $logo-height);
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            > div {
                width: 100%;
                overflow: hidden;
                &.bottom {
                    border-top: 1px dashed #fff;
                }
            }
            a {
                height: 70px;
                color: #fff;
                display: flex;
                align-items: center;
                padding: 0 15px 0 25px;
                cursor: pointer;
                svg {
                    margin-right: 25px;
                    font-size: 25px;
                }
                > span {
                    font-size: 18px;
                    text-transform: capitalize;
                }
                &.router-link-active {
                    background-color: $second-color;
                    position: relative;
                    &::before {
                        content: '';
                        position: absolute;
                        width: 5px;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background-color: #ddd;
                    }
                }
            }
        }
    }
}

</style>