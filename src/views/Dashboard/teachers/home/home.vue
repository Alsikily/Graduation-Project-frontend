<template>
    <div class="dashboard-container">
        <TeacherAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                home
            </div>
            <section class="body">
                <div class="header">
                    <div class="box">
                        <div class="icon">
                            
                        </div>
                        <div class="info">

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>

import TeacherAsideComp from '@/components/dashboard/templates/teacherSidebar.vue'

export default {

    components: {
        TeacherAsideComp
    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

section.body {
    .header {
        > .box {
            > .icon {

            }
            > .info {

            }
        }
    }
}

</style>