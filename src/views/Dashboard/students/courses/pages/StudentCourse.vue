<template>
    <div>
        <div class="page-head">
            Course
        </div>
        <div class="page" v-if="course.length">
            <div class="course">
                <div class="image">
                    <div class="current">
                        <img :src="course[0].image">
                    </div>
                </div>
                <div class="info">
                    <div>
                        <h4>{{ course[0].name }}</h4>
                    </div>
                    <div>
                        <span>{{ course[0].teacher.name }}</span>
                    </div>
                    <div>
                        <span>{{ course[0].videos_sum_views }} views</span>
                    </div>
                    <div>
                        <span>{{ course[0].videos_sum_length }} minutes</span>
                    </div>
                    <div>
                        <span>{{ course[0].created_at.createdAt }}</span>
                    </div>
                    <div>
                        <span>{{ course[0].created_at.createdAtDate }}</span>
                    </div>
                    <div>
                        <span class="rank">
                            <font-awesome-icon v-for="rate in Math.ceil(course[0].rates_sum_rate / (course[0].rates_count != 0 ? course[0].rates_count : 1))" :icon="['fas', 'star']" />
                            <font-awesome-icon v-for="rate in (5 - Math.ceil(course[0].rates_sum_rate / (course[0].rates_count != 0 ? course[0].rates_count : 1)))" :icon="['far', 'star']" />
                        </span>
                    </div>
                </div>
            </div>
            <div class="boxes">
                <div class="box">
                    <h4 class="title">Describtion</h4>
                    <p class="desc">{{ course[0].description }}</p>
                </div>
                <div class="box">
                    <h4 class="title">Videos ({{ course[0].videos_count }})</h4>
                    <div class="videos">
                        <router-link :to="{name: 'studentVideo', params: {video_id: video.id}}" class="video" v-for="video in course[0].videos">
                            <div class="img">
                                <img :src="course[0].image">
                            </div>
                            <div class="info">
                                <div>
                                    <h4>{{ video.name }}</h4>
                                </div>
                                <div>
                                    <span>{{ video.views }} views</span>
                                </div>
                                <div>
                                    <span>{{ video.length }} minutes</span>
                                </div>
                                <div>
                                    <span>{{ video.created_at }}</span>
                                </div>
                                <div>
                                    <span class="rank">
                                        <font-awesome-icon v-for="rate in Math.ceil(video.rates_sum_rate / (video.rates_count != 0 ? video.rates_count : 1))" :icon="['fas', 'star']" />
                                        <font-awesome-icon v-for="rate in (5 - Math.ceil(video.rates_sum_rate / (video.rates_count != 0 ? video.rates_count : 1)))" :icon="['far', 'star']" />
                                    </span>
                                </div>
                            </div>
                        </router-link>
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
            course: [],
        };
    },

    created() {

        this.studentGetCourse();

    },

    methods: {

        studentGetCourse() {

            this.$store.dispatch("performStudentGetCourse", this.$route.params.course_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.course.push(resp.data.course[0]);

                }

            })

        }

    },

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.page {
    $main-margin-bottom: 25px;
    .course {
        width: 100%;
        display: flex;
        margin-bottom: $main-margin-bottom;
        > div {
            &.image {
                width: 40%;
                position: relative;
                > div {
                    position: absolute;
                    left: 0;
                    top: 0;
                    @include full;
                    &.current {
                        img {
                            @include full;
                        }
                    }
                    &.upload {
                        background-color: rgb(0 0 0 / 63%);
                        @include center;
                        color: #fff;
                    }
                }
            }
            &.info {
                flex: 1;
                padding-left: 12px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                > div {
                    > span {
                        color: #999;
                        &.rank {
                            $gap: 3px;
                            display: flex;
                            gap: $gap;
                            svg {
                                font-size: 16px;
                                color: #E59819;
                            }
                        }
                    }
                }
            }
        }
    }
    .boxes {
        .box {
            margin-bottom: $main-margin-bottom;
            > .title {
                font-size: 0.9em;
                margin-bottom: 5px;   
            }
            form {
                .input {
                    textarea {
                        @include textarea(100%, 200px);
                        border: 1px solid #ddd;
                    }
                }
            }
            .videos {
                button {
                    width: 100%;
                    text-align: left;
                    padding: 13px 10px;
                    cursor: pointer;
                    border-radius: 2px;
                    width: 250px;
                    background-color: $second-color;
                    color: #fff;
                    @include center;
                    gap: 5px;
                    margin-bottom: 10px;
                }
                .video {
                    display: flex;
                    margin-bottom: 20px;
                    .img {
                        position: relative;
                        width: 250px;
                        img {
                            @include full;
                            position: absolute;
                            left: 0;
                            top: 0;
                            border-radius: 8px;
                        }
                    }
                    .info {
                        flex: 1;
                        padding-left: 12px;
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        > div {
                            h4 {
                                counter-increment: section;
                                color: #000;
                                &:before {
                                    content: counter(section) '. ';
                                }
                            }
                        }
                        > div {
                            > span {
                                color: #999;
                                &.rank {
                                    $gap: 3px;
                                    display: flex;
                                    gap: $gap;
                                    svg {
                                        font-size: 16px;
                                        color: #E59819;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
.input-special {
    display: block !important;
    position: relative;
    margin-bottom: 10px !important;
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

</style>