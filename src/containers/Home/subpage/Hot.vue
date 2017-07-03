<template>

        <div class="hot_container" :style="{top}">
            
            <scroll class="scroll"
                :list="filmList"
                @mscroll="handleMScroll"
                @mtouchend="handleMTouchend"
                @mscrollStart="handleMScrollStart"
                @mscrollEnd="handleMScrollEnd"
                :probeType="probeType"
                :listenScroll="true"
                :listenTouchend="true"
                :listenScrollStart="true"
                :listenScrollEnd="true"
                ref="scroll"
            >
                <div ref="scrollContainer" :class="{'scrollContainer' : test}">
                    <refreshing
                        :scrollEnd="scrollEnd"
                        :scrollChecked="scrollChecked"
                        :isRefreshing="isRefreshing"
                        :isProtected="isProtected"
                        :getFirstListData="getFirstListData"
                        :scrollY="scrollY"
                    >
                    </refreshing>
                    <banner :list="bannerList"></banner>
                    <div class="list_container">
                        <film-list :list="filmList"></film-list>
                    </div>
                    <!-- 加载更多提示框 -->
                    <div class="loadmore_cintainer" ref="loading_more">
                        <loading  
                            :hasMore="hasMore" 
                            :getMoreListData="getMoreListData"
                            :isLoadMoreing="isLoadMoreing"
                            :scrollY="scrollY"
                            >
                        </loading>
                    </div>
                </div>
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
    import Loading from "../../../components/Loading";
    import Refreshing from "../../../components/Refreshing";
    // import {mapState} from "vuex";

    const htmlFontSize = document.documentElement.style.fontSize.slice(0, -2);
    const PROTECT_TIME = 8 * 1000;
    const SCREEN_HEIGHT = window.screen.height;
    const TABS_HEIGHT = htmlFontSize * 1.8;
    const LoadingRefreshHeight = 2 * htmlFontSize;
    

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
                page : 0,
                count : 10,
                hasMore : true,
                scrollY : 0,
                isRefreshing: false,
                test : false,
                scrollEnd: false,
                loadingRefreshActive: false,
                scrollChecked: false,
                pauseY: 0,
                isProtected: false,
                loadingMoreVisible: false,
                isLoadMoreing: false,
                
            }
        },
        created () {
            // console.log(indexBanner);
            this.probeType = 3;
            this.getBannerData();
            this.getMoreListData();
            
            //涉及到dom操作的注意17ms延迟问题
            setTimeout(() => {

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
            //获取更多热映电影列表数据
            getMoreListData () {
                this.page = this.page + 1;
                this.isLoadMoreing = true;
                setTimeout(() => {
                    axios.get(hotList, {
                        params : {
                            page : this.page,
                            count : this.count
                        }
                    })
                    .then(data => {
                        console.log(data);
                        if (data.status === 200) {
                            //判断有无更多数据
                            let total = data.data.data.page.total;
                            let current = data.data.data.page.current;
                            this.hasMore = current === total ? false : true;
                            //拼接数组
                            this.filmList = this.filmList.concat(data.data.data.films);
                            this.isLoadMoreing = false;
                            // if (callback) {
                            //     callback(data.data.data);
                            // } else {
                            //     this.filmList = data.data.data.films;
                            // }
                            
                            // if (callback) {
                            //     callback();
                            // }
                        }
                        
                    })
                    .catch(error => console.log(error));
                }, 1000);   
            },
            //获取首屏数据
            getFirstListData () {
                this.page = 1;
                this.isRefreshing = true;
                this.isProtected = true;
                this.scrollChecked = true;
                this.$refs.scrollContainer.style.transform = `translate(0px, ${LoadingRefreshHeight}px) translateZ(0px)`;
                console.log("正在下拉刷新");
                // setTimeout(() => {
                //     axios.get(hotList, {
                //         params : {
                //             page : this.page,
                //             count : this.count
                //         }
                //     })
                //     .then(data => {
                //         console.log(data);
                //         if (data.status === 200) {
                //             //判断有无更多数据
                //             let total = data.data.data.page.total;
                //             let current = data.data.data.page.current;
                //             this.hasMore = current === total ? false : true;
                //             //拼接数组
                //             this.filmList = data.data.data.films;
                //             this.isRefreshing = false;
                //             this.scrollEnd = false;
                //             this.scrollChecked = false;
                //             this.$refs.scrollContainer.style.transform = `translate(0px, 0px) translateZ(0px)`;
                //             this.$refs.scrollContainer.style.transition = `transform 0.4s`;
                //             console.log("下拉刷新操作完成");
                //             setTimeout(() => {
                //                 this.isProtected = false;
                //                 console.log("保护解除，可以请求数据");
                //             }, PROTECT_TIME);
                //         }
                        
                //     })
                //     .catch(error => console.log(error));
                // }, 1000);
            },
            handleMScroll (pos) {
                this.scrollY = pos.y;
                if (!this.scrollChecked && this.scrollEnd) {
                    this.scrollChecked = true;
                    this.scrollEnd = false;
                    this.$refs.scrollContainer.style.transform = `translate(0px, ${this.LoadingRefreshHeight}px) translateZ(0px)`;
                }
                // ------判断是否执行下拉刷新------
                // scrollEnd：手指是否离开屏幕
                // scrollChecked：一旦进入判断，该次操作只执行一次，在请求结束后重置为false
                // pos.y >= this.LoadingRefreshHeight：设立一个临界值，只有当下拉距离大于这个数值才会触发刷新操作
                // isProtected：刷新保护，一段时间内重复下拉不会刷新，保护时间由---常量PROTECT_TIME---决定
                // if (this.scrollEnd && !this.scrollChecked && pos.y >= this.LoadingRefreshHeight && !this.isProtected) {
                //     if (!this.isRefreshing) {
                //         this.isRefreshing = true;
                //         this.isProtected = true;
                //         console.log("进行下拉刷新操作");
                //             this.page = 1;
                //             let callback = (data) => {
                //                 this.isRefreshing = false;
                //                 this.scrollEnd = false;
                //                 this.scrollChecked = false;
                //                 this.$refs.scrollContainer.style.transform = `translate(0px, 0px) translateZ(0px)`;
                //                 this.$refs.scrollContainer.style.transition = `transform 0.4s`;
                //                 this.filmList = data.films;
                //                 console.log("下拉刷新操作完成");
                //                 setTimeout(() => {
                //                     this.isProtected = false;
                //                     console.log("保护解除，可以请求数据");
                //                 }, PROTECT_TIME)
                //             }
                //             this.getListData(callback);
                //         // }, 2000);
                //     }
                //     this.$refs.scrollContainer.style.transform = `translate(0px, ${this.LoadingRefreshHeight}px) translateZ(0px)`;
                // }

                //------判断是否执行上拉加载更多------
                // console.log(pos.y);
                //
                // console.log(this.top);
                
                // console.log(this.$refs.loading_more.getBoundingClientRect().top - parseInt(this.top));
                // console.log(this.$refs.loading_more.offsetTop + pos.y + parseInt(this.top));
                // console.log(this.$refs.loading_more.offsetParent);
                // console.log(SCREEN_HEIGHT);
                // if (this.$refs.loading_more.offsetTop + pos.y + parseInt(this.top) < SCREEN_HEIGHT) {
                // if (this.$refs.loading_more.getBoundingClientRect().top + TABS_HEIGHT < SCREEN_HEIGHT) {
                    // this.$refs.loading_more.getBoundingClientRect().top + pos.y
                    // console.log(111111111);
                    // if (!this.isLoadMoreing && this.hasMore) {
                        //进行加载更多的操作
                        // this.handlePullToLoadMore();
                //     }
                // }
                


            },
            handleMTouchend (pos) {
                // console.log(pos.y);
                // if (pos.y > )
                // console.log("滑动结束");
                // if (!this.scrollChecked) {
                //     this.scrollChecked = true;
                //     this.$refs.scrollContainer.style.transform = `translate(0px, ${pos.y}px) translateZ(0px)`;
                // }
                
                // console.log(this.$refs.scrollContainer);
                this.scrollEnd = true;

                // console.log(pos.y);
            },
            handleMScrollStart (pos) {
                // console.log("start");
                // this.$refs.scrollContainer.style.transform = `translate(0px, ${this.pauseY}px) translateZ(0px)`;
            },
            handleMScrollEnd () {
                // this.scrollEnd = true;
                // console.log("滚动结束");
            },
            
            //处理上拉加载更多事件
            handlePullToLoadMore () {

            }
        },
        computed : {
            // ...mapState({
            //     bannerLoaded : state => state.hotBannerLoaded
            // })
            // LoadingRefreshHeight () {
            //     return 2 * htmlFontSize;
            // }
        },
        watch : {
            scrollY () {

            }
        },
        components : {
            "banner" : Banner,
            "film-list" : List,
            "mt-loadmore" : Loadmore,
            "scroll" : Scroll,
            "loading": Loading,
            "refreshing": Refreshing
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
    
</style>