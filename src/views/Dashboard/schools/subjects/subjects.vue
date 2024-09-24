<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Subjects
            </div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Name</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(subject, index) in exists_subjects[0]">
                        <div>
                            {{ subject.subject.name }}
                        </div>
                        <div class="options">
                            <span class="delete" @click="deleteSubject(subject.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add subject
                    </button>
                </div>
            </div>
        </div>
        <div class="cover" v-if="opened">
            <span class="close" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="performAddSubject">
                    <div class="title">Add subject</div>
                    <div class="body">
                        <div class="input-container">
                            <div class="input">
                                <label>Subject</label>
                                <select v-model="subject_id">
                                    <option v-for="subjectSingle in const_subjects[0]" :value="subjectSingle.id">
                                        {{ subjectSingle.name }}
                                    </option>
                                </select>
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
            subject_id: null,
            const_subjects: [],
            exists_subjects: [],
        };
    },

    created() {

        this.performGetSubjects();
        this.GetConstSubjects();

    },

    methods: {

        hideCover() {
            this.subject_id = null;
            this.opened = !this.opened;
        },

        performAddSubject() {

            this.$store.dispatch("performAddSubject", this.subject_id)
            .then(resp => {

                this.exists_subjects[0].push(resp.data.subject);
                this.hideCover();

            })
            .catch((error) => {

                console.log(error);

            });

        },

        performGetSubjects() {

            this.$store.dispatch("performGetSubjects")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exists_subjects.push(resp.data.exists_subjects);

                }

            });

        },

        GetConstSubjects() {

            this.$store.dispatch("performGetConstSubjects")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.const_subjects.push(resp.data.const_subjects);

                }

            });

        },

        deleteSubject(subject_id, subject_index) {

            this.$store.dispatch("performDeleteSubject", subject_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exists_subjects[0].splice(subject_index, 1);

                }

            });

        }

    },

    components: {
        SchoolAsideComp
    }

}

</script>
