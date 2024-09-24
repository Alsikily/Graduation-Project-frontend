<template>
    <div class="add">
        <button @click="changeStatus" :class="[ addedToCart ? 'added' : 'notAdded' ]">
            <span v-if="!addedToCart">
                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                Add to cart
            </span>
            <span v-if="addedToCart">
                <font-awesome-icon :icon="['fas', 'cart-shopping']" />
                Remove from cart
            </span>
        </button>
    </div>
</template>

<script>

export default {

    data() {

        return {
            addedToCart: this.added,
            course_id: this.courseId,
        };

    },

    props: [
        "added",
        "courseId",
    ],

    created() {

        this.showStatus();

    },
    
    methods: {

        showStatus() {

            this.$store.dispatch("perfromShowCart", this.course_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.addedToCart = resp.data.exist;

                }

            });

        },

        changeStatus() {

            this.$store.dispatch("perfromChangeCart", this.course_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.addedToCart = resp.data.exist;

                }

            });

        }

    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.add {
    button {
        @include full;
        color: $main-color;
        display: flex;
        gap: 5px;
        padding: 10px 8px;
        border-radius: 4px;
        border: 2px solid $main-color;
        &.added {
            background-color: $main-color;
            color: #fff;
        }
        &.notAdded {
            background-color: transparent;
        }
    }
}

</style>