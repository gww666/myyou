<template>

    <div class="d_container" >
        <!-- 头部栏 -->
        <div class="d_header" ref="d_header" >
            <div class="h_left" ref="h_left">
                <img :src="backImgUrl" alt="" class="h_back" ref="h_back">
                <span v-show="headerIsActive" class="h_l_title" ref="h_l_title">{{film.name}}</span>
            </div>
            <div class="h_right">
                <div class="h_yugao">
                    <img :src="yugaoImgUrl" alt="">
                    <span v-if="!headerIsActive">预告片</span>
                </div>
                <div>
                    <img :src="juzhaoImgUrl" alt="">
                    <span v-if="!headerIsActive">剧照</span>
                </div>
            </div>
            <div class="h_bg" ref="h_bg"></div>
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
                <div class="i_name_container" ref="i_name_container">
                    <p class="i_name" ref="i_name" style="transform:translate(0px, 0px)">{{film.name}}</p>
                </div>
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
                    <dt><img :src="'/src/assets/actors' + getActorsImg(index)" alt=""></dt>
                    <dd>{{item.name}}</dd>
                    <dd>凯德·伊格尔dfsdfgvdgvfdgvfdgvbf</dd>
                </dl>
            </div>
        </div>

        <!-- 影讯 -->
        <div class="zixun">
            <p class="zixun_title"><img src="../../assets/movie_name_img.png" alt="">影讯</p>
            <img :src="zixunUrl" alt="" class="zixun_img">
            <p class="zixun_bottom">【变5】观影前攻略我都做好了！你还不点开？！</p>
        </div>

        <!-- 电影周边 -->
        <div class="goods">

        </div>

        <!-- 评论 -->
        <div class="comments">
            <p class="c_title zixun_title"><img src="../../assets/movie_name_img.png" alt="">评论</p>
            <div v-for="(item, index) in commentsList" 
                :key="index">
                <router-link tag="div" class="commentsItem" :to="'/showcomments/' + item.id + '/' + film.name" >
                    <img src="../../assets/iv_comments_icon.png" alt="" class="tx">
                    <div class="c_right">
                        <div class="c_r_title">
                            <p class="u_name">{{item.name}}</p>
                            <img src="../../assets/iv_recommend.png" alt="" v-if="item.isRecomend">
                        </div>
                        <div class="c_content">{{item.content}}</div>
                        <div class="c_bottom">
                            <span>{{item.date}}</span>
                            <div>
                                <p>{{item.reply.length}}<img src="../../assets/iv_reply.png" alt=""></p>
                                <p>{{item.like}}<img src="../../assets/iv_new_praise.png" alt=""></p>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <footer class="footer">
            <div class="f_img">
                <img src="../../assets/iv_publish_comment.png" alt="">
                <img src="../../assets/iv_movie_praise.png" alt="" class="dianzan">
                <img src="../../assets/share.png" alt="">
            </div>
            <div class="buy">
                立即购票
                <border-bottom class="buy_border" height="0.2rem" backgroundSize="0.35rem"></border-bottom>
            </div>
        </footer>



    </div>

</template>

