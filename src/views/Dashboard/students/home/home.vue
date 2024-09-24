<template>
    <div>
        <div class="page-head">
            home
        </div>
        <div class="body">
            <div class="layout">
                <!-- <div class="slice absences">
                    <ul class="slice-ul">
                        <li>
                            <div class="title">
                                <h3>Absence</h3>
                                <span>Your absence</span>
                            </div>
                            <div class="degree">
                                <font-awesome-icon :icon="['far', 'clipboard']" />
                            </div>
                        </li>
                        <li v-for="exam in 10">
                            <div class="title">
                                <h4 class="sub_name">Physics</h4>
                                <span>15 Exam</span>
                            </div>
                            <div class="degree">20 / 25</div>
                        </li>
                    </ul>
                    <div class="see-more">
                        <router-link :to="{name: 'exams'}">See All</router-link>
                    </div>
                </div> -->
                <div class="slice exams">
                    <ul class="slice-ul">
                        <li>
                            <div class="title">
                                <h3>Exams</h3>
                                <span>Child marks</span>
                            </div>
                            <div class="degree">
                                <font-awesome-icon :icon="['far', 'clipboard']" />
                            </div>
                        </li>
                        <li v-for="exam in 10">
                            <div class="title">
                                <h4 class="sub_name">Physics</h4>
                                <span>15 Exam</span>
                            </div>
                            <div class="degree">20 / 25</div>
                        </li>
                    </ul>
                    <div class="see-more">
                        <router-link :to="{name: 'exams'}">See All</router-link>
                    </div>
                </div>
                <div class="slice ranks">
                    <ul class="slice-ul">
                        <li>
                            <div class="title">
                                <h3>Exams</h3>
                                <span>Child marks</span>
                            </div>
                            <div class="degree">
                                <font-awesome-icon :icon="['far', 'clipboard']" />
                            </div>
                        </li>
                        <li v-for="exam in 10">
                            <div class="header">
                                <div class="icon">
                                    <img src="@/assets/photo.jpg" alt="student name photo">
                                </div>
                                <div class="info">
                                    <h4>Hassan Alsikily</h4>
                                    <span>Third Grade</span>
                                </div>
                            </div>
                            <div class="rank">
                                15K <font-awesome-icon :icon="['fa', 'award']" />
                            </div>
                        </li>
                    </ul>
                    <div class="see-more">
                        <router-link :to="{name: 'exams'}">See All</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

    .layout {
        display: flex;
        gap: 25px;
        .slice {
            background-color: #fff;
            padding: 25px;
            border-radius: 20px;
            box-shadow: 0px 0px 6px 1px #D2D5DC;
            &.absences {
                width: 350px;
            }
            &.exams {
                width: 350px;
            }
            &.ranks {
                width: 800px;
            }
            > ul.slice-ul {
                display: flex;
                flex-direction: column;
                > li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    &:first-of-type {
                        padding-top: 0;
                        > .degree {
                            background-color: #F7F7FF;
                            color: $main-color;
                            font-size: 26px;
                        }
                    }
                    &:not(:last-of-type) {
                        border-bottom: 1px solid #eee;
                    }
                    > .title {
                        display: flex;
                        flex-direction: column;
                        gap: 5px;
                        > .sub_name {
                            color: #343740;
                        }
                        > span {
                            color: #B0B4BC;
                        }
                    }
                    > .degree {
                        @include circle(70px, $main-color);
                        @include center;
                        color: #fff;
                    }
                    > .header {
                        display: flex;
                        gap: 8px;
                        align-items: center;
                        .icon {
                            @include circle(70PX);
                            img {
                                @include circle(70PX);
                            }
                        }
                        .info {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                            > span {
                                color: #B0B4BC;
                            }
                        }
                    }
                    > .rank {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        color: $main-color;
                        svg {
                            font-size: 18px;
                        }
                    }
                }
            }
            > .see-more {
                > a {
                    display: block;
                    width: 200px;
                    text-align: center;
                    margin: 0 auto;
                    margin-top: 10px;
                    background-color: $second-color;
                    color: #fff;
                    border-radius: 15px;
                    padding: 8px 0;
                }
            }
        }
    }

</style>