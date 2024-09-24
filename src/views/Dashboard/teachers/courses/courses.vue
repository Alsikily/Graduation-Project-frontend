<template>
    <div class="dashboard-container">
        <TeacherAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Courses
            </div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Name</div>
                        <div>Videos</div>
                        <div>For</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(course, index) in courses[0]">
                        <div>{{ course.name }}</div>
                        <div>{{ course.videos_count }}</div>
                        <div style="text-transform: capitalize;">{{ course.forWhich }}</div>
                        <div class="options">
                            <span class="delete" @click="deleteCourse(course.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                            <router-link class="edit" :to="{name: 'teacherCourse', params: {course: course.id}}">
                                Course
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add course
                    </button>
                </div>
            </div>
            <div class="cover" v-if="opened">
                <span class="close" @click="hideCover">
                    <font-awesome-icon icon="fa-solid fa-close" />
                </span>
                <div class="add-form">
                    <form @submit.prevent="addCourse">
                        <div class="title">Add course</div>
                        <div class="body">
                            <div class="input-container">
                                <div class="input">
                                    <label for="name">Name</label>
                                    <input type="text" v-model="name" id="name" required>
                                </div>
                            </div>
                            <div class="input-container" style="margin-bottom: 0">
                                <div class="input">
                                    <label for="description">Description</label>
                                    <textarea v-model="description" id="description"></textarea>
                                </div>
                            </div>
                            <div class="input-container" style="margin-bottom: 5px;">
                                <div class="input">
                                    <label>Exam For :</label>
                                    <div class="all-for">
                                        <div @click="changeFor('all')" :class="[forWhich == 'all' ? 'active' : '']">All Students</div>
                                        <div @click="changeFor('class')" :class="[forWhich == 'class' ? 'active' : '']">Classroom</div>
                                    </div>
                                </div>
                            </div>
                            <div class="rooms-container" v-if="forWhich == 'class'">
                                <div class="row" v-for="room in rooms[0]" v-if="rooms[0] != null">
                                    <input type="checkbox" v-model="roomsChoosen" :value="room.room.id" :id="'room_' + room.room.id">
                                    <label :for="'room_' + room.room.id">{{ room.room.name }}</label>
                                </div>
                            </div>
                            <div class="input-container input-special" style="margin-top: 0;">
                                <div class="input">
                                    <input type="file" @change="onChangeFile" required>
                                </div>
                                <div class="text">
                                    <span>Upload course image</span>
                                    <div class="icon">
                                        <font-awesome-icon icon="fa-solid fa-upload" />
                                        <div class="check" v-if="url">
                                            <font-awesome-icon icon="fa-solid fa-check" />
                                        </div>
                                    </div>
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
    </div>
</template>

<script>

import TeacherAsideComp from '@/components/dashboard/templates/teacherSidebar.vue'

export default {

    data() {
        return {
            opened: false,
            name: null,
            description: null,
            url: null,
            forWhich: "all",
            roomsChoosen: [],

            // Data
            rooms: [],
            courses: []
        };
    },

    created() {

        this.getRooms();
        this.getCourses();

    },

    methods: {

        hideCover() {
            this.description = null;
            this.name = null;
            this.url = null;
            this.roomsChoosen = [];
            this.opened = !this.opened;
        },

        changeFor($for) {
            this.forWhich = $for;
        },

        onChangeFile(e) {
            this.url = e.target.files[0];
        },

        getCourses() {

            this.$store.dispatch("performGetTeacherCourses")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.courses.push(resp.data.courses);

                }

            });

        },

        getRooms() {

            this.$store.dispatch("performGetTeacherRooms")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.rooms.push(resp.data.rooms);

                }

            });

        },

        addCourse() {

            this.$store.dispatch("performAddCourse", {

                name: this.name,
                description: this.description,
                url: this.url,
                forWhich: this.forWhich,
                roomsChoosen: this.roomsChoosen,

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.hideCover();
                    this.courses[0].push(resp.data.course);

                }

            });

        },

        deleteCourse(course_id, index) {
            
            this.$store.dispatch("performDeleteCourse", course_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.courses[0].splice(index, 1);

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

.input-special {
    display: block !important;
    position: relative;
    margin-bottom: -13px !important;
    width: 100%;
    height: 30px;
    > div {
        width: 100% !important;
        height: 100% !important;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
    }
    .input {
        z-index: 999;
        opacity: 0;
        input {
            border: 0 !important;
            cursor: pointer;
        }
    }
    .text {
        background-color: $second-color;
        color: #fff;
        padding: 0 8px;
        display: flex;
        justify-content: space-between;
        > span {
            font-size: 14px;
        }
        .icon {
            .check {
                bottom: -1px !important;
            }
        }
    }
}


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
    margin-bottom: 12px;
    .row {
        color: #000 !important;
        width: 100%;
        display: flex;
        gap: 8px;
        > label {
            cursor: pointer;
        }
    }
}


</style>