<!-- <template>
    <div class="dashboard-container">
        <AsideComp :list="list" />
        <div class="dashboard-content">
            <router-view />
        </div>
    </div>
</template> -->

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
                // ["community", "fa-solid fa-users", "community"],
                // ["exams", "fa-solid fa-clipboard", "exams"],
                // ["absence", "fa-solid fa-list", "absence"],
                // ["courses", "fa-solid fa-play", "courses"],
                // ["books", "fa-solid fa-book y   `QW", "books"],
                // ["notices", "fa-solid fa-bell", "notices"]
            ]
        };
    },

}

</script>