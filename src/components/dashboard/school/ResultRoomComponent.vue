<template>
    <form v-if="status == 'not_announced'" @submit.prevent="addResult($event, room.subjects.length)">
        <div class="room" :class="['room', inserted ? 'disabled' : '']">
            <div class="title">
                <span>
                    Room {{ room.name }}
                </span>
                <span>
                    <input type="text" v-model="resultName" placeholder="Result name" :disabled="inserted" required>
                </span>
            </div>
            <div class="body">
                <div class="result-table">
                    <div class="tr">
                        <div class="td">Subject</div>
                        <div class="td" v-for="subject in room.subjects">{{ subject.subject.name }}</div>
                    </div>
                    <div class="tr">
                        <div class="td">Degree</div>
                        <div class="td" v-for="subject in room.subjects">
                            <input type="hidden" :value="subject.id">
                            <input type="text" value="0" :disabled="inserted">
                        </div>
                    </div>
                    <div class="tr" v-for="student in room.students">
                        <div class="td">{{ student.name }}</div>
                        <div class="td" v-for="subject in room.subjects">
                            <input type="text" value="0" :disabled="inserted">
                        </div>
                    </div>
                    <div class="tr">
                        <div class="td">
                            <input type="submit" value="Add" :disabled="inserted">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
    <div v-if="status == 'announced'">
        <div class="room">
            <div class="title">
                <span>
                    Room {{ room.room.name }}
                </span>
                <span>
                    Room {{ room.name }}
                </span>
            </div>
            <div class="body">
                <div class="result-table ann">
                    <div class="tr">
                        <div class="td">Subject</div>
                        <div class="td" v-for="subject in room.room.subjects">{{ subject.subject.name }}</div>
                    </div>
                    <div class="tr" v-for="student in room.room.students">
                        <div class="td">{{ student.name }}</div>
                        <div class="td degree" v-for="degree in student.degrees">
                            {{ degree.student_degree }} / {{ degree.subject_degree }}
                        </div>
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
            resultName: null,
            room: this.SRoom,
            room_id: this.SRoom.id,
            index: this.SIndex,
            inserted: false,
            status: this.type,
            students: []
        };
    },

    props: [
        "SRoom",
        "type"
    ],

    methods: {

        pushStudent(studentId, subjectsLength, elements, StartIndex) {

            this.students.push([[studentId], []]);
            let lastElement = this.students.length - 1;

            for (let y = 1; y <= subjectsLength + 1; y += 2) {

                let DegreeIndex = StartIndex + Math.floor(y / 2);
                let subjectId = elements[y].value;
                let subjectDegree = elements[y + 1].value;
                let studentDegree = elements[DegreeIndex].value;

                this.students[lastElement][1].push([
                    subjectId,
                    subjectDegree,
                    studentDegree
                ]);

            }

        },

        addResult(event, subjectsLength) {

            this.students = [];
            let elements = event.target.elements;
            let StartIndex = subjectsLength * 2 + 1;

            var studentIndex = 0;
            for (let x = StartIndex; x < elements.length - 1; x += subjectsLength) {

                let studentId = this.room.students[studentIndex].id;
                studentIndex++;

                this.pushStudent(studentId, subjectsLength, elements, x);

            }

            this.$store.dispatch("performAddSchoolResults", {
                results: this.students,
                name: this.resultName,
                room_id: this.room_id
            })
            .then(resp => {

                this.inserted = true;
                // this.rooms[0].splice(roomIndex, 1);

            });

        },

    }

}

</script>


<style scoped lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.room {
    .title {
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        input {
            border: 1px solid #ddd;
            padding: 6px 8px;
        }
    }
    .body {
        .result-table {
            width: 100%;
            .tr {
                display: flex;
                text-align: center;
                &:not(:last-child) {
                    &:first-child {
                        background-color: $main-color;
                        padding: 10px 0;
                        color: #fff;
                    }
                    &:not(:first-child) {
                        height: 60px;
                        &:not(:last-child) {
                            border-bottom: 2px solid #ddd;
                        }
                        .td:not(:first-child) {
                            &:not(:last-child) {
                                border-right: 2px solid #ddd;
                            }
                        }
                        .td {
                            &:first-child {
                                background-color: $second-color;
                                color: #fff;
                            }
                        }
                    }
                    .td {
                        &:not(:first-child) {
                            width: 150px;
                        }
                        &:first-child {
                            flex: 1;
                            height: 100%;
                            @include center;
                        }
                        input[type='text'] {
                            @include full;
                            text-align: center;
                        }
                    }
                }
                &:last-child {
                    .td {
                        width: 100%;
                        input[type='submit'] {
                            background-color: #2e6da9;
                            color: #fff;
                            cursor: pointer;
                            padding: 8px 0;
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
    &.disabled {
        $disabled-color: #e3e3e3;
        $disabled-cursor: not-allowed;
        .title {
            input {
                cursor: $disabled-cursor !important;
            }
        }
        .body {
            cursor: $disabled-cursor !important;
            input {
                background-color: $disabled-color;
                cursor: $disabled-cursor !important;
                &[type='submit'] {
                    background-color: $disabled-color !important;
                    color: #000 !important;
                    cursor: $disabled-cursor !important;
                }
            }
            .result-table {
                .tr {
                    &:first-child {
                        background-color: $disabled-color !important;
                        color: #000 !important;
                    }
                    &:not(:first-child) {
                        .td {
                            &:first-child {
                                background-color: $disabled-color !important;
                                color: #000 !important;
                            }
                        }
                    }
                }
            }
        }
    }
}

.degree {
    background-color: #fff;
    @include center;
}
.ann {
    .tr {
        &:last-child {
            height: 60px;
            .td {
                width: 150px !important;
                &:not(:last-child):not(:first-child) {
                    border-right: 2px solid #ddd;
                }
                &:first-child {
                    background-color: $second-color !important;
                    flex: 1 !important;
                    @include center;
                    color: #fff;
                }
            }
        }
        td {

        }
    }
}

</style>