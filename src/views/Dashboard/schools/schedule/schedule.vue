<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Schedule
            </div>
            <div class="rooms">
                <div class="room" v-for="(room, index) in rooms[0]">
                    <span class="name">Room: {{ room.name }}</span>
                    <div class="body">
                        <div class="row first">
                            <div class="start">
                                <span>Period</span>
                                &MediumSpace; 
                                /
                                &MediumSpace; 
                                <span>Day</span>
                            </div>
                            <div class="days">
                                <div v-for="day in days[0]">{{ day.day }}</div>
                            </div>
                        </div>
                        <div class="row" v-for="period in room.periods">
                            <div class="start">{{ period.period }}</div>
                            <div class="days">
                                <div v-for="lesson in period.lessons">
                                    <span v-if="lesson.subject">{{ lesson.subject.name }}</span>
                                    <span v-if="lesson.teacher">{{ lesson.teacher.name }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row last">
                            <div class="start" style="cursor: pointer;" @click="hideCover(room.id, index)">
                                <font-awesome-icon icon="fa-solid fa-plus" /> Add period
                            </div>
                            <div class="days">
                                <router-link :to="{name: 'schoolEditSchedule', params: {id: room.id}}">
                                    <font-awesome-icon icon="fa-solid fa-edit" />
                                    Edit
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cover" v-if="opened">
                <span class="close" @click="hideCover(null, null)">
                    <font-awesome-icon icon="fa-solid fa-close" />
                </span>
                <div class="add-form">
                    <form @submit.prevent="performAddPeriod">
                        <div class="title">Add period</div>
                        <div class="body">
                            <div class="input-container">
                                <div class="input">
                                    <label for="period">Period</label>
                                    <input type="text" v-model="period_text">
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
    </div>
</template>


<script>

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'

export default {

    data() {
        return {
            opened: false,
            rooms: [],
            days: [],
            room_id: null,
            room_index: null,
            period_text: null
        };
    },

    created() {

        this.performGetDays();
        this.performGetRooms();

    },

    methods: {

        hideCover(roomId = null, roomIndex = null) {

            this.room_id = roomId;
            this.room_index = roomIndex;
            this.period_text = null;
            this.opened = !this.opened;

        },

        performGetDays() {

            this.$store.dispatch("performGetDays")
            .then(resp => {

                this.days.push(resp.data.days);

            });

        },

        performGetRooms() {

            this.$store.dispatch("performGetRoomsSchedule")
            .then(resp => {

                this.rooms.push(resp.data.rooms);

            });

        },

        performAddPeriod() {

            this.$store.dispatch("performAddPeriod", {
                period: this.period_text,
                room_id: this.room_id
            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.rooms[0][this.room_index]['periods'].push(resp.data.period);
                    this.hideCover(null);

                }

            }); 

        },

    },

    components: {
        SchoolAsideComp
    }

}

</script>

<style lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.rooms {
    margin-top: 25px;
    .room {
        margin-bottom: 50px;
        .name {
            color: #6B6B6B;
            margin-bottom: 5px;
            display: block;
        }
        .body {
            .row {
                $gap: 8px;
                display: flex;
                gap: $gap;
                margin-bottom: $gap;
                .start,
                .days > div {
                    @include center;
                }
                .start {
                    flex: 1;
                    background-color: $second-color;
                    color: #fff;
                }
                .days {
                    flex: 7;
                    display: flex;
                    gap: $gap;
                    > div {
                        flex: 1;
                        @include center;
                        flex-direction: column;
                        gap: 3px;
                    }
                }
                &.first {
                    .start,
                    .days > div {
                        background-color: $main-color;
                        color: #fff;
                        padding: 8px 0;
                    }
                }
                &:not(:first-child) {
                    .start,
                    .days > div {
                        padding: 20px 0;
                    }
                    .days > div {
                        background-color: #fff;
                        @include center;
                        > span {
                            @include center;
                            font-weight: bold;
                            > &:last-child {
                                color: #C9C9C9;
                                font-size: 14px;
                            }
                        }
                    }
                }
                &.last {
                    .start,
                    .days > a {
                        background-color: $second-color;
                        color: #fff;
                    }
                    .start {
                        padding: 8px 0;
                        display: flex;
                        gap: 5px;
                    }
                    .days {
                        a {
                            width: 100%;
                            height: 100%;
                            @include center;
                            gap: 5px;
                        }
                    }
                }
            }
        }
    }
}

</style>

