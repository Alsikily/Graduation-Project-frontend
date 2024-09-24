<template>
    <div class="dashboard-container">
        <ParentAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                home
            </div>
            <div class="classes">
                <div class="table">
                    <div class="tr">
                        <div>Name</div>
                        <div>Rank</div>
                        <div class="options">Options</div>
                    </div>
                    <div class="tr" v-for="(child, index) in children[0]">
                        <div>
                            {{ child.name }}
                        </div>
                        <div>{{ child.rank }}</div>
                        <div class="options">
                            <span class="delete" @click="deleteChildren(child.id, index)">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
                <div class="add-class">
                    <button @click="hideCover">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Add child
                    </button>
                </div>
            </div>
            <div class="cover" v-if="opened">
                <span class="close" @click="hideCover">
                    <font-awesome-icon icon="fa-solid fa-close" />
                </span>
                <div class="add-form">
                    <form @submit.prevent="performAddParentStudent">
                        <div class="title">Add child</div>
                        <div class="body">
                            <div class="input-container">
                                <div class="input">
                                    <label for="childEmail">Children Email</label>
                                    <input type="email" v-model="email" id="childEmail">
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

import ParentAsideComp from '@/components/dashboard/templates/parentSidebar.vue'

export default {

    data() {
        return {
            opened: false,
            email: null,
            children: [],
        };
    },

    created() {

        this.getParentStudents();

    },

    methods: {

        hideCover() {

            this.email = null;
            this.opened = !this.opened;

        },

        performAddParentStudent() {

            this.$store.dispatch("performAddChildren", {

                email: this.email,

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.children[0].push(resp.data.child[0]);
                    this.hideCover();

                }

            });

        },

        getParentStudents() {

            this.$store.dispatch("performGetChildren")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.children.push(resp.data.children);

                }

            });

        },

        deleteChildren(child_id, child_index) {

            this.$store.dispatch("performDeleteChild", child_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.children[0].splice(child_index, 1);

                }

            });

        }

    },

    components: {
        ParentAsideComp
    }

}

</script>