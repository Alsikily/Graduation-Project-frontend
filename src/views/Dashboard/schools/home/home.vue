<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                home
            </div>
        </div>
    </div>
</template>

<script>

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'

export default {

    components: {
        SchoolAsideComp
    }

}

</script>