<template>
    <div class="dashboard-container">
        <TeacherAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Exams
            </div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Name</div>
                        <div>Questions</div>
                        <div>For</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(exam, index) in exams[0]">
                        <div>{{ exam.name }}</div>
                        <div>{{ exam.questions_count }}</div>
                        <div>{{ exam.for }}</div>
                        <div class="options">
                            <span class="delete" @click="deleteExam(exam.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                            <router-link class="edit" :to="{name: 'teacherExam', params: {exam: exam.id}}">
                                Exam
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add exam
                    </button>
                </div>
            </div>
        </div>
        <div class="cover" v-if="opened">
            <span class="close" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="addExam">
                    <div class="title">Add exam</div>
                    <div class="body">
                        <div class="input-container">
                            <div class="input">
                                <label>Exam name</label>
                                <input type="text" v-model="name" required>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="input">
                                <label>Exam degree</label>
                                <input type="text" v-model="degree" required>
                            </div>
                        </div>


                        <div class="input-container" style="margin-bottom: 5px;">
                            <div class="input">
                                <label>Exam For :</label>
                                <div class="all-for">
                                    <div @click="changeFor('all')" :class="[activeFor == 'all' ? 'active' : '']">All Students</div>
                                    <div @click="changeFor('class')" :class="[activeFor == 'class' ? 'active' : '']">Classroom</div>
                                </div>
                            </div>
                        </div>
                        <div class="rooms-container" v-if="activeFor == 'class'">
                            <div class="row" v-for="room in rooms">
                                <input type="checkbox" v-model="roomsChoosen" :value="room.room.id" :id="'room_' + room.room.id">
                                <label :for="'room_' + room.room.id">{{ room.room.name }}</label>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="input">
                                <input type="submit" value="Add">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import TeacherAsideComp from '@/components/dashboard/templates/teacherSidebar.vue'

export default {

    data() {
        return {
            opened: false,

            // Model
            name: null,
            degree: null,
            activeFor: 'all',
            roomsChoosen: [],

            // Data
            exams: [],
            rooms: [],
        };
    },

    created() {

        this.getRooms();
        this.getExams();

    },

    methods: {

        hideCover() {
            this.name = null;
            this.degree = null;
            this.roomsChoosen = [];
            this.opened = !this.opened;
        },

        changeFor($for) {
            this.activeFor = $for;
        },

        getExams() {

            this.$store.dispatch("performGetTeacherExams")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exams.push(resp.data.exams);

                }

            });

        },

        getRooms() {

            this.$store.dispatch("performGetTeacherRooms")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.rooms.push(resp.data.rooms[0]);

                }

            });

        },

        addExam() {

            this.$store.dispatch("performAddExam", {

                name: this.name,
                degree: this.degree,
                activeFor: this.activeFor,
                roomsChoosen: this.roomsChoosen,

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exams[0].push(resp.data.exam);
                    this.hideCover();

                }

            });

        },

        deleteExam(exam_id, index) {
            
            this.$store.dispatch("performExam", exam_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exams[0].splice(index, 1);

                }

            });

        }

    },

    components: {
        TeacherAsideComp
    }

}

</script>

<style scoped lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.all-for {
    display: flex;
    gap: 8px;
    > div {
        background-color: $gray-color;
        padding: 5px 10px;
        color: #333;
        cursor: pointer;
        &.active {
            background-color: $second-color;
            color: #fff;
        }
    }
}

.rooms-container {
    .row {
        color: #000;
        width: 100%;
        display: flex;
        gap: 8px;
        > label {
            cursor: pointer;
        }
    }
}

</style>