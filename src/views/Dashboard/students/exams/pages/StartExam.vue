<template>
    <div>
        <div class="page-head" v-if="exam.length">
            {{ exam[0].name }} ({{ exam[0].teacher.name }})
        </div>
        <form @submit.prevent="submitExam()">
            <ul class="questions">
                <li class="question" v-if="exam.length" v-for="(question, index) in exam[0].questions">
                    <span class="title">{{ index + 1 }}. {{ question.question }}</span>
                    <ol class="answers" type="a">
                        <li v-for="answer in question.answers" :class="[answer ]">
                            <input @change="selectAnswer(question.id, answer.id)" type="radio" :name="`question[${question.id}]`" :id="'answer' + answer.id" :value="answer.id" :disabled="finished">
                            <label :for="'answer' + answer.id" :style="answer.isTrue == 'yes' && finished ? 'color: green' : (answer.isTrue == 'no' && findAnswer(answer.id) != -1 && finished) ? 'color: red' : '' ">{{ answer.answer }}</label>
                        </li>
                    </ol>
                </li>
            </ul>
            <div class="input" v-if="!responseExam.length">
                <input type="submit" value="Done">
            </div>
            <div class="input special" v-if="responseExam.length">
                <span>
                    {{ responseExam[0].student_degree }} / {{ responseExam[0].exam_degree }}
                </span>
            </div>
        </form>
    </div>
</template>

<script>

export default {

    data() {

        return {
            exam: [],
            answers: [],
            responseExam: [],
            finished: false
        };

    },

    created() {

        this.getExam();

    },

    methods: {

        findAnswer(answer_id) {

            return this.answers.findIndex(ans => {

                return ans[1] == answer_id;

            });

        },

        getExam() {

            // console.log(this.$route.id);
            this.$store.dispatch("performGetExamQuestions", {
                
                exam_id: this.$route.params.exam_id
                
            })
            .then(resp => {
                
                if (resp.data.status == "success") {

                    this.exam.push(resp.data.exam[0]);
                    if (this.exam[0].student_exam_count > 0) {

                        console.log(this.exam[0].student_exam_count);
                        this.$router.push({
                            name: "exams"
                        });

                    }

                } else if (resp.data.status == "error") {

                    this.$router.push({
                        name: "subjectExams",
                        params: {
                            id: this.$route.params.id
                        }
                    })

                }

            })

        },

        selectAnswer(question_id, answer_id) {

            let check = this.answers.findIndex((answer) => {

                return answer[0] == question_id;

            });

            if (check == -1) {

                this.answers.push([question_id, answer_id]);

            } else {

                this.answers[check][1] = answer_id;

            }

        },

        addExam() {

            this.$store.dispatch("performCheckExam", {

                exam_id: this.$route.params.exam_id,
                answers: this.answers

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.responseExam.push(resp.data.exam[0]);
                    this.finished = true;

                }

            });

        },

        submitExam() {

            if (this.exam[0].questions.length != this.answers.length) {

                let submitExam = window.confirm(`You have left ${this.exam[0].questions.length - this.answers.length} questions .. Are you sure ?!`);

                if (submitExam) {

                    this.addExam();

                }

            } else {

                this.addExam();

            }

        }

    },

    beforeRouteLeave (to, from , next) {

        if (this.exam.length != 0) {

            if (this.exam[0].student_exam_count == 0) {

                const answer = window.confirm('Do you really want to leave the exam ?!')
                if (answer) {

                    next()

                } else {

                    next(false)

                }

            }

        } else {

            next()

        }

    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

form {
    ul.questions {
        li.question {
            margin-bottom: 30px;
            span.title {
                font-weight: bold;
            }
            ol.answers {
                list-style-position: inside;
                padding: 7px 0;
                li.answer {
                    width: fit-content;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    margin-bottom: 7px;
                    cursor: pointer;
                    label {
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .input {
        @include center;
        background-color: $main-color;
        max-width: 130px;
        height: 50px;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        &.special {
            border: 2px solid $main-color;
            color: $main-color;
            background-color: transparent;
        }
        input {
            @include full;
            cursor: pointer;
            background-color: transparent;
            color: #fff;
            font-weight: bold;
        }
    }
}

</style>