<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Rooms
            </div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Room name</div>
                        <div>Class name</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(room, index) in rooms[0]">
                        <div>{{ room.name }}</div>
                        <div>{{ room.main_class.its_class.name }}</div>
                        <div class="options">
                            <router-link :to="{name: 'addStudents', params: {room_id: room.id}}" class="edit">
                                <font-awesome-icon icon="fa-solid fa-users" />
                                Students
                            </router-link>
                            <span class="delete" @click="deleteRoom(room.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add room
                    </button>
                </div>

            </div>
        </div>
        <div class="cover" v-if="opened">
            <span class="close" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="performAddRoom">
                    <div class="title">Add room</div>
                    <div class="body">
                        <div class="input-container">
                            <div class="input">
                                <label>Room name</label>
                                <input type="text" v-model="name" required>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="input">
                                <label>Class name</label>
                                <select v-model="class_id">
                                    <option v-for="singleClass in classes[0]" :value="singleClass.id">{{ singleClass.its_class.name }}</option>
                                </select>
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
</template>


<script>

import SchoolAsideComp from '@/components/dashboard/templates/schoolSidebar.vue'

export default {

    data() {
        return {
            opened: false,
            name: null,
            class_id: null,
            classes: [],
            rooms: []
        };
    },

    created() {

        this.performGetClasses();
        this.performGetRooms();

    },

    methods: {

        hideCover() {
            this.name = null;
            this.class_id = null;
            this.opened = !this.opened;
        },
        performAddRoom() {

            this.$store.dispatch("performAddRoom", {
                name: this.name,
                class_id: this.class_id
            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.rooms[0].push(resp.data.room);
                    this.hideCover();

                }

            })
            .catch((error) => {

                console.log(error);

            });

        },
        performGetRooms() {

            this.$store.dispatch("performGetRooms")
            .then(resp => {

                this.rooms.push(resp.data.rooms);

            });

        },
        performGetClasses() {

            this.$store.dispatch("performGetClasses")
            .then(resp => {

                if (resp.data.status) {

                    this.classes.push(resp.data.classes);

                }

            });

        },

        deleteRoom(room_id, room_index) {

            this.$store.dispatch("performDeleteRoom", room_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.rooms[0].splice(room_index, 1);

                }

            });

        }

    },

    components: {
        SchoolAsideComp
    }

}

</script>

<style lang="scss" scoped>
.table .tr > div.options {
    flex-basis: 200px;
}
</style>

<style lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.classes {
    .add-class {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
        button {
            background-color: $second-color;
            color: #fff;
            padding: 6px 10px;
            font-size: 16px;
        }
    }
}

</style>

