<template>
    <div class="s_c_container">
        <m-header :title="'评论-' + filmName"></m-header>
        <div class="s_main">
            <div class="s_scroll">
                <div class="comment">
                    <img src="../../assets/iv_comments_icon.png" alt="" class="tx">
                    <div class="c_right">
                        <div class="c_r_title">
                            <p class="u_name">{{comment.name}}</p>
                            <img src="../../assets/iv_recommend.png" alt="" v-if="comment.isRecomend">
                        </div>
                        <div class="c_content">{{comment.content}}</div>
                        <div class="c_bottom">
                            <span>{{comment.date}}</span>
                            <div>
                                <p>{{comment.reply.length}}<img src="../../assets/iv_reply.png" alt=""></p>
                                <p>{{comment.like}}<img src="../../assets/iv_new_praise.png" alt=""></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="reply">
                </div>
            </div>
        </div>
        <div class="s_footer">

        </div>
    </div>
</template>

<script>
    // import "./index.scss";
    import Header from "../../components/Header";
    import {comments as commentAPI} from "../../api"; 
    import axios from "axios";
    export default {
        props : {
            
        },
        data () {
            return {
                comment : {

                }
            }
            
        },
        computed : {
            filmName () {
                return this.$route.params.filmName;
            },
            filmId () {
                return this.$route.params.filmId;
            }
        },
        methods : {
            getCommentData() {
                let url = commentAPI;
                axios.get(url, {
                    params : {
                        id : this.filmId
                    }
                }).then(data => {
                    // console.log(data);
                    if (data.status === 200) {
                        console.log(data.data);
                        for (let i = 0; i < data.data.length; i++) {
                            if (data.data[i].id == this.filmId) {
                                this.comment = data.data[i];
                                // console.log(111111111);
                                break;
                            }
                        }
                        console.log(this.comment);
                    }  
                }).catch(e => console.log(e));
            }
        },
        components : {
            "m-header" : Header
        },
        created () {
            this.getCommentData();
            console.log(this.$route.params.filmId);
        }
    }
</script>

<style lang="scss" scoped>
.s_c_container {
    background: #ebebeb;
}
.s_main {
    position: absolute;
    top: 1.5rem;
    left: 0;
    bottom: 1.85rem;
    overflow: hidden;
    background: rgb(235, 235, 235);
    width: 100%;
}
.comment {
    font-size: 0.4rem;
    display: flex;
    
    padding: 0 0.3rem;
    padding-top: 0.53rem;
    background: #fff;


    .tx {
        width: 1.56rem;
        height: 1.56rem;
    }
}
.c_title {
    margin-bottom: 0.32rem;
}
.c_right {
    flex: 1;
    margin-left: 0.35rem;
    padding-bottom: 0.53rem;
    border-bottom: 1px dashed #f0f0f0;
}
.c_r_title {
    display: flex;
    justify-content: space-between;
    font-size: 0.42rem;
    align-items: center;

    img {
        height: 0.78rem;
        
    }
}

.c_content {
    line-height: 0.6rem;
    margin-top: 0.33rem;
    margin-bottom: 0.45rem;
}

.c_bottom {
    display: flex;
    justify-content: space-between;
    color: #8f8f8f;

    >div {
        display: flex;
        >p:nth-of-type(1) {
            margin-right: 0.35rem;
        }
        >p {
            display: flex;
            align-items: center;

            img {
                height: 0.58rem;
                margin-left: 0.1rem;
            }
        }
    }
}
.reply {
    background: #ebebeb;
    position: relative;
}

.s_footer {
    background: #fff;
    height: 1.85rem;
    position: absolute;
    bottom: 0;
    left: 0;
}
</style>