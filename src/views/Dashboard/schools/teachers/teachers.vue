<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Teachers
            </div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Name</div>
                        <div>Subject</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(teacher, index) in teachers[0]">
                        <div>{{ teacher.name }}</div>
                        <div>{{ teacher.subject.subject.name }}</div>
                        <div class="options">
                            <span class="delete" @click="deleteTeacher(teacher.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add teacher
                    </button>
                </div>
            </div>
        </div>
        <div class="cover" v-if="opened">
            <span class="close" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="addTeacher">
                    <div class="title">Add teacher</div>
                    <div class="body">
                        <div class="input-container">
                            <div class="input">
                                <label>Teacher E-mail</label>
                                <input type="email" v-model="teacher_email">
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="input">
                                <label for="subject">Subjects</label>
                                <select v-model="subject_id" id="subject">
                                    <option :value="subject.id" v-for="subject in subjects[0]">{{ subject.subject.name }}</option>
                                </select>
                            </div>
                        </div>
                        <div class="input-container" style="margin-top: 0">
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
            teacher_email: null,
            subject_id: null,
            subjects: [],
            teachers: []
        };
    },

    created() {
        this.getTeachers();
        this.performGetSubjects();
    },

    methods: {

        hideCover() {
            this.subject_id = null;
            this.teacher_id = null;
            this.opened = !this.opened;
        },

        getTeachers() {

            this.$store.dispatch("performGetTeachers")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.teachers.push(resp.data.teachers);

                }

            });

        },

        performGetSubjects() {

            this.$store.dispatch("performGetSubjects")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.subjects.push(resp.data.exists_subjects);

                }


            });

        },

        addTeacher() {

            this.$store.dispatch("performAddTeacher", {

                teacher_email: this.teacher_email,
                subject_id: this.subject_id,

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.teachers[0].push(resp.data.teacher[0]);
                    this.hideCover();

                }

            });

        },
        
        deleteTeacher(teacher_id, teacher_index) {

            this.$store.dispatch("performDeleteTeacher", teacher_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.teachers[0].splice(teacher_index, 1);

                }

            });

        }

    },

    components: {
        SchoolAsideComp
    }

}

</script>

<style lang="scss" scoped>
@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.subjects {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
    
}

</style>