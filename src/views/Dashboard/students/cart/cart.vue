<template>
    <div>
        <div class="page-head">
            cart
        </div>
        <div class="courses">
            <div class="course" v-for="course in courses[0]">
                <router-link :to="{name: 'studentCourse', params: {subject_id: course.subject_id, course_id: course.id}}" class="img">
                    <img :src="course.image">
                </router-link>
                <div class="body">
                    <div class="info">
                        <h4 class="title">{{ course.name }}</h4>
                        <span class="videos">{{ course.videos_count }} videos</span>
                        <span class="videos">{{ course.videos_sum_length != null ? course.videos_sum_length : 0 }} Minutes</span>
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
            courses: []
        };
    },

    created() {

        this.getCourses();

    },

    methods: {

        getCourses() {

            this.$store.dispatch("performGetCartCourses")
            .then(resp => {

                this.courses.push(resp.data.courses);

            });

        }

    },

    components: {
        addToCartComponent
    }

}

</script>