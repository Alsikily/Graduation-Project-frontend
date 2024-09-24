<template>
    <router-link :to="{name: sbtnval}">
        <span v-text="stextval"></span>
    </router-link>
</template>

<script>

export default {

    data() {
        return {
            stextval: this.textval,
            sbtnval: this.btnval
        };
    },

    props: [
        "textval",
        "btnval"
    ]

}

</script>

<style lang="scss" scoped>

a {
    display: block;
    width: 100%;
    text-align: center;
    margin-top: 20px;
    color: #CDD2D3;
    a {
        color: inherit;
    }
}

</style>