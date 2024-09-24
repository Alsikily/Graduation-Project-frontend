<template>
    <div class="contain-selector">
        <div :class="{active: getActiveSelector == 'students'}" @click="changeSelector('students')">
            Student
            <span>
                <font-awesome-icon icon="fa-solid fa-check" />
            </span>
        </div>
        <div :class="{active: getActiveSelector == 'parents'}" @click="changeSelector('parents')">
            Parent
            <span>
                <font-awesome-icon icon="fa-solid fa-check" />
            </span>
        </div>
        <div :class="{active: getActiveSelector == 'schools'}" @click="changeSelector('schools')">
            School
            <span>
                <font-awesome-icon icon="fa-solid fa-check" />
            </span>
        </div>
        <div :class="{active: getActiveSelector == 'teachers'}" @click="changeSelector('teachers')">
            Teacher
            <span>
                <font-awesome-icon icon="fa-solid fa-check" />
            </span>
        </div>
    </div>
</template>

<script>

    export default {

        methods: {

            changeSelector(selector) {

                this.$store.commit("changeActiveSelector", selector);

            },

        },

        computed: {

            getActiveSelector() {

                return this.$store.getters.getActiveSelector;

            }

        },

    }

</script>