<template>
    <router-view />
</template>

<script>

export default {

    data() {
        return {
            list: [
                ["teacherHome", "fa-solid fa-home", "home"],
                ["teacherExams", "fa-solid fa-calender", "exams"],
            ]
        };
    },

}

</script>