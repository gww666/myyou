<template>

    <div class="d_container" >
        <!-- 头部栏 -->
        <div class="d_header" ref="d_header">
            <img src="../../assets/iv_back.png" alt="" class="h_back">
            <div class="h_right">
                <div>
                    <img src="../../assets/iv_movie_prevue.png" alt="">
                    <span>预告片</span>
                </div>
                <div>
                    <img src="../../assets/iv_movie_photos.png" alt="">
                    <span>剧照</span>
                </div>
            </div>
            <div class="h_bg"></div>
        </div>

        <div class="h_container">
            <!-- 剧照 -->
            <div class="img_cover" 
                :style="{'width' : screen_width + 'px'}" 
                ref="img_cover">
                <img :src="coverUrl" alt="" @load="handleCoverUrl">
            </div>
            <!-- 片名 -->
            <div class="d_intro" ref="d_intro">
                <p class="i_name">{{film.name}}</p>
                <div class="i_else">
                    <div>
                        <span>{{film.category | category}}</span>
                        <span>2小时30分</span>
                        <span>{{film.nation}}</span>
                    </div>
                    <span>8.3</span>
                </div>
                <div class="i_bg"></div>
            </div>
        </div>
        

        <!-- 内容介绍 -->
        <div class="content">
            <p class="c_box">
                <span>
                    {{film.synopsis}}
                </span>
            </p>
        </div>

        <!-- 演员 -->
        <div class="actors">
            <div class="actors_scroll">
                <dl v-for="(item, index) in film.actors">
                    <dt><img src="../../assets/actors1.png" alt=""></dt>
                    <dd>{{item.name}}</dd>
                    <dd>凯德·伊格尔dfsdfgvdgvfdgvfdgvbf</dd>
                </dl>
            </div>
        </div>

        <!-- 影讯 -->
        <div class="zixun" :style="{'width' : screen_width + 'px'}">
            <p class="zixun_title"><img src="../../assets/movie_name_img.png" alt="">影讯</p>
            <img :src="zixunUrl" alt="" class="zixun_img">
            <p class="zixun_bottom">【变5】观影前攻略我都做好了！你还不点开？！</p>
        </div>

        <!-- 电影周边 -->
        <div class="goods">

        </div>

        <!-- 评论 -->
        <div class="comments">
            <p class="c_title"><img src="../../assets/movie_name_img.png" alt="">评论</p>
            <div v-for="">
                <img src="../../assets/iv_comments_icon.png" alt="">
                <div class="c_right">
                    <div>
                        <p class="u_name">手机用户5102</p>
                        <img src="../../assets/iv_recommend.png" alt="" v-if="is_recommend">
                    </div>
                    <div class="c_content">{{}}</div>
                    <div class="c_bottom">
                        <span></span>
                        <div>
                            <p>{{}}<img src="../../assets/iv_reply.png" alt=""></p>
                            <p>{{}}<img src="../../assets/iv_new_praise.png" alt=""></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <div>
                <img src="" alt="">
                <img src="" alt="">
                <img src="" alt="">
            </div>
            <div>
                立即购票
            </div>
        </footer>



    </div>

</template>

