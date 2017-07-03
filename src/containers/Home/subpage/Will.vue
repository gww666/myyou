<template>
    <div class="willpage_container" :style="{top}">
        <scroll
            :list="filmsList"
            :probeType="probeType"
            ref="scroll"
            class="scroll"
            :listenScroll="true"
            :listenTouchend="true"
            :listenScrollStart="true"
            :listenScrollEnd="true"
            @mscroll="handleMScroll"
            @mtouchend="handleMTouchend"
            @mscrollStart="handleMScrollStart"
            @mscrollEnd="handleMScrollEnd">
            <div ref="scrollContainer">
                <!-- 下拉刷新组件组件 -->
                <refreshing
                    :scrollEnd="scrollEnd"
                    :scrollChecked="scrollChecked"
                    :isRefreshing="isRefreshing"
                    :isProtected="isProtected"
                    :getFirstListData="getFirstListData"
                    :scrollY="scrollY"
                >
                </refreshing>
                <!-- 轮播图组件 -->
                <banner :list="bannerList"></banner>
                <!-- 列表组件 -->
                <div class="willlist_container">
                    <div v-for="(item, index) in resList">
                        <p class="willlist_title">{{item.date}}</p>
                        <will-list :list="item.films" listType="will"></will-list>
                    </div>
                </div>
                
                <!-- 加载更多组件 -->
                <load-more
                    :hasMore="hasMore" 
                    :getMoreListData="getMoreListData"
                    :isLoadMoreing="isLoadMoreing"
                    :scrollY="scrollY"
                    >
                </load-more>
            </div>
        </scroll>
    </div>
</template>

<script>

    const htmlFontSize = document.documentElement.style.fontSize.slice(0, -2);
    const PROTECT_TIME = 8 * 1000;
    const LoadingRefreshHeight = 2 * htmlFontSize;

    import Scroll from "../../../components/Scroll/Scroll";
    import WillList from "../../../components/List";
    import Banner from "../../../components/Banner";
    import Loadmore from "../../../components/Loading";
    import Refreshing from "../../../components/Refreshing";
    import axios from "axios";
    import {hotBanner, willList} from "../../../api";

    export default {
        created () {
            this.probeType = 3;
            this.getBannerData();
            this.getMoreListData();
        },
        data () {
            return {
                bannerList : [],
                filmsList : [],
                page : 0,
                count: 10,
                scrollY : 0,
                isLoadMoreing: false,
                hasMore: true,
                scrollEnd: false,
                loadingRefreshActive: false,
                scrollChecked: false,
                isProtected: false,
                loadingMoreVisible: false,
                isRefreshing: false,
                resList : {
                }
            }
        },
        methods : {
            getBannerData () {
                let url = hotBanner;
                axios.get(url)
                .then(data => {
                    // console.log("willList", data);
                    if (data.status === 200) {
                        // console.log(data);
                        this.bannerList = data.data.data.billboards;
                    }
                })
                .catch(error => console.log(error));
            },
            getMoreListData() {
                this.page = this.page + 1;
                this.isLoadMoreing = true;
                setTimeout(() => {
                    axios.get(willList, {
                        params : {
                            page : this.page,
                            count : this.count
                        }
                    })
                    .then(data => {
                        console.log("willList", data);
                        if (data.status === 200) {
                            //判断有无更多数据
                            let total = data.data.data.page.total;
                            let current = data.data.data.page.current;
                            this.hasMore = current === total ? false : true;
                            //拼接数组
                            this.filmsList = this.filmsList.concat(data.data.data.films);
                            this.isLoadMoreing = false;
                            this.handleListData(this.filmsList);
                            // this.$refs.scroll.refresh();
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
                setTimeout(() => {
                    axios.get(willList, {
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
                            this.filmsList = data.data.data.films;
                            //重置标识位
                            this.isRefreshing = false;
                            this.scrollEnd = false;
                            this.scrollChecked = false;
                            this.$refs.scrollContainer.style.transform = `translate(0px, 0px) translateZ(0px)`;
                            this.$refs.scrollContainer.style.transition = `transform 0.4s`;
                            console.log("下拉刷新操作完成");
                            setTimeout(() => {
                                this.isProtected = false;
                                console.log("保护解除，可以请求数据");
                            }, PROTECT_TIME);
                        }
                        
                    })
                    .catch(error => console.log(error));
                }, 1000);
            },
            handleMScroll (pos) {
                this.scrollY = pos.y;
            },
            handleMTouchend (pos) {
                if (!this.isProtected) {
                    this.scrollEnd = true;
                }
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
            //数据处理，按时间分组
            handleListData (data) {
                data.forEach((item, index) => {
                    let date = this.getDateFromTime(item.premiereAt);
                    console.log(date);
                    
                    if (!this.resList[date]) {
                        this.resList[date] = {
                            date,
                            films : []
                        };
                    }
                    // console.log(this.resList);
                    for (let key in this.resList) {
                        // console.log(key);
                        // console.log(this.resList[key].date);
                        // console.log("date", date);
                        if (key === date) {
                            // this.resList[key].date = date;
                            this.resList[key].films.push(item);
                        }
                    }
                });
                // this.$refs.scroll.refresh();
                console.log(this.resList);
            },
            //将时间戳转换为xxxx-xx-xx 周x的格式
            getDateFromTime (time) {
                let date = new Date(time);
                let year = date.getFullYear();
                let arr = ["日", "一", "二","三", "四","五", "六"];
                let date_day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
                let day = date.getDay() === 0 ? arr[0] : arr[date.getDay()];
                // let month = 
                return `${year}-${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date_day}  周${day}`;
            }

        },
        props : {
            top : {
                type : String,
                default : "0"
            }
        },
        components : {
            "scroll" : Scroll,
            "will-list" : WillList,
            "load-more" : Loadmore,
            "banner" : Banner,
            "refreshing" : Refreshing
        }
    }
</script>

<style lang="scss" scoped>
    .willpage_container {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 1.8rem;
        width: 100%;
        overflow: hidden;
        // height: 100%;
    }
    .willlist_container {
        // padding-top: 0.15rem;
    }
    .willlist_title {
        font-size: 0.34rem;
        background: #f9f9f9;
        height: 1.04rem;
        display: flex;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        padding-left: 0.3rem;
        color: #757575;
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
</style>