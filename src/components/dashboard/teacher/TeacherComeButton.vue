<template>
    <button :class="[comes == 'true' ? 'submitted' : '' ]" >come</button>
</template>

<script>

export default {

    data() {
        return {
            comes: this.comeOR,
        };
    },

    props: [
        "comeOR"
    ]

}

</script>

<style scoped lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.submitted {
                background-color: $main-color;
                color: #fff;
            }

</style>
