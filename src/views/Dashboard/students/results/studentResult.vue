<template>
    <div>
        <div class="page-head">
            Results
        </div>
        <div class="result">
            <div class="room" v-if="results.length" v-for="singleResult in results[0]">
                <div class="title">{{ singleResult.name }}</div>
                <div class="table">
                    <div class="tr">
                        <div class="td" v-for="subject in singleResult.room.subjects">{{ subject.subject.name }}</div>
                    </div>
                    <div class="tr">
                        <div class="td" v-for="result in singleResult.results">
                            {{ result.student_degree }} / {{ result.subject_degree }}
                        </div>
                    </div>
                </div>
            </div>
            <h4 v-else>Not data found</h4>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            results: []
        };
    },

    created() {

        this.getResults();

    },

    methods: {

        getResults() {

            this.$store.dispatch("performGetStudentResults")
            .then(resp => {

                if (resp.data.status == "success") {

                    if (resp.data.results.length > 0) {

                        this.results.push(resp.data.results);

                    }

                }

            });

        }

    }

}

</script>

<style lang="scss" scoped>

.room {
    margin-top: 25px;
    > .title {
        margin-bottom: 5px;
    }
    .table {
        display: flex;
        .tr {
            flex-direction: column;
                padding: 0;
            gap: 5px;
            &:first-child {
                width: 200px;
            }
            &:not(:first-child) {
                flex: 1;
            }
            .td {
                width: 100%;
                display: flex;
                align-items: center;
                padding: 10px;
            }
        }
    }
}

</style>