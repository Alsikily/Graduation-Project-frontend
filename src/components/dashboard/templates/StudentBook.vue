<template>
    <div class="book">
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
                    <li class="rate1">
                        <font-awesome-icon v-for="rate in Math.ceil(book.rates_sum_rate / (book.rates_count != 0 ? book.rates_count : 1))" :icon="['fas', 'star']" />
                        <font-awesome-icon v-for="rate in (5 - Math.ceil(book.rates_sum_rate / (book.rates_count != 0 ? book.rates_count : 1)))" :icon="['far', 'star']" />
                    </li>
                    <li class="rate2">
                        <font-awesome-icon v-if="studentRate > 0" @click="RateBook(index + 1, book.id)" v-for="(rate, index) in studentRate" :icon="['fas', 'star']" />
                        <font-awesome-icon @click="RateBook(studentRate + index + 1, book.id)" v-for="(rate, index) in (5 - studentRate)" :icon="['far', 'star']" />
                    </li>
                    <li class="btns">
                        <a :href="book.book" target="_blank" class="read">
                            <font-awesome-icon :icon="['fas', 'book-open']" />
                            Read & Download
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            book: this.singleBook,
            studentRate: this.Rate
        };
    },

    props: [
        'singleBook',
        'Rate',
    ],

    methods: {
        
        RateBook(rate, book_id) {

            this.studentRate = rate;
            this.$store.dispatch("performRateBook", {

                book_id: book_id,
                rate: rate

            });

        }

    }

}

</script>


<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

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
                        &.rate1 {
                            color: #E59819;
                            svg {
                                font-size: 12px;
                            }
                        }
                        &.rate2 {
                            color: #E59819;
                            display: flex;
                            gap: 3px;
                            svg {
                                font-size: 18px;
                            }
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

</style>