<script>
    import {film as filmAPI} from "../../api";
    import axios from "axios";
    import "./index.scss";
    import {getStyle} from "../../utils/Utils";

    const FONT_SIZE = document.documentElement.style.fontSize.slice(0, -2);
    const SCREEN_WIDTH = window.screen.width; 

    export default {
        props : {

        },
        data () {
            return {
                film : {},
                is_recommend: true,
                touchPos: [],
                scrollY: -1
            }
        },
        filters : {
            category (val) {
                if (val) {
                    return val.split("|").join("、");
                }
                
            },
            actorsImg(index) {
                // return index % 4 + '.png';
            }
        },
        methods : {
            getFilmData () {
                let url = filmAPI + "/" + this.$route.params.id;
                axios.get(url)
                .then(data => {
                    // console.log(data);
                    if (data.status === 200) {
                        // console.log(data);
                        this.film = data.data.data.film;
                        console.log(this.film);
                    }
                    
                })
                .catch(e => console.log(e));
            },
            getActorsImg (index) {
                return index % 4 + '.png';
            },
            handleCoverUrl (event) {
                let img = event.path[0];
                let width = img.offsetWidth;
                let ml = (width - this.screen_width) / 2;
                img.style.marginLeft = -ml + "px";
                // console.log(event.path[0].offsetHeight);
                // console.log(event.path[0].offsetWidth); 
            },
            addScrollEventListener () {
                this.scrollEvent = (event) => {
                    // console.log(event);
                    this.scrollY = document.body.scrollTop;
                    // console.log(document.body.scrollTop);
                    // this.touchPos = [];
                    // this.touchPos.push(event.touches[0].pageX);
                    // this.touchPos.push(event.touches[0].pageY);
                    
                    // this.scrollY = event.touches[0].pageY;

                }
                window.addEventListener("scroll", this.scrollEvent, false);
            }
        },
        computed : {
            screen_width () {
                return window.screen.width;
            },
            coverUrl () {
                if (this.film.cover) {
                    return this.film.cover.origin;
                }
            },
            zixunUrl () {
                if (this.film.photos && this.film.photos.length > 0) {
                    return this.film.photos[0].bigPictureAddress;
                }
            },
            //头部高度
            DHeaderHeight () {
                return this.$refs.d_header.offsetHeight;
            },
            //片名栏高度
            DIntroHeight () {
                return this.$refs.d_intro.offsetHeight;
            }
            
        },
        watch : {
            scrollY (newY, oldY) {
                // console.log("oldY", oldT);
                // console.log("newY", newT);
                let dis = newY - oldY;
                if (dis > 0) {
                    //向下滑动
                    let top = getStyle(this.$refs.img_cover, "top") - 0;
                    // console.log(getStyle(this.$refs.img_cover, "top"));

                    this.$refs.img_cover.style.top = (top + dis / 2) + "px";
                    console.log(this.$refs.d_intro.getBoundingClientRect().top);
                } else if (dis < 0) {
                    //向上滑动
                    let top = getStyle(this.$refs.img_cover, "top") - 0;
                    this.$refs.img_cover.style.top = (top + dis / 2) + "px";
                    //判断当片名栏触及到header底部时，进行动画
                    // console.log(this.DIntroHeight);
                    
                    // if (this.$refs.d_intro.getBoundingClientRect().top)
                    
                }
                // console.log(this.DHeaderHeight);

            }
        },
        created () {
            this.getFilmData();
             this.addScrollEventListener();
            setTimeout(() => {
               
            }, 1000);
        },
    } 
    
</script>
<style lang="scss" scoped>
    .d_container {
        width: 100%;
        overflow: hidden;
    }
    img {
        display: block;
    }
* {
    box-sizing: border-box;
}
.d_header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    // padding: 0.47rem 0.5rem;
    height: 1.5rem;
    align-items: center;
    padding: 0 0.5rem;
    font-size: 0.4rem;
    color: #fff;
    z-index: 2;

    .h_bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        opacity: 0.2;
    }
    .h_back {
        height: 0.7rem;
    }
    
}
.h_right {
    display: flex;
    align-items: center;

    >div {
        display: flex;
        align-items: center;
    }

    img {
        height: 0.7rem;
    }
}

.img_cover {
    overflow: hidden;
    // width: 100%;
    height: 9.13rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    img {
        height: 13rem;
        // width: 100%;
    }
}

.h_container {
    position: relative;
    height: 9.13rem;
    overflow: hidden;


    .d_intro {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 0.35rem;
        width: 100%;
        height: 3.4rem;
        color: #fff;
        padding: 0 0.35rem;
    }
}

.content {
    width: 100%;
    padding: 0 0.35rem;
    box-sizing: border-box;
    margin-top: 0.53rem;


    p {
        font-size: 0.4rem;
        border: 1px solid #b4b4b4;
        border-radius: 20px;
        padding: 0.25rem;

        span {
            //三行省略
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        
    }
}



.zixun {
    overflow: hidden;
}
.zixun_img {
    width: 100%;
}
    
</style>