<template>
    <div class="exam-body">
        <div class="exam">
            <div class="info">
                <div class="img">
                    <img v-if="child.photo != null" :src="child.photo">
                    <img v-else src="@/assets/avatar.png">
                </div>
                <div class="info">
                    <h5 class="name">
                        {{ child.name }}
                    </h5>
                    <div class="marks">
                        {{ child.exams_sum_student_degree }} / {{ child.exams_sum_exam_degree }}
                    </div>
                </div>
            </div>
            <div class="icon" @click="changeExpand">
                <font-awesome-icon v-if="!expand" icon="fa-solid fa-plus" />
                <font-awesome-icon v-if="expand" icon="fa-solid fa-minus" />
            </div>
        </div>
        <div class="body" v-if="expand">
            <div class="info-table">
                <div class="tr">
                    <div class="td">Name</div>
                    <div class="td">Subject</div>
                    <div class="td">Degree</div>
                    <div class="td option">Status</div>
                </div>
                <div class="tr" v-for="exam in child.exams">
                    <div class="td">{{ exam.exam.name }}</div>
                    <div class="td">{{ exam.exam.subject.subject.name }}</div>
                    <div class="td">{{ exam.student_degree }} / {{ exam.exam_degree }}</div>
                    <div class="td option" :style="[exam.status == 'success' ? 'color: green' : 'color: red' ]">{{ exam.status }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
    data() {
        return {
            expand: false,
            child: this.pChild
        };
    },

    props: [
        "pChild"
    ],

    methods: {

        changeExpand() {

            this.expand = !this.expand;

        }

    }

}

</script>

<style scoped lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.exam-body {
    $side-padding: 15px;
    margin-bottom: 15px;
    > .exam {
        border: 2px solid $main-color;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px $side-padding;
        background-color: #fff;
        > .info {
            flex: 1;
            display: flex;
            gap: 7px;
            > .img {
                @include circle(50px);
                img {
                    @include circle;
                    @include full;
                }
            }
            > .info {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                padding-top: 3px;
                gap: 5px;
                .name {
                    cursor: pointer;
                }
                .marks {
                    font-size: 12px;
                }
            }
        }
        > .icon {
            @include full(35px, 35px);
            @include center;
            border-radius: 3px;
            background-color: $main-color;
            color: #fff;
            cursor: pointer;
        }
    }
    .body {
        padding: 15px $side-padding;
        .info-table {
            .tr {
                display: flex;
                &:first-child {
                    .td {
                        color: $main-color;
                        font-weight: bold;
                        font-size: 16px;
                    }
                }
                &:not(:first-child) {
                    .td {
                        color: #000;
                        font-size: 14px;
                    }
                }
                .td {
                    flex: 1;
                    text-align: center;
                    padding: 8px 0;
                    &.option {
                        flex: none;
                        flex-basis: 80px;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}

</style>