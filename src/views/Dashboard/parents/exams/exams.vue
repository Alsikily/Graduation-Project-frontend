<template>
    <div class="dashboard-container">
        <ParentAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                exams
            </div>
            <div class="exams">
                <ExamComponent v-for="child in exams[0]" :pChild="child" />
            </div>
        </div>
    </div>
</template>

<script>

import ParentAsideComp from '@/components/dashboard/templates/parentSidebar.vue'
import ExamComponent from '@/components/dashboard/parent/examComponent.vue'

export default {

    data() {
        return {
            exams: []
        };
    },

    created() {

        this.getChildrenExams();

    },

    methods: {

        getChildrenExams() {

            this.$store.dispatch("performGetChildrenExams")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exams.push(resp.data.exams);

                }

            });

        }

    },

    components: {
        ParentAsideComp,
        ExamComponent
    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.exams {
    width: 100%;
}

</style>