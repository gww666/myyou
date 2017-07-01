<template>

        <div class="hot_container" :style="{top}">
            
            <scroll class="scroll"
                :list="filmList"
                @mscroll="handleMScroll"
                @mscrollEnd="handleMScrollEnd"
                @mscrollStart="handleMScrollStart"
                :probeType="probeType"
                :listenScroll="true"
                :listenScrollEnd="true"
                :listenScrollStart="true"
                ref="scroll"
                :class="{'scroll_refreshing': loadingRefreshActive, 'scroll_refreshed': !isRefreshing}" 
            >
                <div ref="scrollContainer" :class="{'scrollContainer' : test}">
                    <div class="loading_refresh" ref="loadingRefresh">
                        <div class="refresh_container">
                            <img src="../../../assets/loading.png" alt="">
                            <span class="refresh_icon" ref="refresh_icon"></span>
                        </div>
                    </div>
                    <banner :list="bannerList"></banner>
                    <div class="list_container">
                        <film-list :list="filmList"></film-list>
                    </div>
                </div>

                <!-- 加载更多提示框 -->
                
            </scroll>
        </div>
</template>

<script>
    // <mt-loadmore ref="loadmore" :bottom-all-loaded="false" class="loadmore_container">
    import Banner from "../../../components/Banner";
    import List from "../../../components/List";
    import {hotBanner, hotList} from "../../../api/index.js";
    import axios from "axios";
    import { Loadmore } from 'mint-ui';
    import Scroll from "../../../components/Scroll/Scroll";
    // import {mapState} from "vuex";

    const htmlFontSize = document.documentElement.style.fontSize.slice(0, -2);
    const PROTECT_TIME = 8 * 1000;
    // let LoadingRefreshHeight = 2 * htmlFontSize;
    

    export default {
        props : {
            top : {
                type : String,
                default : "0"
            }
        },
        data () {
            return {
                bannerList : [],
                filmList : [],
                page : 1,
                count : 10,
                hasMore : true,
                scrollY : 0,
                isRefreshing: false,
                test : false,
                scrollEnd: false,
                loadingRefreshActive: false,
                scrollChecked: false,
                pauseY: 0,
                isProtected: false
            }
        },
        created () {
            // console.log(indexBanner);
            this.probeType = 3;
            this.getBannerData();
            this.getListData();
            
            //涉及到dom操作的注意17ms延迟问题
            setTimeout(() => {
                //设置loading圈圈的left值
                this.setLoadingIconPosition();
            }, 20);
            
        },
        methods : {
            //获取热映电影banner数据
            getBannerData () {
                let url = hotBanner;
                // console.log(11111111111);
                axios.get(url)
                    .then(data => {
                        // console.log(data);
                        if (data.status === 200) {
                            // console.log(data);
                            this.bannerList = data.data.data.billboards;
                        }
                    })
                    .catch(error => console.log(error));
            },
            //获取热映电影列表数据
            getListData (callback) {
                axios.get(hotList, {
                    params : {
                        page : this.page,
                        count : this.count
                    }
                })
                .then(data => {
                    console.log(data);
                    if (data.status === 200) {
                        this.filmList = data.data.data.films;
                        //判断有无更多数据
                        let total = data.data.data.page.total;
                        let current = data.data.data.page.current;
                        this.hasMore = current === total ? false : true;
                        if (callback) {
                            callback();
                        }
                    }
                    
                })
                .catch(error => console.log(error));
            },
            handleMScroll (pos) {
                // console.log(pos.y);
                if (this.scrollEnd && !this.scrollChecked && pos.y >= this.LoadingRefreshHeight && !this.isProtected) {
                // if (this.scrollEnd && !this.scrollChecked) {
                    if (!this.isRefreshing) {
                        this.isRefreshing = true;
                        this.isProtected = true;
                        console.log("进行下拉刷新操作");
                            this.page = 1;
                            let callback = () => {
                                this.isRefreshing = false;
                                this.scrollEnd = false;
                                this.scrollChecked = false;
                                this.$refs.scrollContainer.style.transform = `translate(0px, 0px) translateZ(0px)`;
                                this.$refs.scrollContainer.style.transition = `transform 0.4s`;
                                console.log("下拉刷新操作完成");
                                setTimeout(() => {
                                    this.isProtected = false;
                                    console.log("保护解除");
                                }, PROTECT_TIME)
                            }
                            this.getListData(callback);
                        // }, 2000);
                    }
                    this.$refs.scrollContainer.style.transform = `translate(0px, ${this.LoadingRefreshHeight}px) translateZ(0px)`;
                    // this.pauseY = pos.y;
                    // this.$refs.scroll.$el.style.top = pos.y + "px";
                    // this.scrollChecked = true;
                    // this.scrollEnd = false;

                }
                this.scrollY = pos.y;
                //判断当pos.y偏移量大于loadingHeight时才触发刷新操作

            },
            handleMScrollEnd (pos) {
                // console.log(pos.y);
                // if (pos.y > )
                // console.log("滑动结束");
                this.scrollEnd = true;
            },
            handleMScrollStart (pos) {
                console.log("start");
                // this.$refs.scrollContainer.style.transform = `translate(0px, ${this.pauseY}px) translateZ(0px)`;
            },
            //固定loading圈圈位置
            setLoadingIconPosition () {
                //获取父容器的宽度
                let c_width = htmlFontSize * 1.16;
                //获取圈圈宽度
                let q_width = htmlFontSize * 0.45;
                //计算left值
                let q_left = (c_width - q_width) / 2;
                //给圈圈设置left
                // this.$refs.refresh_icon.style.left = q_left + "px";
                this.$refs.refresh_icon.style.left = "0.23rem";
            },
            //处理上拉加载更多事件
            handlePullToLoadMore () {
                this.page = this.page + 1;

            }
        },
        computed : {
            // ...mapState({
            //     bannerLoaded : state => state.hotBannerLoaded
            // })
            LoadingRefreshHeight () {
                // let htmlFontSize = document.documentElement.style.fontSize.slice(0, -2);
                return 2 * htmlFontSize;
            }
        },
        watch : {
            scrollY () {

            }
        },
        components : {
            "banner" : Banner,
            "film-list" : List,
            "mt-loadmore" : Loadmore,
            "scroll" : Scroll
        }
    }
