<template>
    <div>
        <div class="page-head">
            courses
        </div>
        <form @change="getStudentCourses" class="formType" style="margin-bottom: 8px;">
            <div class="for-container">
                <select v-model="teacher">
                    <option value="class">Class</option>
                    <option value="all">All</option>
                </select>
            </div>
        </form>
        <div class="courses" v-if="teacher == 'class'">
            <div class="course" v-for="course in classCourses[0]">
                <router-link :to="{name: 'studentCourse', params: {course_id: course.course.id}}" class="img">
                    <img :src="course.image">
                </router-link>
                <div class="body">
                    <div class="info">
                        <h4 class="title">{{ course.course.name }}</h4>
                        <span class="videos">{{ course.videos_count }} videos</span>
                        <span class="videos">{{ course.videos_sum_length != null ? course.videos_sum_length : 0 }} Minutes</span>
                        <span class="videos">{{ course.course.created_at.createdAtDate }}</span>
                        <div class="rate">
                            <font-awesome-icon v-for="rate in Math.ceil(course.rates_sum_rate / (course.rates_count != 0 ? course.rates_count : 1))" :icon="['fas', 'star']" />
                            <font-awesome-icon v-for="rate in (5 - Math.ceil(course.rates_sum_rate / (course.rates_count != 0 ? course.rates_count : 1)))" :icon="['far', 'star']" />
                        </div>
                    </div>
                    <div class="cart">
                        <addToCartComponent :added="false" :courseId="course.course.id" />
                    </div>
                </div>
            </div>
        </div>
        <div class="courses" v-if="teacher == 'all'">
            <div class="course" v-for="course in allCourses[0]">
                <router-link :to="{name: 'studentCourse', params: {course_id: course.course.id}}" class="img">
                    <img :src="course.image">
                </router-link>
                <div class="body">
                    <div class="info">
                        <h4 class="title">{{ course.name }}</h4>
                        <span class="videos">{{ course.videos_count }} videos</span>
                        <span class="videos">{{ course.created_at.createdAtDate }}</span>
                        <div class="rate">
                            <font-awesome-icon v-for="rate in Math.ceil(course.rates_sum_rate / (course.rates_count != 0 ? course.rates_count : 1))" :icon="['fas', 'star']" />
                            <font-awesome-icon v-for="rate in (5 - Math.ceil(course.rates_sum_rate / (course.rates_count != 0 ? course.rates_count : 1)))" :icon="['far', 'star']" />
                        </div>
                    </div>
                    <div class="cart">
                        <addToCartComponent :added="false" :courseId="course.id" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import addToCartComponent from "@/components/dashboard/templates/addToCart.vue"

export default {

    data() {

        return {
            teacher: "class",
            classCourses: [],
            allCourses: [],
        };

    },

    created() {

        this.getStudentCourses();

    },

    methods: {

        getStudentCourses() {

            this.$store.dispatch("performGetStudentSubjectCourses", {

                for: this.teacher,

            })
            .then(resp => {

                if (this.teacher == "class") {

                    this.classCourses = [];
                    this.classCourses.push(resp.data.courses);

                } else if (this.teacher == "all") {

                    this.allCourses = [];
                    this.allCourses.push(resp.data.courses);

                }

            });

        }

    },

    components: {
        addToCartComponent
    }

}

</script>

<style lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.courses {
    @include boxes(280px);
    gap: 30px;
    .course {
        overflow: hidden;
        background-color: #fff;
        border-radius: 8px;
        > .img {
            height: 200px;
            display: block;
            img {
                @include full;
            }
        }
        > .body {
            padding: 12px 8px;
            > .info {
                margin-bottom: 15px;
                display: flex;
                flex-direction: column;
                gap: 7px;
                > .title {
                    color: #333;
                }
                > .videos {
                    font-size: 14px;
                }
                > .rate {
                    display: flex;
                    gap: 2px;
                    color: #E59819;
                    svg {
                        // cursor: pointer;
                    }
                }
            }
            > .cart {
                display: flex;
                justify-content: space-between;
                > .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    > .title {
                        color: #5E5E5E;
                        font-size: 13px;
                    }
                    > .class {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}

</style>