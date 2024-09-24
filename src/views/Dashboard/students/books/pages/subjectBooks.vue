<template>
    <div>
        <div class="page-head">
            books
        </div>
        <div class="books-container">
            <div class="books">
                <StudentBook v-for="book in books[0]" :singleBook="book" :Rate="book.studentRate" />
            </div>
        </div>
    </div>
</template>

<script>

import StudentBook from "@/components/dashboard/templates/StudentBook.vue"

export default {

    data() {
        return {
            books: []
        };
    },

    created() {

        this.getStudentBooks();

    },

    methods: {

        getStudentBooks() {

            this.$store.dispatch("performGetStudentBooks", this.teacher)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.books.push(resp.data.books);

                }

            });

        },

    },

    components: {
        StudentBook
    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.books {
    @include boxes(230px);
    gap: 30px;
    padding-top: 10px;
}

</style>