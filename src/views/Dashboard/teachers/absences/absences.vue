<template>
    <div class="dashboard-container">
        <TeacherAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Absence
            </div>
            <form @submit.prevent="submitAbsence(room.id, room_index)" class="table-section" v-for="(room, room_index) in rooms[0]">
                <header>Room: {{ room.name }}</header>
                <div class="table">
                    <div class="tr">
                        <div class="td options">Photo</div>
                        <div class="td">Name</div>
                        <div class="td" v-for="abs in room.absence">
                            {{ abs.created_at }}
                        </div>
                        <div class="td options" v-if="checkInSubmitted(room.id) == -1 && checkNotDay(room_index)">
                            <span>Status</span>
                        </div>
                    </div>
                    <div class="tr" v-for="student in room.students">
                        <div class="td options">
                            <img :src="student.photo" width="50" height="50">
                        </div>
                        <div class="td name">{{ student.name }}</div>
                        <div class="td" v-for="takeAbsence in room.absence">
                            <span class="come" v-if="comeOrNot(student.absences, student.id, takeAbsence) != -1">come</span>
                            <span class="absent" v-else>absent</span>
                        </div>
                        <div class="td options" v-if="checkInSubmitted(room.id) == -1 && checkNotDay(room_index)">
                            <span>
                                <TeacherComeButton v-if="checkInComes(student.id) == -1" :comeOR="'false'" @click.prevent="addToCome(student.id)" />
                                <TeacherComeButton v-else :comeOR="'true'" @click.prevent="addToCome(student.id)" />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="submit" v-if="checkInSubmitted(room.id) == -1 && checkNotDay(room_index)">
                    <input type="submit" value="Done">
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import TeacherAsideComp from '@/components/dashboard/templates/teacherSidebar.vue'
import TeacherComeButton from '@/components/dashboard/teacher/TeacherComeButton.vue'

export default {

    data() {
        return {
            rooms: [],
            comes: [],
            submitted: []
        };
    },

    created() {

        this.getRooms();

    },

    methods: {

        getRooms() {

            this.$store.dispatch("performGetTeachersAbsence").
            then(resp => {

                this.rooms.push(resp.data.rooms);

            });

        },

        checkNotDay(room_index) {

            let room_absence = this.rooms[0][room_index].absence;

            if (room_absence.length > 0) {

                let room_last_day = room_absence[room_absence.length - 1].created_at;
                const d = new Date();
                let day = d.getDate();

                if (room_last_day != day) {

                    return true;

                } else {

                    return false;

                }

            } else {

                return true;

            }

        },

        submitAbsence(room_id, room_index) {

            this.$store.dispatch("performAddTeachersAbsence", {
                room_id: room_id,
                comes: this.comes
            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.submitted.push(resp.data.absence);
                    this.addAbsenceToRoom(resp.data.absence, room_index);
                    this.addAbsenceToStudent(resp.data.studentsAbsences, room_index);
                    this.comes = [];

                }

            });

        },

        addAbsenceToRoom(roomAbsence, room_index) {

            this.rooms[0][room_index].absence.push(roomAbsence);

        },

        addAbsenceToStudent(studentsAbsences, room_index) {

            let students = this.rooms[0][room_index].students;

            studentsAbsences.forEach(item => {

                let studentIndex = this.getStudentIndex(room_index, item.student_id);
                students[studentIndex].absences.push(item);

            });

        },

        getStudentIndex(room_index, student_id) {

            return this.rooms[0][room_index].students.findIndex(item => {

                return item.id == student_id;

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

        checkInSubmitted(room_id) {

            return this.submitted.findIndex(item => {

                return item.room_id == room_id;

            });

        },

        checkInComes(student_id) {

            return this.comes.findIndex(item => {

                return item == student_id;

            });

        },

        addToCome(student_id) {

            let indexFound = this.comes.findIndex(item => {

                return item == student_id;

            });

            if (indexFound != -1) {

                this.comes.splice(indexFound, 1);

            } else {

                this.comes.push(student_id);

            }

        },

    },

    components: {
        TeacherAsideComp,
        TeacherComeButton,
    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.table-section {
    margin-bottom: 50px;
    > header {
        margin-bottom: 5px;
    }
    .submit {
        input{
            width: 100%;
            background-color: $main-color;
            color: #fff;
            padding: 7px 0;
            margin-top: 5px;
            cursor: pointer;
        }
    }
}
.td {
    &.name {
        font-size: 14px;
        color: #404040;
    }
    &.options {
        flex-basis: 90px;
        button {
            border: 2px solid $main-color;
            padding: 10px 20px;
            background: transparent;
            border-radius: 3px;
            color: $main-color;
            &.submitted {
                background-color: $main-color;
                color: #fff;
            }
        }
    }
    img {
        @include circle;
    }
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
}

</style>