<template>
    <div class="dashboard-container">
        <SchoolAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Classes
            </div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Name</div>
                        <div>Rooms</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(single_class, index) in classes[0]">
                        <div>
                            {{ single_class.its_class.name }}
                        </div>
                        <div>{{ single_class.rooms_count }}</div>
                        <div class="options">
                            <span class="delete" @click="deleteClass(single_class.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add class
                    </button>
                </div>
            </div>
        </div>
        <div class="cover" v-if="opened">
            <span class="close" @click="hideCover">
                <font-awesome-icon icon="fa-solid fa-close" />
            </span>
            <div class="add-form">
                <form @submit.prevent="performAddClass">
                    <div class="title">Add class</div>
                    <div class="body">
                        <div class="input-container">
                            <div class="input">
                                <label for="class_id">Class id</label>
                                <select v-model="class_id" id="class_id">
                                    <option v-for="singleClass in constClasses[0]" :value="singleClass.id">{{ singleClass.name }}</option>
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
            class_id: null,
            classes: [],
            constClasses: []
        };
    },

    created() {

        this.performGetClasses();
        this.performGetConstClasses();

    },

    methods: {

        hideCover() {
            this.class_id = null;
            this.opened = !this.opened;
        },
        performAddClass() {

            this.$store.dispatch("performAddClass", {
                class_id: this.class_id
            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.classes[0].push(resp.data.class);
                    this.hideCover();

                }


            })
            .catch((error) => {

                console.log(error);

            });

        },
        performGetConstClasses() {

            this.$store.dispatch("performGetConstClasses")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.constClasses.push(resp.data.const_classes);

                }

            });

        },
        performGetClasses() {

            this.$store.dispatch("performGetClasses")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.classes.push(resp.data.classes);

                }

            });

        },
        deleteClass(class_id, index) {

            this.$store.dispatch("performDeleteClass", class_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.classes[0].splice(index, 1);

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

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

form {
    .form-container {
        flex: 1;
        select {
            width: 135px;
            border: 1px solid $main-color;
            cursor: pointer;
            padding: 4px 1px;
            color: $main-color;
            font-weight: bold;
            font-size: 13px;
            outline: none;
        }
    }
}

</style>

