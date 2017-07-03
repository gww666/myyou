<template>
    <transition name="slide">
        <div class="location_container" :style="{'height' : pageHeight + 'px'}">
            <header class="title">
                <back-icon class="back_icon"></back-icon>
                <span>城市选择</span>
            </header>
            <!-- 城市列表 -->

            
            <!-- shortcut -->
            <ul class="shortcut">
                <li v-for="(item, index) in shortcutList" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>

    import BackIcon from "../../components/BackIcon";
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
                ]
            }
        },
        components : {
            "back-icon" : BackIcon
        },
        computed : {
            pageHeight () {
                return window.screen.height;
            }
        },
        methods : {
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

            }
        },
        created () {
            this.getCities();
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