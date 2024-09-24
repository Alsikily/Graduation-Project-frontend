<template>
    <div class="dashboard-container">
        <ParentAsideComp />
        <div class="dashboard-content">
            <div class="page-head">absence</div>
            <div class="formType">
                <div class="for-container">
                    <form @change="getRooms(student_id)">
                        <select v-model="student_id">
                            <option v-for="(child, index) in children[0]" :value="child.id">{{ child.name }}</option>
                        </select>
                    </form>
                </div>
            </div>
            <div v-if="room.length" class="room">
                <header>Room: {{ room[0].name }}</header>
                <div class="table">
                    <div class="tr">
                        <div class="td" v-for="abs in room[0].absence">
                            {{ abs.created_at }}
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td" v-for="takeAbsence in room[0].absence">
                            <span class="come" v-if="comeOrNot(room[0].students[0].absences, room[0].students[0].id, takeAbsence) != -1">come</span>
                            <span class="absent" v-else>absent</span>
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
            room: [],
            children: [],
            student_id: null,
        };
    },

    created() {

        this.getParentStudents();

    },

    methods: {

        getRooms(student_id) {

            this.$store.dispatch("performGetParentAbsence", student_id).
            then(resp => {

                this.room = [];
                this.room.push(resp.data.room[0]);

            });

        },

        getParentStudents() {

            this.$store.dispatch("performGetChildren")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.children.push(resp.data.children);
                    this.student_id = this.children[0][0].id;
                    this.getRooms(this.children[0][0].id);

                }

            });

        },

        comeOrNot(studentAbsences, student_id, takeAbsence) {

            if (studentAbsences.length > 0) {

                return studentAbsences.findIndex(element => {

                    return takeAbsence.created_at == element.created_at
                        && element.student_id == student_id;

                });

            } else {

                return -1;

            }

        },

    },

    components: {
        ParentAsideComp,
    }

}

</script>

<style lang="scss" scoped>

span {
    font-weight: bold;
    font-size: 14px;
}
span.come {
    color: #1dc36f;
}
span.absent {
    color: #f15;
}

.room {
    margin-top: 35px;
}

</style>