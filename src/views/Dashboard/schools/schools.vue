<template>
    <router-view />
</template>

<script>

export default {

    data() {
        return {
            list: [
                ["schoolHome", "fa-solid fa-home", "home"],
                ["schoolSubjects", "fa-solid fa-flask", "subjects"],
                ["schoolClasses", "fa-solid fa-list", "classes"],
            ]
        };
    },

}

</script>