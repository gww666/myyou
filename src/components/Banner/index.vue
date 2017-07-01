<template>
    <div class="swipe-container">
        <mt-swipe :auto="0" class="banner_swipe">
            <mt-swipe-item v-for="(item, index) in list" class="banner_item">
                <img :src="item.imageUrl" alt="" class="banner_img" />
                <border-bottom></border-bottom>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    import "./index.scss";
    import BorderBottom from "../BorderBottom";
    import {Swipe, SwipeItem} from 'mint-ui';
    // import {HOTBNAAER_LOADED} from "../../store/mutation-type";
    // import {mapMutations} from "vuex";

    export default {
        props : {
            list : {
                type : Array,
                default : []
            },
            width : {
                type : String,
                default : "100%"
            },
            height : {
                type : String,
                default : "300px"
            }
        },
        data () {
            return {
                imgChecked : false
            }
        },
        methods : {
            // ...mapMutations([HOTBNAAER_LOADED]),
            // imgCheckLoaded () {
            //     if (!this.imgChecked) {
            //         console.log("只检查一次图片");
            //         this.imgChecked = true;
            //         this.HOTBNAAER_LOADED(this.imgChecked);
            //         // console.log(this[HOTBNAAER_LOADED]);
            //     }
            // }

        },
        created () {

        },
        components : {
            "mt-swipe" : Swipe,
            "mt-swipe-item" : SwipeItem,
            "border-bottom" : BorderBottom
        }
    }
</script>

<style lang="scss" scoped>

    
</style>