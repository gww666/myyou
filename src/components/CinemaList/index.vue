<template>
    <div>
        <scroll @mscroll="handleMScroll"
            class="scroll"
            ref="scroll"
            :probeType="3"
            :list="list"
            :listenScroll="true"
            >
            <div>
                <item v-for="(item, index) in list" :key="index" :item="item"></item>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from "../../components/Scroll/Scroll";
    import Item from "./Item";
    import {cinemaAPI} from "../../api";

    export default {
        props : {
            list : {
                type : Array,
                default: function () {
                    return [];
                }
            }
        },
        data () {
            return {
                scrollY: -1
            }
        },
        methods : {
            handleMScroll (pos) {
                // console.log(pos.y);
            }
        },
        watch : {

        },
        components : {
            "scroll" : Scroll,
            "item" : Item
        },
    }
</script>
<style lang="scss" scoped>
    .scroll {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        overflow: hidden;
        width: 100%;
    }
</style>