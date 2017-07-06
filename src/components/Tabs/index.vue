<template>
    <div class="tabs_container">
        <div v-for="(item, index) in tabs" :key="index">
            <!-- <i class="iconfont" :class="item.icon"></i>
            <span v-text="item.title"></span> -->
            <router-link tag="div" :to="item.link">
                <img :src="tabs_active_index === index ? item.active : item.default" alt="" @click="handleClick(index)">
            </router-link>
        </div>
    </div>
</template>

<script>
    // import './index.scss'
    import {TABS_INDEX_UPDATE} from "../../store/mutation-type";
    import {mapState, mapMutations} from "vuex";

    export default {
        data () {
            return {
                tabs : [
                    {title : "电影", icon : "icon-dianying", link: "/home", default:"/src/assets/movie_default.png", active: "/src/assets/movie_light.png"},
                    {title : "影院", icon : "icon-tabbaryingyuana", link: "/cinemas", default:"/src/assets/cinema_default.png", active: "/src/assets/cinema_light.png"},
                    {title : "演出", icon : "icon-maikefenghuatong", link: "", default:"/src/assets/show_default.png", active: "/src/assets/show_light.png"},
                    {title : "商城", icon : "icon-shangcheng", link: "", default:"/src/assets/mall_default.png", active: "/src/assets/mall_light.png"},
                    {title : "我的", icon : "icon-wode", link: "", default:"/src/assets/mine_default.png", active: "/src/assets/mine_light.png"}
                ],
                activeIndex: 0
            }
        },
        computed : {
            imgUrlType () {
                return this.activeIndex === index ? "active" : "default";
            },
            ...mapState({
                "tabs_active_index" : state => state.tabs.tabs_active_index
            })
        },
        methods : {
            ...mapMutations(["tabs/" + TABS_INDEX_UPDATE]),
            handleClick (index) {
                // this.activeIndex = index;
                this["tabs/" + TABS_INDEX_UPDATE](index);
                // console.log(this);
            }
        }
    }

</script>

<style lang="scss" scoped>
.tabs_container {
    height: 1.8rem;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fcfcfc;
    border-top: 1px solid #f0f0f0; 


    >div {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;

        // .iconfont {
        //     font-size: 0.68rem;
        // }
        // .active {

        // }
        img {
            width: 1.1rem;
            height: 1.13rem;
        }

    }
}
</style>