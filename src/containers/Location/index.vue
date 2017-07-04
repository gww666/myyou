<template>
    <transition name="slide">
        <div class="location_container" :style="{'height' : pageHeight + 'px'}">
            <header class="title">
                <back-icon class="back_icon"></back-icon>
                <span>城市选择</span>
                <div class="border"></div>
            </header>
            <!-- 城市列表 -->
            <scroll
                ref="scroll"
                class="scroll"
                :list="resList"
                :listenScroll="true"
                @mscroll="handleMScroll"
                :probeType="3">
                <div ref="cityListContainer" @touchstart="handleCityListTouchStart">
                    <div v-for="(item, index) in resList" ref="cityList" >
                        <dl>
                            <dt class="city_title">{{item.title}}</dt>
                            <dd v-for="(city, index2) in item.items" 
                                data-id="city.id" 
                                class="city_name"
                                @click="handleCityItemClick(city.name, city.id)">
                                {{city.name}}
                            </dd>
                        </dl>
                    </div>
                </div>
            </scroll>
            
            <!-- shortcut -->
            <ul class="shortcut" ref="shortcut" 
                @touchmove="handleShortcutTouchMove" 
                @touchstart="handleShortcutTouch($event)"
                @touchend="handleShortcutTouchEnd">
                <li v-for="(item, index) in shortcutList" 
                    :key="index" 
                    :class="{'active' : anchorIndex === index}"
                    :data-index="index">
                    {{item}}
                </li>
            </ul>

            <!-- 中间提示框 -->
            <div class="toast" v-if="toastShow">
                <span>{{toast}}</span>
            </div>

        </div>
    </transition>
</template>

<script>

    import BackIcon from "../../components/BackIcon";
    import Scroll from "../../components/Scroll/Scroll";
    import {city} from "../../api";
    import axios from "axios";
    import getData from "../../utils/getData";
    import {mapMutations} from "vuex";
    import {LOCATION_UPDATE} from "../../store/mutation-type";


    export default {
        data () {
            return {
                cityList : [],
                shortcutList : [],
                resList : [],
                hotCities : [
                    {name: "深圳", id : 10},
                    {name: "广州", id : 13},
                    {name: "上海", id : 11},
                    {name: "北京", id : 12},
                ],
                scrollY : -1,
                anchorIndex: 0,
                cityListHeight: [],
                toast : "热",
                toastShow: false,
                cityList2: this.$refs.cityList
            }
        },
        components : {
            "back-icon" : BackIcon,
            "scroll": Scroll
        },
        computed : {
            pageHeight () {
                return window.screen.height;
            }
        },
        methods : {
            //添加mutations
            ...mapMutations({
                LOCATION_UPDATE : "location/" + LOCATION_UPDATE
            }),
            //axios请求城市列表信息
            getCities () {
                let url = city;
                axios.get(url)
                .then(data => {
                    // console.log(data);
                    if (data.status === 200) {
                        this.cityList = data.data.data.cities;
                        // console.log(this.cityList);
                        this.handleCityList(this.cityList);
                    }
                })
                .catch(e => console.log(e));
            },
            //处理城市数据
            handleCityList (data) {
                let common = [
                    {
                        title : "GPS定位您所在的城市",
                        items : []
                    },
                    {
                        "title" : "热门城市",
                        items: [
                            ...this.hotCities
                        ]
                    }
                ]
                let elseCities = {};
                data.forEach((item, index) => {
                    let findIndex = item.pinyin.slice(0, 1);
                    // if ()
                    this.shortcutList.push(findIndex);
                    // console.log(this.shortcutList);
                    if (!elseCities[findIndex]) {
                        elseCities[findIndex] = {
                            title : findIndex,
                            items: []
                        }
                    }

                    for (let key in elseCities) {
                        if (key === findIndex) {
                            let obj = {
                                name : item.name,
                                id : item.id
                            }
                            elseCities[key].items.push(obj);
                        }
                    }
                });
                // console.log("elseCities", elseCities);
                for (let key in elseCities) {
                    this.resList.push(elseCities[key]);
                }
                this.resList.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0);
                })
                this.resList = common.concat(this.resList);
                // console.log(this.resList);
                //获取shortcart
                this.shortcutList = [...new Set(this.shortcutList)];
                this.shortcutList.sort((a, b) => {
                    return a.charCodeAt(0) - b.charCodeAt(0);
                });
                this.shortcutList.unshift("热");

            },
            //处理scroll事件
            handleMScroll (pos) {
                this.scrollY = pos.y;
                // console.log(pos.y);

            },
            handleShortcutTouch (event) {
                //显示toast
                this.toastShow = true;
                // console.log(event.touches[0].pageY);
                this.anchorIndex = parseInt(getData(event.target, "index"));
                // console.log(this.anchorIndex);
                // console.log(this.$refs.cityList);
                
                this.touch.pageY = event.touches[0].pageY;
                this.touch.moveAnchorCount = this.anchorIndex;
                this._scrollTo(this.anchorIndex);

            },
            handleShortcutTouchMove (event) {
                let movePageY = event.touches[0].pageY;
                // console.log(pageY);
                let height = event.target.offsetHeight;
                // console.log(height);
                let currentAnchorIndex = (this.touch.moveAnchorCount + Math.floor((movePageY - this.touch.pageY) / height));
                if (currentAnchorIndex >= 0 && currentAnchorIndex < this.shortcutList.length) {
                    this.anchorIndex = currentAnchorIndex;
                    this._scrollTo(this.anchorIndex);
                }
                // console.log(currentAnchorIndex);
                // this.anchorIndex = currentAnchorIndex;
                // console.log(currentAnchorIndex);
            },
            handleShortcutTouchEnd () {
                //隐藏toast
                this.toastShow = false;
                console.log(this.$refs.cityList);
            },
            getCityListHeight () {
                for (let i = 0; i < this.$refs.cityList.length; i++) {

                    this.cityListHeight.push(this.$refs.cityList[i].offsetTop);
                }
                this.cityListHeight.shift();
                console.log(this.cityListHeight);
            },
            handleCityListTouchStart () {
                if (this.cityListHeight.length < this.shortcutList.length) {
                    this.getCityListHeight();
                }
            },
            handleCityItemClick (name, id) {
                
                // console.log(this.$router);
                
                // console.log(name, id);
                let location = {
                    cityName: name,
                    cityId: id
                }
                this.LOCATION_UPDATE(location);
                this.$router.go(-1);
                // console.log(11111111);
            },
            handleBackClick () {
                this.$router.go(-1);
            },
            _scrollTo (index) {
                //加1是因为有一个gps定位，而shaortcut中没有
                console.log(this.$refs.scroll);
                this.$refs.scroll.scrollToElement(this.$refs.cityList[index + 1], 0);
                //定义toast
                this.toast = this.shortcutList[index];
            }
        },
        watch : {
            
            scrollY (newY) {
                // console.log(newY);
                //判断当前属于哪个anchor
                for (let i = 0; i < this.cityListHeight.length - 1; i++) {
                    let h1 = this.cityListHeight[i];
                    let h2 = this.cityListHeight[i + 1];

                    // console.log("h1", h1);
                    // console.log("h2", h2);
                    if (-newY >= this.cityListHeight[this.cityListHeight.length - 1]) {
                        this.anchorIndex = this.cityListHeight.length - 1;
                        return;
                    }
                    if (-newY >= h1 && -newY < h2) {
                        this.anchorIndex = i;
                        // if (-newY >= h2) {
                        //     this.anchorIndex = i + 1;
                        // }
                        break;
                    }
                }
            },
            cityList (newList) {
                // console.log(newList);
                // console.log(this.$refs.cityListContainer.children);
                console.log(this.cityList2);
            }
        },
        created () {
            //自定义一个touch对象
            this. touch = {};
            this.probeType = 3;
            this.getCities();
            setTimeout(() => {
            }, 20);
        },
        beforeCreate () {
            // document.addEventListener("DOMContentLoaded", function () {

            // });
        }
    }
