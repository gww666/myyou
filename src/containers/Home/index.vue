<template>
    <transition name="slide"
        v-on:enter="enter"
        v-on:afterEnter="afterEnter">

            <div>
                <div class="header_container" ref="header">
                    <header class="header">
                        <img src="../../assets/index_title.png" alt="" class="title_img">
                        <router-link to="/location">
                            <span class="location">
                                {{location.cityName}}
                                <i class="iconfont icon-dingwei"></i>
                            </span>
                        </router-link>
                    </header>
                    <nav class="nav">
                        <p class="tab"  v-for="(item, index) in tabs">
                            <span ref="tab" 
                                @click="setTabsBorderStyle($event, index)" 
                                :class="{'activeBg' : activeBgIndex === index}"
                                :style="{'color' : activeColorIndex === index ? '#ff663d' : ''}">
                                {{item}}
                            </span>
                        </p>

                        <span class="tab_border" 
                                :style="{'left' : tabBorderTranslateX + 'px', 
                                    'width' : tabBorderWidth + 'px'}"
                        >
                        </span>
                    </nav>
                </div>
                <swiper ref="mySwiper" class="swiper_container" :options="swiperOption" :style="{'top': pageContainerTop}">
                    <!-- slides -->
                    <swiper-slide :class="{'swiper-no-swiping' : banner_is_touching}"><hot-page ></hot-page></swiper-slide>
                    <swiper-slide :class="{'swiper-no-swiping' : banner_is_touching}"><will-page></will-page></swiper-slide>
                    <swiper-slide :class="{'swiper-no-swiping' : banner_is_touching}">777777</swiper-slide>
                </swiper>

                <footer class="footer" :style="{'top': footerTop + 'px'}" ref="footer">
                    <footer-tabs></footer-tabs>
                </footer>
            </div>        

    </transition>
</template>

<script>
        // <carousel>
        //     <carousel-item>
        //         <hot-page :top="pageContainerTop"></hot-page>
        //     </carousel-item>
        //     <carousel-item>
        //         <will-page :top="pageContainerTop"></will-page>
        //     </carousel-item>
        // </carousel>
        
    const htmlFontSize = document.documentElement.style.fontSize.slice(0, -2);
    // const FOOTER_TOP = window.screen.height - 1.8 * htmlFontSize;
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import { Carousel, CarouselItem } from 'vue-l-carousel'
    import "./index.scss";
    import Hot from "./subpage/Hot";
    import Will from "./subpage/Will";
    import Tabs from "../../components/Tabs";
    import {mapState} from "vuex";
    
    export default {
        data () {
            return {
                tabBorderWidth : 0,
                tabs: ["热映电影", "即将上映", "热门活动"],
                tabBorderTranslateX : 0,
                activeBgIndex : -1,
                activeColorIndex : 0,
                pageContainerTop : "0px",
                swiperOption : {
                    noSwiping : true,
                    onSlideChangeEnd : (swiper) => {
                        // console.log(swiper.activeIndex);
                        // console.log(this);
                        this.setTabsBorderStyle(null, swiper.activeIndex);
                    }
                },
                boxShow : false,
                // footerTop: 0
            }
        },
        methods : {
            getTabsBorderWidth () {
                this.tabBorderWidth = this.$refs.tab[0].offsetWidth;
                this.tabBorderTranslateX = this.$refs.tab[0].offsetLeft;
            },
            setTabsBorderStyle (event, index) {
                if (event) {
                    this.tabBorderTranslateX = event.target.offsetLeft;
                    this.tabBorderWidth = event.target.offsetWidth;
                } else {
                    this.tabBorderTranslateX = this.$refs.tab[index].offsetLeft;
                    this.tabBorderWidth = this.$refs.tab[index].offsetWidth;
                }
                
                this.activeBgIndex = index;
                this.activeColorIndex = index;
                this.$refs.mySwiper.swiper.slideTo(index);
            },
            getFooterTop () {
                this.footerTop = this.$refs.footer.getBoundingClientRect().top;
            },
            //设置中间滚动部分的样式
            setPageContainerStyle () {
                this.pageContainerTop = this.$refs.header.offsetHeight + "px";
                // console.log(this.pageContainerTop);
            },
            enter : function (el, done) {
                this.boxShow = true;
            },
            afterEnter : function () {
                this.boxShow = false;
            }

        },
        computed : {
            ...mapState([
                "banner_is_touching",
            ]),
            ...mapState({
                location : state => {console.log(state); return state.location.location;}
            }),
            footerTop () {
                return window.screen.height - 1.8 * htmlFontSize;
            }

        },
        created () {
            setTimeout(() => {
                this.getTabsBorderWidth();
                this.setPageContainerStyle();
                // this.$refs.mySwiper.swiper.update();
                this.getFooterTop();
            }, 20);
        },
        components : {
            "hot-page" : Hot,
            "footer-tabs" : Tabs,
            'carousel': Carousel,
            'carousel-item': CarouselItem,
            "will-page": Will,
            swiper,
            "swiper-slide" : swiperSlide
        }
    }

</script>

<style lang="scss" scoped>
    .box {
        position: absolute;
        top: 0;
        // bottom: 1.8rem;
        left: 0;
        height: 516px;
        width: 100%;
    }
    .swiper_container {
        position: absolute;
        top: 0;
        bottom: 1.8rem;
        width: 100%;
    }
    .header_container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 2;
    }
.page_container {
    position: absolute;
    left: 0;
    bottom: 1.8rem;
    width: 100%;
    overflow: hidden;
}
.page_scroll {
    overflow-y: scroll;
}
.header {
    display : flex;
    justify-content: space-between;
    width: 100%;
    box-sizing : border-box;
    padding: 0.2rem 0.3rem 0 0.53rem;

    .title_img {
        width: 3.12rem;
        height: 1.26rem;
    }
}
    .location {
        font-size: 0.4rem;
        display: flex;
        align-items: center;
        height: 0.56rem;
        margin-top: 0.26rem;
        color: #737373;
        

        .iconfont {
            font-size: 0.56rem;
            color: #35adc6;
            margin-left: 0.15rem;
            
        }

    }

    //tab样式
    .nav {
        width: 100%;
        display: flex;
        color: #737373;
        // padding-bottom: 0.07rem;
        position: relative;
        
        .tab {
            height: 1.1rem;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.4rem;
            line-height: 1.1rem;

            span {
                // height: 100%;
                
            }
            .activeBg {
                // background: #f0f0f0;
                // transition: all 0.2s;
                animation: tabsBg 0.2s;
            }
        }

        .tab_border {
            background: #ff663d;
            height: 0.07rem;
            position: absolute;
            bottom: 0rem;
            transition: all 0.1s;
        }
    }
    .footer {
        position: absolute;
        // bottom: 0;
        left: 0;
        width: 100%;
        min-height: 1.8rem;
    }

    //tabs点击阴影效果
    @keyframes tabsBg {
        from {
            background: #fff;

        }
        to {
            background: #f8f8f8;
        }
    }

    //转场动画
    .slide-enter-active {
        animation: enter 0.8s;
    }
    .slide-leave-active {
        animation: leave 0.8s;
    }

    @keyframes leave {
        from {
            transform: translateX(0px);
        }
        to {
            transform: translateX(-100%);
        }
    }

    @keyframes enter {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0px);
        }
    }

</style>