</script>

<style lang="scss" scoped>
    .test {
        transfrom: translate(0px 50px) translateZ(0px) !important;
    }
    .list_container {
        padding: 0 0.34rem;
        box-sizing: border-box;
    }
    .hot_container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 1.8rem;
        width: 100%;
        overflow: hidden;
        // height: 100%;
    }
    .loadmore_container {
        // position: absolute;
        // top: 0;
        // left: 0;
        // bottom: 1.8rem;
        width: 100%;
        height: 100%;
    }
    .scroll {
        position: absolute;
        // bottom: 0;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        // overflow: hidden;
    }
    .scroll_refreshing {
        // top: 50px;
    }
    .scroll_refreshed {
        top: 0;
        transition: top 0.4s;
    }

    .loading_refresh {
        display : flex;
        position: absolute;
        top: -2rem;
        left: 0;
        justify-content: center;
        display: flex;
        justify-content: center;
        width: 100%;

        // margin-bottom: 0.3rem;
    }
    .refresh_container {
        width: 1.16rem;
        height: 1.7rem;
        position: relative;
        // display: flex;
        // justify-content: center;


        img {
            width: 100%;
            height: 100%;
        }
        .refresh_icon {
            // width: 100%;
            position: absolute;
            display: block;
            height: 0.45rem;
            width: 0.45rem;
            border: 0.1rem solid #fff;
            border-radius: 50%;
            // left: (50% - 0.3rem);
            // left: 0;
            // right: 50%;
            // margin-top: 0.37rem;
            top: 0.38rem;
            border-top-color: #4cbdd1;
            // border-left: 0;
            // border-top-left-radius:none;
            // border-bottom-right-radius:50%;
            // border-bottom-right-radius:50%;
            animation: icon-anim 0.6s infinite;
        }
    }

    @keyframes icon-anim {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>