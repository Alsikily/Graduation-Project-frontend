<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Absence
            </div>
            <form @submit.prevent="submitAbsence" class="table-section">
                <div class="table">
                    <div class="tr">
                        <div class="td options">Photo</div>
                        <div class="td">Name</div>
                        <div class="td" v-for="abs in absence[0]">
                            {{ abs.created_at }}
                        </div>
                        <div class="td options" v-if="!submitted && checkNotDay">
                            <span>Status</span>
                        </div>
                    </div>
                    <div class="tr" v-for="teacher in teachers[0]">
                        <div class="td options">
                            <img :src="teacher.photo" width="50" height="50">
                        </div>
                        <div class="td name">{{ teacher.name }}</div>
                        <div class="td" v-for="takeAbsence in absence[0]">
                            <span class="come" v-if="comeOrNot(teacher.absences, teacher.id, takeAbsence) != -1">come</span>
                            <span class="absent" v-else>absent</span>
                        </div>
                        <div class="td options" v-if="!submitted && checkNotDay">
                            <span>
                                <SchoolComeButton v-if="checkInComes(teacher.id) == -1" :comeOR="'false'" @click.prevent="addToCome(teacher.id)" />
                                <SchoolComeButton v-else :comeOR="'true'" @click.prevent="addToCome(teacher.id)" />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="submit" v-if="!submitted && checkNotDay">
                    <input type="submit" value="Done">
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'
import SchoolComeButton from '@/components/dashboard/school/SchoolComeButton.vue'

export default {

    data() {

        return {
            teachers: [],
            absence: [],
            comes: [],
            submitted: false
        };

    },

    created() {

        this.getTeachers();

    },

    methods: {

        getTeachers() {

            this.$store.dispatch("performGetTeacherAbsence")
            .then(resp => {

                this.teachers.push(resp.data.teachers);
                this.absence.push(resp.data.absence);

            });

        },

        teacherCome(teacherId) {

            let existTeacher = this.comes.indexOf(teacherId);

            if (existTeacher == -1) {

                this.comes.push(teacherId);
                
            } else {

                this.comes.splice(existTeacher, existTeacher + 1);

            }

        },

        submitAbsence() {

            this.$store.dispatch("performSubmitAbsence", {

                comes: this.comes

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.submitted = true;
                    this.addAbsenceToSchool(resp.data.absence);
                    this.addAbsenceToTeacher(resp.data.teachersAbsences);
                    this.comes = [];

                }


            });

        },

        addAbsenceToSchool(absence) {

            this.absence[0].push(absence);

        },

        addAbsenceToTeacher(teachersAbsences) {

            teachersAbsences.forEach(item => {

                let teacherIndex = this.getTeacherIndex(item.teacher_id);
                this.teachers[0][teacherIndex].absences.push(item);

            });

        },

        getTeacherIndex(teacher_id) {

            return this.teachers[0].findIndex(item => {

                return item.id == teacher_id;

            });

        },

        checkInComes(teacher_id) {

            return this.comes.findIndex(item => {

                return item == teacher_id;

            });

        },

        addToCome(teacher_id) {

            let indexFound = this.comes.findIndex(item => {

                return item == teacher_id;

            });

            if (indexFound != -1) {

                this.comes.splice(indexFound, 1);

            } else {

                this.comes.push(teacher_id);

            }

        },

        comeOrNot(teacherAbsences, teacher_id, takeAbsence) {

            if (teacherAbsences.length > 0) {

                return teacherAbsences.findIndex(element => {

                    return takeAbsence.created_at == element.created_at
                        && element.teacher_id == teacher_id;

                });

            } else {

                return -1;

            }

        },

    },

    computed: {

        checkNotDay() {

            let getAbsence = this.absence;

            if (getAbsence.length > 0) {

                let school_absence = getAbsence[0];

                if (school_absence.length > 0) {

                    let school_last_day = school_absence[school_absence.length - 1].created_at;
                    const d = new Date();
                    let day = d.getDate();

                    if (school_last_day != day) {

                        return true;

                    } else {

                        return false;

                    }

                } else {

                    return true;

                }

            } else {

                return true;

            }



        },

    },

    components: {

        SchoolAsideComp,
        SchoolComeButton,

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