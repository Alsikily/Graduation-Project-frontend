<template>
    <div class="dashboard-container">
        <TeacherAsideComp />
        <div class="dashboard-content">
            <div class="page-head" v-if="exam.length">
                {{ exam[0].name }}
            </div>
            <div class="questions">
                <ul>
                    <li v-for="(question, index) in exam[0].questions" v-if="exam.length">
                        <div class="text">
                            <span class="priority">({{ index + 1 }})</span>
                            <span class="question">{{ question.question }}</span>
                            <span class="icon" @click="deleteQuestion(question.id, index)">
                                <font-awesome-icon :icon="['fas', 'trash']" />
                            </span>
                        </div>
                        <div class="answers">
                            <form @change="updateAnswer(question.id, $event)">
                                <ul>
                                    <li v-for="answer in question.answers">
                                        <input type="radio" :id="'answer_' + answer.id" :value="answer.id" :name="'question_' + question.id" :checked="answer.isTrue">
                                        <label :for="'answer_' + answer.id">{{ answer.answer }}</label>
                                    </li>
                                </ul>
                            </form>
                            <button class="add-answer" @click="showAnswerCover(question.id, index)">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                                Add answer
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <button class="add-question" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-plus" />
                Add question
            </button>
        </div>
        <div class="cover" v-if="opened">
            <span class="close" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="addQuestion">
                    <div class="title">Add question</div>
                    <div class="body">
                        <div class="input-container" style="margin-bottom: 0;">
                            <div class="input" style="margin-bottom: 0;">
                                <label>Question</label>
                                <textarea v-model="question"></textarea>
                            </div>
                        </div>
                        <div class="input-container" style="margin: 5px 0 0 0;">
                            <div class="input"  style="margin-bottom: 0;">
                                <input type="submit" value="Add">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="cover" v-if="openedAnswer">
            <span class="close" @click="hideAnswerCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="addAnswer">
                    <div class="title">Add answer</div>
                    <div class="body">
                        <div class="input-container" style="margin-bottom: 0;">
                            <div class="input" style="margin-bottom: 0;">
                                <label>Answer</label>
                                <textarea v-model="answer"></textarea>
                            </div>
                        </div>
                        <div class="input-container" style="margin: 5px 0 0 0;">
                            <div class="input"  style="margin-bottom: 0;">
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
            // Covers
            opened: false,
            openedAnswer: false,
            // Data
            exam: [],
            // Models
            question: null,
            answer: null,
            question_id: null,
            question_index: null,
        };
    },

    created() {
        this.getExam();
    },

    methods: {

        hideCover() {
            this.question = null;
            this.opened = !this.opened;
        },

        hideAnswerCover() {
            this.question_index = null;
            this.question_id = null;
            this.answer = null;
            this.openedAnswer = !this.openedAnswer;
        },

        showAnswerCover(questionId, questionIndex) {

            this.hideAnswerCover();
            this.question_id = questionId;
            this.question_index = questionIndex;

        },

        getExam() {

            this.$store.dispatch("performGetExam", this.$route.params.exam)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exam.push(resp.data.exam[0]);

                }


            });

        },

        addQuestion() {

            this.$store.dispatch("performAddQuestion", {

                question: this.question,
                exam_id: this.exam[0].id,

            })
            .then(resp => {

                this.exam[0].questions.push(resp.data.question);
                this.hideCover();

            })
            .catch(error => {

                console.log(error);

            });

        },

        deleteQuestion(question_id, question_index) {

            this.$store.dispatch("performDeleteQuestion", question_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.exam[0].questions.splice(question_index, 1);

                }

            });

        },

        addAnswer() {

            this.$store.dispatch("performAddAnswer", {

                answer: this.answer,
                question_id: this.question_id,
                exam_id: this.exam[0].id,

            })
            .then(resp => {

                this.exam[0].questions[this.question_index].answers.push(resp.data.answer);
                this.hideAnswerCover();

            })
            .catch(error => {

                console.log(error);

            });

        },

        updateAnswer(question_id, event) {

            this.$store.dispatch("performUpdateAnswer", {

                question_id: question_id,
                answer_id: event.target.value,
                exam_id: this.exam[0].id,

            });

        }

    },

    components: {
        TeacherAsideComp
    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.questions {
    > ul {
        > li {
            margin-bottom: 30px;
            > .text {
                margin-bottom: 8px;
                font-weight: bold;
                display: flex;
                gap: 7px;
                span.question {
                    color: #000;
                }
                span.edit-question {
                    cursor: pointer;
                    color: $main-color;
                }
            }
            > .answers {
                form {
                    margin-bottom: 12px;
                    ul {
                        li {
                            display: flex;
                            align-items: center;
                            gap: 5px;
                            margin-bottom: 8px;
                            input {
                                $d: 17px;
                                width: $d;
                                height: $d;
                            }
                            label {
                                color: #444;
                                cursor: pointer;
                            }
                            span.edit-answer {
                                cursor: pointer;
                                color: $main-color;
                            }
                        }
                    }
                }
                .add-answer {
                    background-color: $second-color;
                    color: #fff;
                    padding: 5px 10px;
                }
            }
        }
    }
}

.add-question {
    background-color: $main-color;
    color: #fff;
    padding: 8px 14px;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.icon {
    cursor: pointer;
    svg {
        color: #ff005e;
    }
}

</style>