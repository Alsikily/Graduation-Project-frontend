<template>
    <div v-if="video.length">
        <div class="page-head" style="text-transform: none;">
            {{ video[0].name }}
        </div>
        <div class="page">
            <div class="box">
                <div class="video-cover">
                    <video controls>
                        <source src="@/assets/css.mp4">
                    </video>
                </div>
                <div class="info">
                    <div class="about">
                        <div>
                            <font-awesome-icon :icon="['fas', 'eye']" />
                            {{ video[0].views }} Views
                        </div>
                        <div>
                            <font-awesome-icon :icon="['fas', 'clock']" />
                            {{ video[0].length }} minutes
                        </div>
                    </div>
                    <div class="rate">
                        <font-awesome-icon v-if="studentRate > 0" @click="RateVideo(index + 1)" v-for="(rate, index) in studentRate" :icon="['fas', 'star']" />
                        <font-awesome-icon @click="RateVideo(studentRate + index + 1)" v-for="(rate, index) in (5 - studentRate)" :icon="['far', 'star']" />
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="title">Description</div>
                <div class="body">{{ video[0].description }}</div>
            </div>
            <div class="box">
                <div class="title">Playlist</div>
                <div class="content">
                    <div class="head" @click="togglePlaylist">
                        <span class="title">{{ video[0].course.name }} ({{ video[0].course.videos_count }})</span>
                        <span class="icon">
                            <font-awesome-icon :icon="['fas', 'chevron-down']" />
                        </span>
                    </div>
                    <div class="body" v-if="openPlaylist">
                        <ul>
                            <li v-for="plVideo in video[0].course.videos">
                                <router-link :class="[videoId == plVideo.id ? 'activeVideo' : '' ]" :to="{name: 'studentVideo', params: {video_id: plVideo.id}}">{{ plVideo.name }}</router-link>
                            </li>
                        </ul>
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
            video: [],
            openPlaylist: false,
            studentRate: 0,
            videoId: this.$route.params.video_id
        };
    },

    created() {

        this.getVideo();

    },

    methods: {

        togglePlaylist() {
            this.openPlaylist = !this.openPlaylist;
        },

        getVideo() {

            this.$store.dispatch("performGetStudentVideo", this.videoId)
            .then(resp => {

                if (resp.data.status == "success") {

                    this.video = [];
                    this.video.push(resp.data.video);
                    this.studentRate = resp.data.video.studentRate.rate;

                }

            });

        },

        RateVideo(rate) {

            this.studentRate = rate;
            this.$store.dispatch("performRateVideo", {

                video_id: this.$route.params.video_id,
                rate: rate

            });

        }

    },

    watch: { 

        $route (to, from){

            this.videoId = this.$route.params.video_id;
            this.getVideo();

        }

    }

}

</script>

<style lang="scss" scoped>

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.page {
    display: flex;
    flex-direction: column;
    gap: 50px;
    .box {
        .video-cover {
            width: 100%;
            height: 750px;
            // height: 100px;
            video {
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
        }
        .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            > div.about {
                display: flex;
                gap: 8px;
                > div {
                    width: fit-content;
                    padding: 6px 8px;
                    border-radius: 50px;
                    background-color: #d9dee1;
                    font-size: 12px;
                    display: flex;
                    gap: 5px;
                }
            }
            > .rate {
                display: flex;
                gap: 2px;
                svg {
                    color: #E59819;
                    cursor: pointer;
                    font-size: 20px;
                }
            }
        }
    }
    .box {
        > .title {
            font-weight: bold;
            width: fit-content;
            margin-bottom: 7px;
        }
        > .body {
            color: #8b8b8b;
            font-size: 14px;
            line-height: 22px;
        }
    }
    .box {
        > .content {
            $padding: 15px;
            border-radius: 4px;
            overflow: hidden;
            > .head {
                display: flex;
                justify-content: space-between;
                background-color: $second-color;
                color: #fff;
                padding: $padding;
                font-weight: bold;
                cursor: pointer;
            }
            > .body {
                background-color: #fff;
                ul {
                    li {
                        a {
                            padding: 15px $padding;
                            display: block;
                            font-size: 14px;
                            &.activeVideo {
                                background-color: #DDE5EB;
                            }
                        }
                    }
                }
            }
        }
    }
}

</style>