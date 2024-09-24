<template>
    <div class="com-div">
        <div class="page-head">
            community
        </div>
        <div class="form">
            <form @submit.prevent="addPost">
                <div class="input-container">
                    <div class="input">
                        <textarea v-model="body" placeholder="Type your post"></textarea>
                    </div>
                </div>
                <div class="input-container">
                    <div class="input">
                        <input type="submit" value="Post">
                    </div>
                </div>
            </form>
            <div class="posts">
                <h3 class="title">Posts</h3>
                <div class="post" v-for="(post, index) in posts[0]">
                    <div class="title">
                        <div class="img">
                            <img v-if="post.student.photo != null" :src="post.student.photo">
                            <img v-else src="@/assets/avatar.png">
                        </div>
                        <div class="info">
                            <h4 class="name">
                                <span class="name">
                                    {{ post.student.name }}
                                </span>
                                <span class="icon">
                                    <font-awesome-icon :icon="['fa', 'award']" />
                                    {{ post.student.rank }}
                                </span>
                            </h4>
                            <span class="date">{{ post.created_at }}</span>
                        </div>
                    </div>
                    <div class="text" v-text="post.body"></div>
                    <hr>
                    <div class="comments">
                        <div class="add">
                            <form @submit.prevent="addComment(post.id, index)">
                                <div class="form-container">
                                    <div class="input textarea">
                                        <input type="text" :id="`post_${post.id}`" placeholder="Add comment">
                                    </div>
                                    <div class="input submit">
                                        <input type="submit" value="Add">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <h5 class="title">
                            <font-awesome-icon icon="fa-regular fa-comment" />
                            Comments ({{ post.comments_count }})
                        </h5>
                        <div class="comment" v-for="comment in post.comments">
                            <div class="title">
                                <div class="img">
                                    <img v-if="comment.student.photo != null" :src="comment.student.photo">
                                    <img v-else src="@/assets/avatar.png">
                                </div>
                                <div class="info">
                                    <h6 class="name">
                                        <span class="name">
                                            {{ comment.student.name }}
                                        </span>
                                        <span class="icon">
                                            <font-awesome-icon :icon="['fa', 'award']" />
                                            {{ comment.student.rank }}
                                        </span>
                                    </h6>
                                    <span class="date">{{ comment.created_at }}</span>
                                </div>
                            </div>
                            <div class="title spe">
                                <div class="img">
                                    <font-awesome-icon icon="fa-solid fa-turn-up" />
                                </div>
                                <div class="info">
                                    <div class="text">{{ comment.body }}</div>
                                </div>
                            </div>
                        </div>
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
            subjects: [],
            posts: [],
            body: null,
        };
    },

    created() {

        this.getPosts();

    },

    methods: {

        getPosts() {

            this.$store.dispatch("performGetPosts")
            .then(resp => {

                if (resp.data.status == "success") {

                    this.posts.push(resp.data.posts);

                }

            });

        },

        addPost() {

            this.$store.dispatch("performAddPost", {

                body: this.body,

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    this.body = null;
                    this.posts[0].push(resp.data.post);

                }

            });

        },

        addComment(post_id, post_index) {

            let comment = document.getElementById(`post_${post_id}`)
            let comment_body = comment.value;
            this.$store.dispatch("performAddComment", {

                post_id: post_id,
                body: comment_body,

            })
            .then(resp => {

                if (resp.data.status == "success") {

                    comment.value = null;
                    this.posts[0][post_index].comments.push(resp.data.comment);

                }

            });

        },

    },

}

</script>

<style scoped lang="scss">

@use "@/scss/helpers/variables" as *;
@use "@/scss/helpers/mixins" as *;

.com-div {
    .form {
        max-width: 1024px;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 50px;
        form {
            display: flex;
            flex-direction: column;
            gap: 5px;
            .input-container {
                display: flex;
                gap: 15px;
                .input {
                    flex: 1;
                    overflow: hidden;
                    width: 100%;
                    textarea {
                        @include textarea($height: 200px);
                    }
                    select {
                        width: 100%;
                        cursor: pointer;
                        padding: 5px 0;
                        outline: none;
                    }
                    input[type="submit"] {
                        width: 100%;
                        background-color: $second-color;
                        color: #fff;
                        padding: 10px 0;
                        cursor: pointer;
                    }
                }
            }
        }
        .posts {
            > .title {
                margin-bottom: 7px;
            }
            .post {
                padding: 20px 18px;
                background-color: #fff;
                margin-bottom: 30px;
                border-radius: 5px;
                box-shadow: $main-shadow;
                > .title {
                    display: flex;
                    gap: 12px;
                    .img {
                        @include circle(55px);
                        img {
                            @include full;
                            @include circle;
                        }
                    }
                    .info {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        .name {
                            color: #444;
                            display: flex;
                            gap: 10px;
                            > span.icon {
                                color: $main-color;
                            }
                        }
                        .date {
                            color: #ccc;
                        }
                    }
                }
                > .text {
                    line-height: 27px;
                    font-size: 14px;
                    color: #555;
                    padding: 15px 0;
                }
                > .options {
                    display: flex;
                    gap: 20px;
                    .option {
                        button {
                            background-color: transparent;
                            .icon {
                                svg {
                                    font-size: 20px;
                                }
                            }
                            .text {
                                font-size: 15px;
                            }
                        }
                    }
                }
                hr {
                    margin: 15px 0;
                }
                .comments {
                    .add {
                        margin-bottom: 30px;
                        form {
                            width: 100%;
                            .form-container {
                                display: flex;
                                gap: 8px;
                                .input {
                                    input[type='text'] {
                                        border: 1px solid #ddd;
                                        width: 100%;
                                        padding: 10px 7px;
                                        background: #f9f9f9;
                                    }
                                    input[type="submit"] {
                                        width: 100%;
                                        background-color: $second-color;
                                        color: #fff;
                                        cursor: pointer;
                                    }
                                    > * {
                                        height: 100%;
                                    }
                                    &.textarea {
                                        flex: 1;
                                    }
                                    &.submit {
                                        width: 60px;
                                    }
                                }
                            }
                        }
                    }
                    h5.title {
                        margin-bottom: 15px;
                    }
                    .comment {
                        &:not(:last-child) {
                            margin-bottom: 30px;
                        }
                        div.title {
                            display: flex;
                            gap: 12px;
                            margin-bottom: 15px;
                            .img {
                                @include circle(40px);
                                img {
                                    @include full;
                                    @include circle;
                                }
                            }
                            .info {
                                flex: 1;
                                display: flex;
                                flex-direction: column;
                                gap: 8px;
                                > .name {
                                    color: #444;
                                    display: flex;
                                    gap: 5px;
                                    .icon {
                                        color: $main-color;
                                    }
                                }
                                .date {
                                    color: #ccc;
                                    font-size: 12px;
                                }
                            }
                            &.spe {
                                .img {
                                    @include center;
                                    svg {
                                        transform: rotate(90deg);
                                    }
                                }
                                .info {
                                    > .text {
                                        font-size: 12px;
                                        line-height: 22px;
                                        color: #555;
                                        background: #f5f5f5;
                                        padding: 6px 8px;
                                        border-radius: 5px;
                                    }
                                    .options {
                                        display: flex;
                                        gap: 20px;
                                        .option {
                                            button {
                                                background-color: transparent;
                                                .icon {
                                                    svg {
                                                        font-size: 16px;
                                                    }
                                                }
                                                .text {
                                                    font-size: 12px;
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
        }
    }
}

</style>