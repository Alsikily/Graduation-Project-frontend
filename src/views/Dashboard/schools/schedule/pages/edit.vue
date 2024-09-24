<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Room: {{ room.name }}
            </div>
            <div class="rooms">
                <div class="room">
                    <div class="body">
                        <form>
                            <div class="row first">
                                <div class="start">
                                    <span>Period</span>
                                    &MediumSpace; 
                                    /
                                    &MediumSpace; 
                                    <span>Day</span>
                                </div>
                                <div class="days">
                                    <div v-for="day in days[0]">{{ day.day }}</div>
                                </div>
                            </div>
                            <div class="row" v-for="period in room.periods">
                                <div class="start">{{ period.period }}</div>
                                <div class="days">
                                    <div v-for="lesson in period.lessons">
                                        <span>
                                            <span class="ex">
                                                <select @change="updateLesson($event, lesson.id)">
                                                    <option></option>
                                                    <option
                                                        v-for="teacher in teachers[0]"
                                                        :value="teacher.id"
                                                        :selected="teacher.id == lesson.teacher_id"
                                                    >
                                                        {{ teacher.name }} ({{ teacher.subject.subject.name }})
                                                    </option>
                                                </select>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'

export default {

    data() {

        return {
            room: [],
            teachers: [],
            days: []
        };

    },

    created() {

        this.getRoom();
        this.getTeachers();
        this.performGetDays();

    },

    methods: {

        performGetDays() {

            this.$store.dispatch("performGetDays")
            .then(resp => {

                this.days.push(resp.data.days);

            });

        },

        getRoom() {

            this.$store.dispatch("getRoom", this.$route.params.id)
            .then(resp => {

                this.room = resp.data[0];

            });

        },

        getTeachers() {

            this.$store.dispatch("performGetAcceptedTeachers")
            .then(resp => {

                this.teachers.push(resp.data.teachers);

            });

        },

        updateLesson(event, lesson_id) {
            
            let teacher_id = event.target.value;

            this.$store.dispatch("performUpdateLesson", {

                lesson_id: lesson_id,
                teacher_id: teacher_id

            })
            .then(resp => {

                // this.room = resp.data[0];

            });

        }

    },

    components: {
        SchoolAsideComp
    }

}

</script>

<style scoped lang="scss">
@use "@/scss/helpers/variables" as *;

.save {
    background-color: $second-color;
    color: #fff;
    width: 100%;
    padding: 9px 0;
    cursor: pointer;
}
.row:not(:first-child) {
    .days {
        > div {
            display: block !important;
            padding: 0 !important;
            > span {
                display: block !important;
                width: 100%;
                height: 100%;
                > span {
                    height: 100%;
                    select {
                        height: 100%;
                        width: 100%;
                        border: 1px solid #ddd;
                        cursor: pointer;
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>