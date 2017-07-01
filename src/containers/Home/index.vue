<template>
    <div>
        <div class="header_container" ref="header">
            <header class="header">
                <img src="../../assets/index_title.png" alt="" class="title_img">
                <span class="location">
                    {{location.city}}
                    <i class="iconfont icon-dingwei"></i>
                </span>
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

        <hot-page :top="pageContainerTop"></hot-page>
        <footer>
            <footer-tabs></footer-tabs>
        </footer>

    </div>
</template>

<script>

        //     <div class="page_container" :style="{'top' : pageContainerTop}">
        //     <div class="page_scroll">
        //         <hot-page></hot-page>
        //     </div>
        // </div>
    import "./index.scss";
    import Hot from "./subpage/Hot";
    import Tabs from "../../components/Tabs";
    export default {
        data () {
            return {
                location : {
                    city : "深圳"
                },
                tabBorderWidth : 0,
                tabs: ["热映电影", "即将上映", "热门活动"],
                tabBorderTranslateX : 0,
                activeBgIndex : -1,
                activeColorIndex : 0,
                pageContainerTop : "0px"
            }
            
        },
        computed : {
            
        },
        methods : {
            getTabsBorderWidth () {
                this.tabBorderWidth = this.$refs.tab[0].offsetWidth;
                this.tabBorderTranslateX = this.$refs.tab[0].offsetLeft;
            },
            setTabsBorderStyle (event, index) {
                this.tabBorderTranslateX = event.target.offsetLeft;
                this.tabBorderWidth = event.target.offsetWidth;
                this.activeBgIndex = index;
                this.activeColorIndex = index;
            },
            //设置中间滚动部分的样式
            setPageContainerStyle () {
                this.pageContainerTop = this.$refs.header.offsetHeight + "px";
                // console.log(this.pageContainerTop);
            }

        },
        created () {
            setTimeout(() => {
                this.getTabsBorderWidth();
                this.setPageContainerStyle();
            }, 20);
        },
        components : {
            "hot-page" : Hot,
            "footer-tabs" : Tabs
        }
    }

</script>

<style lang="scss">
    

</style>