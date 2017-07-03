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
                <div>
                    <div v-for="(item, index) in resList" ref="cityList">
                        <dl>
                            <dt class="city_title">{{item.title}}</dt>
                            <dd v-for="(city, index2) in item.items" data-id="city.id" class="city_name">{{city.name}}</dd>
                        </dl>
                    </div>
                </div>
            </scroll>
            
            <!-- shortcut -->
            <ul class="shortcut" ref="shortcut" @touchmove="handleShortcutTouchMove">
                <li v-for="(item, index) in shortcutList" 
                    :key="index" 
                    :class="{'active' : anchorIndex === index}"
                    @touchstart="handleShortcutTouch($event, index)">
                    {{item}}
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>

    import BackIcon from "../../components/BackIcon";
    import Scroll from "../../components/Scroll/Scroll";
    import {city} from "../../api";
    import axios from "axios";

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
                console.log(this.resList);
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
                console.log(pos.y);

            },
            handleShortcutTouch (event, index) {
                console.log(event.touches[0].pageY);
                this.anchorIndex = index;
                // console.log(this.$refs.cityList);
                this.$refs.scroll.scrollToElement(this.$refs.cityList[index + 1], 0);

            },
            handleShortcutTouchMove (event) {
                let pageY = event.touches[0].pageY;
                // console.log(pageY);
                let height = event.target.offsetHeight;
                let currentAnchorIndex = Math.ceil(pageY / height);
                this.anchorIndex = currentAnchorIndex;
                // console.log(currentAnchorIndex);
            }
        },
        watch : {
            scrollY (newY) {

            }
        },
        created () {
            this.probeType = 3;
            this.getCities();
            setTimeout(() => {

            }, 20);

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
        // background: #f8f8f8;
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
            color: #444;
        }
    }
    //scroll
    .scroll {
        position: absolute;
        top: 1.5rem;
        bottom: 0;
        width: 100%;
        left: 0;
        font-size: 0.5rem;
        overflow: hidden;
        width: 100%;
    }

    //城市分栏标题
    .city_title {
        padding: 0.3rem 0.4rem;
        background: #f0f0f0;
        font-size: 0.4rem;
        color: #444;
    }
    .city_name {
        padding: 0.4rem 0;
        margin-left: 0.4rem;
        border-bottom: 1px solid #bbb;

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