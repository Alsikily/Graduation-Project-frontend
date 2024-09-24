<template>
    <div class="dashboard-container">
        <AsideComp :list="list" />
        <div class="dashboard-content">
            <router-view />
        </div>
    </div>
</template>

<script>

import AsideComp from '@/components/dashboard/templates/sidebar.vue'

export default {

    data() {
        return {
            list: [
                ["home", "fa-solid fa-home", "home"],
                ["community", "fa-solid fa-users", "community"],
                ["exams", "fa-solid fa-clipboard", "exams"],
                ["absence", "fa-solid fa-list", "absence"],
                ["courses", "fa-solid fa-play", "courses"],
                ["books", "fa-solid fa-book", "books"],
                ["studentResult", "fa-solid fa-chart-simple", "results"],
                ["cart", ['fas', 'cart-shopping'], "cart"]
            ]
        };
    },

    components: {
        AsideComp
    }

}

</script>