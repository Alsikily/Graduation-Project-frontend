<template>
    <div>
        <div class="page-head">
            absence
        </div>
        <div v-if="room.length">
            <header>Room: {{ room[0].name }}</header>
            <div class="table">
                <div class="tr">
                    <div class="td" v-for="abs in room[0].absence">
                        {{ abs.created_at }}
                    </div>
                </div>
                <div class="tr">
                    <div class="td" v-for="takeAbsence in room[0].absence">
                        <span class="come" v-if="comeOrNot(room[0].students[0].absences, room[0].students[0].id, takeAbsence) != -1">come</span>
                        <span class="absent" v-else>absent</span>
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
            room: []
        };
    },

    created() {

        this.getRoom();

    },

    methods: {

        getRoom() {

            this.$store.dispatch("performGetStudentAbsence")
            .then(resp => {

                this.room.push(resp.data.room[0]);

            });

        },

        comeOrNot(studentAbsences, student_id, takeAbsence) {

            if (studentAbsences.length > 0) {

                return studentAbsences.findIndex(element => {

                    return takeAbsence.created_at == element.created_at
                        && element.student_id == student_id;

                });

            } else {

                return -1;

            }

        },

    }

}

</script>

<style lang="scss" scoped>

span {
    font-weight: bold;
    font-size: 14px;
}
span.come {
    color: #1dc36f;
}
span.absent {
    color: #f15;
}

</style>