<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                results
            </div>
            <form class="formType" @change="getResults()">
                <div class="for-container">
                    <select v-model="status">
                        <option value="announced">Announced</option>
                        <option value="not_announced">Not announced</option>
                    </select>
                </div>
            </form>
            <div class="rooms">
                <ResultRoomComponent v-for="(room, index) in rooms[0]" :SRoom="room" :SIndex="index" :type="status" />
            </div>
        </div>
    </div>
</template>

<script>

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'
import ResultRoomComponent from '@/components/dashboard/school/ResultRoomComponent.vue'

export default {

    data() {
        return {
            rooms: [],
            status: 'announced'
        };
    },

    created() {

        this.getResults();

    },

    methods: {


        getResults() {

            this.rooms = [];
            this.$store.dispatch("performGetSchoolResults", {status: this.status})
            .then(resp => {

                this.rooms.push(resp.data.rooms);

            });

        }

    },

    components: {
        SchoolAsideComp,
        ResultRoomComponent
    }

}

</script>
