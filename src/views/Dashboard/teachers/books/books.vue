<template>
    <div class="dashboard-container">
        <TeacherAsideComp />
        <div class="dashboard-content">
            <div class="page-head">
                Books
            </div>
            <div class="books">
                <div class="book add" @click="hideCover">
                    <div class="content">
                        <font-awesome-icon :icon="['fas', 'fa-plus']" />
                        <span>Add book</span>
                    </div>
                </div>
                <div class="book" v-for="(book, index) in books">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <div class="img">
                                <img :src="book.image" alt="Book photo">
                            </div>
                        </div>
                        <div class="flip-card-back">
                            <div class="title">Info</div>
                            <h5 class="name">{{ book.name }}</h5>
                            <p class="description">
                                {{ book.description }}
                            </p>
                            <ul>
                                <li>
                                    <div class="icon">
                                        <font-awesome-icon :icon="['fas', 'user-tie']" />
                                    </div>
                                    <span>{{ book.teacher.name }}</span>
                                </li>
                                <li>
                                    <div class="icon">
                                        <font-awesome-icon :icon="['fas', 'book']" />
                                    </div>
                                    <span>{{ book.size }}</span>
                                </li>
                                <li>
                                    <div class="icon">
                                        <font-awesome-icon :icon="['fas', 'eye']" />
                                    </div>
                                    <span>{{ book.views }} views</span>
                                </li>
                                <li>
                                    <div class="icon">
                                        <font-awesome-icon :icon="['fa', 'calendar']" />
                                    </div>
                                    <span>{{ book.created_at }}</span>
                                </li>
                                <li class="rate">
                                    <font-awesome-icon v-for="rate in Math.ceil(book.rates_sum_rate / (book.rates_count != 0 ? book.rates_count : 1))" :icon="['fas', 'star']" />
                                    <font-awesome-icon v-for="rate in (5 - Math.ceil(book.rates_sum_rate / (book.rates_count != 0 ? book.rates_count : 1)))" :icon="['far', 'star']" />
                                </li>
                                <li class="btns">
                                    <a :href="book.book" target="_blank" class="read">
                                        <font-awesome-icon :icon="['fas', 'book-open']" />
                                        Read & Download
                                    </a>
                                    <span class="delete" @click="deleteBook(book.id, index)">
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                        Delete
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cover" v-if="opened">
                <span class="close" @click="hideCover">
                    <font-awesome-icon icon="fa-solid fa-close" />
                </span>
                <div class="add-form">
                    <form @submit.prevent="addBook">
                        <div class="title">Add book</div>
                        <div class="body">
                            <div class="input-container">
                                <div class="input">
                                    <label for="name">Name</label>
                                    <input type="text" v-model="name" id="name" required>
                                </div>
                            </div>
                            <div class="input-container" style="margin-bottom: 0">
                                <div class="input">
                                    <label for="description">Description</label>
                                    <textarea v-model="description" id="description"></textarea>
                                </div>
                            </div>
                            <div class="input-container input-special" style="margin-top: 0;margin-bottom: 6px !important;">
                                <div class="input">
                                    <input type="file" @change="onChangeFile" required>
                                </div>
                                <div class="text">
                                    <span>Upload book image</span>
                                    <div class="icon">
                                        <font-awesome-icon icon="fa-solid fa-upload" />
                                        <div class="check" v-if="url">
                                            <font-awesome-icon icon="fa-solid fa-check" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-container input-special" style="margin-top: 0;">
                                <div class="input">
                                    <input type="file" @change="onChangeFile2" required>
                                </div>
                                <div class="text">
                                    <span>Upload book</span>
                                    <div class="icon">
                                        <font-awesome-icon icon="fa-solid fa-upload" />
                                        <div class="check" v-if="book">
                                            <font-awesome-icon icon="fa-solid fa-check" />
                                        </div>
                                    </div>
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

