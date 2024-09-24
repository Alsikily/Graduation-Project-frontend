<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head" v-if="students.length">Room: {{ students[0].name }}</div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Name</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(student, index) in students[0].students" v-if="students.length">
                        <div>
                            {{ student.name }}
                        </div>
                        <div class="options">
                            <span class="delete" @click="deleteStudent(student.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add student
                    </button>
                </div>
            </div>
        </div>
        <div class="cover" v-if="opened">
            <span class="close" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="addStudent">
                    <div class="title">Add student</div>
                    <div class="body">
                        <div class="input-container">
                            <div class="input">
                                <label for="s_email">Student E-Mail</label>
                                <input type="email" id="s_email" v-model="email">
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

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'

export default {

    data() {
        return {
            opened: false,
            email: null,
            students: [],
        };
    },

    created() {

        this.performGetStudents();

    },

    methods: {

        hideCover() {
            this.email = null;
            this.opened = !this.opened;
        },
        performGetStudents() {

            this.$store.dispatch("performGetStudents", this.$route.params.room_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.students.push(resp.data.students[0]);

                }


            });

        },
        addStudent() {

            this.$store.dispatch("performAddStudent", {

                email: this.email,
                room_id: this.$route.params.room_id

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.students[0].students.push(resp.data.student[0]);
                    this.email = null;

                }

            });

        },
        deleteStudent(student_id, student_index) {

            this.$store.dispatch("performDeleteRoomStudent", student_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.students[0].students.splice(student_index, 1);

                }

            });

        }

    },

    components: {
        SchoolAsideComp
    }

}

</script>

<style lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;



</style>

