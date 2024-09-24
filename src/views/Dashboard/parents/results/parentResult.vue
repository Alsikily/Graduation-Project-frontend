<template>
    <div class="dashboard-container">
        <ParentAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Results
            </div>
            <div class="formType">
                <div class="for-container">
                    <form @change="getResults(student_id)">
                        <select v-model="student_id">
                            <option v-for="(child, index) in children[0]" :value="child.id">{{ child.name }}</option>
                        </select>
                    </form>
                </div>
            </div>
            <div class="result">
                <div class="room" v-if="results.length" v-for="singleResult in results[0].result">
                    <div class="title">{{ singleResult.name }}</div>
                    <div class="table">
                        <div class="tr">
                            <div class="td" v-for="subject in singleResult.room.subjects">{{ subject.subject.name }}</div>
                        </div>
                        <div class="tr">
                            <div class="td" v-for="result in singleResult.results">
                                {{ result.student_degree }} / {{ result.subject_degree }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ParentAsideComp from '@/components/dashboard/templates/parentSidebar.vue'

export default {

    data() {
        return {
            results: [],
            children: [],
            student_id: null,
        };
    },

    created() {

        this.getStudents();

    },

    methods: {

        getResults(studentID) {

            this.$store.dispatch("performGetParentStudentResults", studentID)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.results = [];
                    this.results.push(resp.data.results[0][0]);

                }

            });

        },

        getStudents() {

            this.$store.dispatch("performGetChildren")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.children.push(resp.data.children);
                    this.student_id = resp.data.children[0].id;
                    this.getResults(resp.data.children[0].id);

                }

            });

        },

    },

    components: {
        ParentAsideComp
    }

}

</script>

<style lang="scss" scoped>

.room {
    margin-top: 25px;
    > .title {
        margin-bottom: 5px;
    }
    .table {
        display: flex;
        .tr {
            flex-direction: column;
                padding: 0;
            gap: 5px;
            &:first-child {
                width: 200px;
            }
            &:not(:first-child) {
                flex: 1;
            }
            .td {
                width: 100%;
                display: flex;
                align-items: center;
                padding: 10px;
            }
        }
    }
}

</style>