<script>
    import {film as filmAPI, comments as commentsAPI} from "../../api";
    import axios from "axios";
    // import "./index.scss";
    import {getStyle} from "../../utils/Utils";
    import BorderBottom from "../../components/BorderBottom";

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
                scrollY: -1,
                headerIsActive: false,
                commentsList: []
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
            },
            getCommentsData () {
                axios.get(commentsAPI)
                .then(data => {
                    // console.log(data);
                    if (data.status === 200) {
                        this.commentsList = data.data;
                    }
                })
                .catch(e => console.log(e));
            },
            setINameStyle () {
                this.$refs.i_name.style.left = this.DIFilmNameLeft + "px";
                this.$refs.i_name.style.top = this.DIFilmNameTop + "px";
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
            },
            //根据headerIsActive的值，显示不同的back图片
            backImgUrl () {
                return this.headerIsActive ? "/src/assets/iv_back_blue.png" : "/src/assets/iv_back.png";
            },
            //根据headerIsActive的值，显示不同的预告图片
            yugaoImgUrl () {
                return this.headerIsActive ? "/src/assets/iv_movie_prevue_b.png" : "/src/assets/iv_movie_prevue.png";
            },
            //根据headerIsActive的值，显示不同的剧照图片
            juzhaoImgUrl () {
                return this.headerIsActive ? "/src/assets/iv_movie_photos_b.png" : "/src/assets/iv_movie_photos.png";
            },
            //header部分的title距离页面左边的距离
            DHFilmNameLeft () {
                // console.log(this.$refs.h_l_title);
                let h_left_left = this.$refs.h_left.getBoundingClientRect().left;
                let backImgWidth = this.$refs.h_back.offsetWidth;
                let nameMarginLeft = 0.2 * FONT_SIZE;
                // return this.$refs.h_l_title.getBoundingClientRect().left;
                return h_left_left + backImgWidth ;
            },
            DHFilmNameTop () {
                return this.$refs.h_back.offsetTop;
            },
            //intro部分的title距离页面左边的距离
            DIFilmNameLeft () {
                return this.$refs.i_name_container.getBoundingClientRect().left;
            },
            DIFilmNameTop () {
                return this.$refs.i_name_container.getBoundingClientRect().top
            }
        },
        watch : {
            scrollY (newY, oldY) {
                // console.log("oldY", oldT);
                // console.log("newY", newT);

                // console.log("fffffffffff",document.defaultView.getComputedStyle(document.getElementsByClassName('i_name')[0], null)["transfrom"]);
                // document..getComputedStyle(document.getElementById('box')
                let dis = newY - oldY;
                if (dis > 0) {
                    //向下滑动（上拉）
                    let top = getStyle(this.$refs.img_cover, "top") - 0;
                    // console.log(getStyle(this.$refs.img_cover, "top"));
                    this.$refs.img_cover.style.top = (top + dis / 2) + "px";

                    //header的opacity动画
                    //判断当片名栏触及到header底部时，进行动画
                    if (this.$refs.d_intro.getBoundingClientRect().top < this.DHeaderHeight) {
                        // console.log("片名栏触及到header底部");
                        let unit = 1 / this.DIntroHeight;
                        unit = (dis * unit);
                        let opacity = getStyle(this.$refs.h_bg, "opacity") - 0;
                        // console.log();
                        this.$refs.h_bg.style.opacity = opacity + unit;
                        if (this.$refs.d_intro.getBoundingClientRect().top + this.DIntroHeight < this.DHeaderHeight) {
                            // console.log("该结束动画了");
                            this.$refs.h_bg.style.opacity = 1;
                            //把header部分样式换掉
                            this.headerIsActive = true;
                        }

                    }

                    //片名动画
                    // console.log(this.$refs.i_name.getBoundingClientRect().top);
                    let n_btop = this.$refs.i_name.getBoundingClientRect().top;
                    let currentY = parseInt(getStyle(this.$refs.i_name, "top"));
                    let currentX = parseInt(getStyle(this.$refs.i_name, "left"));
                    this.$refs.i_name.style = `left: ${currentX}px; top: ${currentY - dis}px`;
                    let scaleDis = 0.5;
                    if (n_btop <= this.DHeaderHeight) {
                        //y运动距离：DIntroHeight的值
                        //x运动距离: DHFilmNameLeft - DIFilmNameLeft
                        //运动结束位置：DHFilmNameLeft
                        
                        // let currentLeft = this.$refs.i_name.getBoundingClientRect().left;
                        // console.log(currentX);
                        // let unit = scaleDis / this.DHeaderHeight;
                        // unit = dis * scaleDis;

                        if (currentY <= this.DHFilmNameTop) {
                            //不再进行动画
                            this.$refs.i_name.style.top = `${this.DHFilmNameTop}px`;
                        } else {
                            this.$refs.i_name.style = `left: ${dis + currentX}px; top: ${-(dis - currentY)}px`;
                        }
                    }
                    // this.$refs.i_name.style.
                    

                } else if (dis < 0) {
                    //向上滑动(下拉)
                    let top = getStyle(this.$refs.img_cover, "top") - 0;
                    this.$refs.img_cover.style.top = (top + dis / 2) + "px";
                    
                    // console.log(this.DIntroHeight);
                    //header的opacity动画
                    //当header的底部和片名栏底部重合时停止动画
                    if (this.$refs.d_intro.getBoundingClientRect().top < this.DHeaderHeight && this.$refs.d_intro.getBoundingClientRect().top + this.DIntroHeight >= this.DHeaderHeight) {
                        
                        let unit = 1 / this.DIntroHeight;
                        unit = (dis * unit);
                        let opacity = getStyle(this.$refs.h_bg, "opacity") - 0;
                        // console.log();
                        this.$refs.h_bg.style.opacity = opacity + unit;
                        this.headerIsActive = false;
                        
                    }

                    //片名动画 
                    let n_btop = this.$refs.i_name_container.getBoundingClientRect().top + 0.5 * FONT_SIZE + this.$refs.i_name_container.offsetHeight;
                    // console.log(n_btop);
                    let currentY = parseInt(getStyle(this.$refs.i_name, "top"));
                    let currentX = parseInt(getStyle(this.$refs.i_name, "left"));
                    if (n_btop >= this.DHeaderHeight && this.$refs.d_intro.getBoundingClientRect().top + this.DIntroHeight >= this.DHeaderHeight) {

                        //当剧照栏底部与
                        if (currentX <= this.DIFilmNameLeft) {
                            //不再进行X动画
                            this.$refs.i_name.style.left = `${this.DIFilmNameLeft}px`;
                            if (currentY >= this.DIFilmNameTop) {
                                this.$refs.i_name.style.top = `${this.DIFilmNameTop}px`;
                            } else {
                                this.$refs.i_name.style.top = `${-(dis - currentY)}px`;
                            }
                        } else {
                            this.$refs.i_name.style = `left: ${currentX + dis}px; top: ${currentY - dis}px`;
                        }

                        
                    }
                    
                }
                //当滑动到顶部时，header的opacity置为0
                if (newY === 0) {
                    this.$refs.h_bg.style.opacity = 0;
                    this.$refs.i_name.style = `left: ${this.DIFilmNameLeft}px; top: ${this.DIFilmNameTop}px`;
                }
                if (this.$refs.d_intro.getBoundingClientRect().top + this.DIntroHeight < this.DHeaderHeight) {
                    this.$refs.i_name.style = `left: ${this.DHFilmNameLeft}px; top: ${this.DHFilmNameTop}px`;
                }
                // console.log(this.DHeaderHeight);

                

            }
        },
        components : {
            "border-bottom" : BorderBottom
        },
        created () {
            //定义一些私有的常量
            this.translateReg = /translate\((.+)px, (.+)px\)/;
            this.getFilmData();
            this.getCommentsData();
            this.addScrollEventListener();

            setTimeout(() => {
               this.setINameStyle();
            }, 20);
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
        opacity: 0;
        z-index: -1;
        border-bottom: 1px solid #bbb;
    }
    .h_back {
        height: 0.7rem;
    }
    
}
.h_left {
    display: flex;
    align-items: center;

    .h_l_title {
        font-size: 0.5rem;
        margin-left: 0.2rem;
        color: #444;

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
.h_yugao {
    margin-right: 1rem;
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
        border-radius: 10px;
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
    padding: 0 0.35rem;
    width: 100%;
    margin-top: 0.8rem;
}
.zixun_title {
    display: flex;
    align-items: center;
    font-size: 0.52rem;


    img {
        height: 0.6rem;
        margin-right: 0.17rem;
    }
}
.zixun_img {
    width: 100%;
    margin-top: 0.45rem;
}
.zixun_bottom {
    height: 1.15rem;
    background: #e0e0e0;
    color: #595959;
    font-size: 0.4rem;
    display: flex;
    align-items: center;
    padding: 0 0.32rem;
}
//演员
.actors {
    font-size: 0.4rem;
    
    padding: 0 0.4rem;
    overflow: hidden;
    width: 100%;
    margin-top: 0.85rem;

    dl {
        margin: 0 0.23rem;
        text-align: center;
        width: 2.4rem;


        dd {
            width: 100%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    img {
        width: 2.4rem;
        height: 2.4rem;
    }
}
.actors_scroll {
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
}
.i_name {
    font-size: 0.73rem;
    position: fixed;
    line-height: 0.73rem;
}
.i_name_container {
     margin-top: 0.5rem;
     margin-bottom: 0.65rem;
     height: 0.73rem;
}
.i_else {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    
    >div {
        display: flex;
        >span {
            margin-right: 0.15rem;
            border: 1px solid #fff;
            border-radius: 10px;
            padding: 0.12rem 0.1rem;
            font-size: 0.3rem;
        }
    }

    >span {
        font-size: 0.53rem;
        color: #e57300;
        font-weight: bold;
    }
}
.i_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #000;
    opacity: 0.3;
    box-shadow: 0 -20px 20px #000;
}

//评论
.comments {
    padding: 0 0.35rem;
    font-size: 0.4rem;
    margin-top: 0.45rem;
    width: 100%;
    margin-bottom: 1.65rem;
}
.commentsItem {
    display: flex;
    padding-top: 0.53rem;


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

.footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1.65rem;
    font-size: 0.56rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-top: 1px solid #e0e0e0;


}
.f_img {
    display: flex;
    img {
        height: 0.83rem;
        padding: 0 0.47rem;
    }

    .dianzan {
        border: 1px dashed #f0f0f0 {
            width: 0 1px;
        }

    }
    
}
.buy {
    background: #ff6640;
    width: 3.47rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
}

.buy_border {
    // opacity: 0.5;
    transform: rotate(90deg) translateY(1.65rem) translateX(0.15rem);
    transform-origin: right;
    width: 1.65rem !important;
    
}


    
</style>