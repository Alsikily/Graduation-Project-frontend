<template>
    <div>
        <div class="page-head">
            Subjects courses
        </div>
        <div class="classes">
            <div class="table">
                <div class="tr">
                    <div>Name</div>
                    <div class="options">Options</div>
                </div>
                <div class="tr" v-for="subject in subjects[0]">
                    <div>{{ subject.subject.name }}</div>
                    <div class="options">
                        <router-link :to="{name: 'subjectCourses', params: {subject_id: subject.id}}" class="start">
                            Courses
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {

    data() {
        return {
            subjects: []
        };
    },

    created() {

        this.getSubjects();

    },

    methods: {

        getSubjects() {

            this.$store.dispatch("performGetStudentSubjects")
            .then(resp => {

                this.subjects.push(resp.data.subjects);

            });

        },

    },

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;



</style>