</script>
<style lang="scss" scoped>

    .back_icon {
        margin-right: 0.35rem;
    }
    .location_container {
        position: absolute;
        z-index: 4;
        background: #f8f8f8;
        left: 0;
        top: 0;
        width: 100%;
        
    }
    .title {
        height: 1.5rem;
        display: flex;
        align-items: center;
        padding: 0 0.53rem;
        font-size: 0.5rem;
        color: #5e5e5e;
        background: #fff;
        position: relative;
        

        .border {
            position: absolute;
            bottom: 0;
            left: 0;
            border-bottom: 1px solid #bbb;
            width: 100%;
            // z-index: 4;
            
        }
    }

    //toast提示框
    .toast {
        position: fixed;
        top: 50%;
        left: 45%;
        font-size: 1.7rem;
        color: #20b4d2;
    }

    //快速入口
    .shortcut {
        position: absolute;
        right: 0;
        top: 1.5rem;
        bottom: 0;
        width: 1.05rem;
        background: #20b4d2;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column nowrap;
        font-size: 0.22rem;

        li {
            display: flex;
            align-items: center;
            flex: 1;
            width: 100%;
            justify-content: center;
        }
        .active {
            color: #4f4f4f;
        }
    }
    //scroll
    .scroll {
        position: absolute;
        top: 1.5rem;
        bottom: 0;
        width: 100%;
        left: 0;
        overflow: hidden;
        width: 100%;
    }

    //城市分栏标题
    .city_title {
        padding: 0.3rem 0.4rem;
        background: #e0e0e0;
        font-size: 0.4rem;
        color: #444;
    }
    .city_name {
        padding: 0.4rem 0;
        margin-left: 0.4rem;
        border-bottom: 1px solid #bbb;
        font-size: 0.44rem;

        &:last-of-type {
            border: 0;
        }
    }
    

    //转场动画
    .slide-enter-active {
        animation: enter 0.5s;
    }
    .slide-leave-active {
        animation: leave 0.5s;
    }

    @keyframes enter {
        from {
            // transform: translateX(100%);
            left: 100%;
        }
        to {
            // transform: translateX(0);
            left: 0;
        }
    }

    @keyframes leave {
        from {
            left: 0;
        }
        to {
            left: 100%;
        }
    }
</style>