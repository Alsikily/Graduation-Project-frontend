<template>
    <div>
        <div class="page-head">
            Subjects books
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
                        <router-link :to="{name: 'subjectBooks', params: {id: subject.id}}" class="start">
                            Books
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

                if (resp.data.subjects.length > 0) {

                    this.subjects.push(resp.data.subjects);

                }

            });

        },

    },

}

</script>