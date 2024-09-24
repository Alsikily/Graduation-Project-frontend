<template>
    <div class="dashboard-container">
        <TeacherAsideComp />
        <div class="dashboard-content" style="overflow-x: hidden;">
            <div class="page-head">Course</div>
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
                            <span>
                                {{ course[0].videos_sum_views != null ? course[0].videos_sum_views : 0 }} views
                            </span>
                        </div>
                        <div>
                            <span>{{ course[0].videos_sum_length != null ? course[0].videos_sum_length : 0 }} minutes</span>
                        </div>
                        <div>
                            <span>
                                {{ course[0].created_at.createdAt }}
                            </span>
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
                        <p class="description">{{ course[0].description }}</p>
                    </div>
                    <div class="box">
                        <h4 class="title">Videos ({{ course[0].videos_count }})</h4>
                        <div class="videos">
                            <button @click="hideCover">
                                <font-awesome-icon icon="fa-solid fa-plus" />
                                Add Video
                            </button>
                            <div class="video" v-for="(video, index) in course[0].videos">
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
                                        <span>{{ video.created_at }}</span>
                                    </div>
                                    <div>
                                        <span>{{ video.length }} minutes</span>
                                    </div>
                                    <div>
                                        <span class="rank" v-if="video.rates_count != 0">
                                            <font-awesome-icon v-for="rate in Math.ceil(video.rates_sum_rate / video.rates_count)" :icon="['fas', 'star']" />
                                            <font-awesome-icon v-for="rate in (5 - Math.ceil(video.rates_sum_rate / video.rates_count))" :icon="['far', 'star']" />
                                        </span>
                                        <span class="rank" v-else>
                                            <font-awesome-icon v-for="rate in 5" :icon="['far', 'star']" />
                                        </span>
                                    </div>
                                    <span class="delete" @click="deleteVideo(video.id, index, video.length)">
                                        <font-awesome-icon icon="fa-solid fa-trash" />
                                        Delete
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cover" v-if="opened">
                <span class="close" @click="hideCover">
                    <font-awesome-icon icon="fa-solid fa-close" />
                </span>
                <div class="add-form">
                    <form @submit.prevent="addVideo">
                        <div class="title">Add video</div>
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
                            <div class="input-container input-special" style="margin-top: 0;">
                                <div class="input">
                                    <input type="file" @change="onChangeFile" required>
                                </div>
                                <div class="text">
                                    <span>Upload video</span>
                                    <div class="icon">
                                        <font-awesome-icon icon="fa-solid fa-upload" />
                                        <div class="check" v-if="video">
                                            <font-awesome-icon icon="fa-solid fa-check" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="input-container" style="margin-top: 0">
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
            name: null,
            description: null,
            video: null,
            course: []
        };
    },

    created() {
        this.getCourse();
    },

    methods: {

        hideCover() {
            this.name = null;
            this.description = null;
            this.video = null;
            this.opened = !this.opened;
        },

        onChangeFile(e) {
            this.video = e.target.files[0];
        },

        getCourse() {

            this.$store.dispatch("performGetCourse", this.$route.params.course)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.course.push(resp.data.course[0]);

                }


            });

        },

        addVideo() {

            this.$store.dispatch("performAddVideo", {

                name: this.name,
                description: this.description,
                video: this.video,
                course_id: this.$route.params.course

            })
            .then(resp => {

                if (resp.data.status == "success") {
                    this.course[0].videos.push(resp.data.video);
                    this.course[0].videos_sum_length += resp.data.video.length;
                    this.hideCover();
                }

            });

        },

        deleteVideo(video_id, index, video_length) {
            
            this.$store.dispatch("performDeleteVideo", video_id)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.course[0].videos.splice(index, 1);
                    this.course[0].videos_sum_length -= video_length;

                }

            });

        }

    },

    components: {
        TeacherAsideComp
    }

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
            p.description {
                font-size: 13px;
                color: #888;
                line-height: 20px;
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
                    counter-increment: videos;
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
                        position: relative;
                        overflow: hidden;
                        cursor: pointer;
                        &:hover {
                            > .delete {
                                right: 0;
                            }
                        }
                        > .delete {
                            position: absolute;
                            bottom: 0;
                            right: -81px;
                            transition: right 0.3s ease-in-out;
                        }
                        > div {
                            h4 {
                                &:before {
                                    content: counter(videos) '. ';
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