import TeacherAsideComp from '@/components/dashboard/templates/teacherSidebar.vue'

export default {

    data() {
        return {
            opened: false,
            books: [],
            name: null,
            description: null,
            url: null,
            book: null,
        };
    },

    created() {

        this.getBooks();

    },

    methods: {

        hideCover() {
            this.description = null;
            this.name = null;
            this.url = null;
            this.book = null;
            this.opened = !this.opened;
        },

        onChangeFile(e) {
            this.url = e.target.files[0];
        },

        onChangeFile2(e) {
            this.book = e.target.files[0];
        },

        getBooks() {

            this.$store.dispatch("performGetBooks")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.books = resp.data.books;

                }

            });

        },

        addBook() {

            this.$store.dispatch("performAddBook", {

                name: this.name,
                description: this.description,
                url: this.url,
                book: this.book,

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.books.push(resp.data.book);
                    this.hideCover();

                }

            });

        },

        deleteBook(book_id, book_index) {

            this.$store.dispatch("performDeleteBook", book_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.books.splice(book_index, 1);

                }

            });

        }

    },

    components: {
        TeacherAsideComp
    }

}

</script>

<style scoped lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.input-special {
    display: block !important;
    position: relative;
    margin-bottom: -13px !important;
    width: 100%;
    height: 30px;
    > div {
        width: 100% !important;
        height: 100% !important;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
    }
    .input {
        z-index: 999;
        opacity: 0;
        input {
            border: 0 !important;
            cursor: pointer;
        }
    }
    .text {
        background-color: $second-color;
        color: #fff;
        padding: 0 8px;
        display: flex;
        justify-content: space-between;
        > span {
            font-size: 14px;
        }
        .icon {
            .check {
                bottom: -1px !important;
            }
        }
    }
}

.books {
    @include boxes(230px);
    gap: 30px;
    padding-top: 10px;
    .book {
        border-radius: 5px;
        perspective: 1000px;
        &.add {
            @include center;
            min-height: 300px;
            cursor: pointer;
            background-color: #f6f0ff4d !important;
            border: 1px dashed $main-color;
            color: $main-color;
            .content {
                display: flex;
                flex-direction: column;
                gap: 10px;
                font-weight: bold;
                svg {
                    font-size: 30px;
                }
            }
        }
        &:hover .flip-card-inner {
            transform: rotateY(180deg);
        }
        .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            .flip-card-front,
            .flip-card-back {
                @include full;
                position: relative;
                top: 0;
                left: 0;
                -webkit-backface-visibility: hidden;
                backface-visibility: hidden;
                background-color: #fff;
                border-radius: 5px;
                cursor: pointer;
        box-shadow: $main-shadow;
            }

            .flip-card-front {
                @include full;
                color: black;
                position: absolute;
                .img {
                    @include full;
                    img {
                        @include full;
                        border-radius: 5px;
                    }
                }
            }

            .flip-card-back {
                transform: rotateY(180deg);
                padding: 8px;
                padding-bottom: 12px;
                > .title {
                    width: fit-content;
                    padding: 4px 14px;
                    font-size: 13px;
                    background-color: $main-color;
                    color: #fff;
                    margin-bottom: 12px;
                }
                > .name {
                    margin-bottom: 5px;
                }
                > .description {
                    color: #b3b3b3db;
                    font-size: 12px;
                    line-height: 17px;
                    margin-bottom: 12px;
                }
                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    li {
                        display: flex;
                        font-size: 13px;
                        &.rate {
                            color: #E59819;
                        }
                        &.btns {
                            gap: 7px;
                            > * {
                                padding: 6px 8px;
                                color: #fff;
                                display: flex;
                                gap: 5px;
                                border-radius: 3px;
                                &.read {
                                    background-color: $second-color;
                                }
                                &.download {
                                    background-color: #46BB6E;
                                }
                            }
                        }
                        > .icon {
                            width: 20px;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
}

</style>

<style lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;


</style>