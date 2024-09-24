<template>
    <div>
        <div class="page-head">
            exams
        </div>
        <div class="classes">
            <form @change="getStudentExams" class="formType">
                <div class="for-container">
                    <select v-model="teacher">
                        <option value="class">Class</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <div class="for-container">
                    <select v-model="exam">
                        <option value="exams">Exams</option>
                        <option value="success">Success</option>
                        <option value="faild">Faild</option>
                    </select>
                </div>
            </form>
            <div class="table" v-if="teacher == 'class' && exam == 'exams'">
                <div class="tr">
                    <div>Name</div>
                    <div>Questions</div>
                    <div class="options">Options</div>
                </div>
                <div class="tr" v-for="exam in classExams">
                    <div v-if="exam[0] != null">{{ exam[0].name }}</div>
                    <div v-if="exam[0] != null">{{ exam[0].questions_count }}</div>
                    <div class="options" v-if="exam[0] != null">
                        <!-- <router-link :to="{name: 'startExam', params: {exam_id: exam[0].id}}" class="start"> -->
                        <router-link :to="{name: 'startExam', params: {exam_id: exam[0].id}}" class="start">
                            Start
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="table" v-else-if="teacher == 'all' && exam == 'exams'">
                <div class="tr">
                    <div>Name</div>
                    <div>Questions</div>
                    <div class="options">Options</div>
                </div>
                <div class="tr" v-for="exam in allExams[0]">
                    <div v-text="exam.name"></div>
                    <div>{{ exam.questions_count }}</div>
                    <div class="options">
                        <router-link :to="{name: 'startExam', params: {exam_id: exam.id}}" class="start">
                            Start
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="table" v-else>
                <div class="tr">
                    <div>Name</div>
                    <div>Questions</div>
                    <div>Status</div>
                </div>
                <div class="tr" v-for="exam in othersExams[0]">
                    <div v-text="exam.exam.name"></div>
                    <div>12000</div>
                    <div>126</div>
                    <div :style="[ exam.status == 'success' ? 'color: #1cc11c' : 'color: red' ]">{{ exam.status }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            teacher: "class",
            exam: "exams",
            classExams: [],
            allExams: [],
            othersExams: []
        };
    },

    created() {

        this.getStudentExams();

    },

    methods: {

        getStudentExams() {

            this.$store.dispatch("performGetStudentExams", {

                teacher: this.teacher,
                exam: this.exam,

            })
            .then(resp => {

                if (this.teacher == "class" && this.exam == "exams") {

                    this.classExams = [];
                    this.classExams.push(resp.data.exams);

                } else if (this.teacher == "all" && this.exam == "exams") {

                    this.allExams = [];
                    this.allExams.push(resp.data.exams);

                } else {

                    this.othersExams = [];
                    this.othersExams.push(resp.data.exams);

                }

            });

        }

    },

}

</script>
