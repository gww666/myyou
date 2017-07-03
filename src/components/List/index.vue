<template>
    <div class="list_container">
        <div v-for="(item, index) in list" :key="index" class="list_item">
            <div class="img_container">
                <img :src="item.poster.origin" alt="" class="list_img">
                <border-bottom height="0.18rem" backgroundSize="0.35rem"></border-bottom>
            </div>
            <div class="list_right">
                <p class="title">
                    <span class="name">{{item.name}}</span>
                    <span class="grade" v-if="listType === 'hot'">{{item.grade}}</span>
                </p>
                <p class="intro">{{item.intro}}</p>
                <p v-if="listType === 'hot'" class="count">
                    <span class="cinemaCount"><font>{{item.cinemaCount}}</font>家影院正在上映</span>
                    <span class="watchCount"><font>{{item.watchCount}}</font>人购票</span>
                </p>
                <p v-if="listType === 'will'" class="premiereAt">上映日期：{{item.premiereAt | watchTime}}</p>
            </div>
        </div>
    </div>

</template>

<script>
        // <mt-loadmore ref="loadmore" class="loadmore_container">
        //     <div>
    import Scroll from "../Scroll/Scroll";
    import "./index.scss";
    // import { Loadmore } from 'mint-ui';
    import BorderBottom from "../BorderBottom";
    export default {
        props : {
            list : {
                type : Array,
                default : function () {
                    return [];
                }
            },
            listType : {
                type : String,
                default : "hot"
            }
        },
        data () {
            return {

            }
        },
        methods : {
            // watchTime (time) {
            //     let date = new Date(time);
            //     let year = date.getFullYear();
            //     // let month = 
            //     return `${year}-${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date.getDate()}`;
            // }
        },
        computed : {
            
        },
        components : {
            "scroll" : Scroll,
            "border-bottom" : BorderBottom
        },
        filters : {
            watchTime (time) {
                let date = new Date(time);
                let year = date.getFullYear();
                let date_day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
                // let month = 
                return `${year}-${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}-${date_day}`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list_container {
        padding: 0;
        // position: absolute;
        // bottom: 1.8rem;
        // left: 0;
        // width: 100%;
    }
    
    .list_item {
        display: flex;
        font-size: 0.32rem;
        border-bottom: 1px solid #f0f0f0;
        padding: .5rem 0.3rem;
    }

    .img_container {
        position: relative;
    }
    .list_img {
        width: 1.83rem;
        height: 2.5rem;
    }
    .title {
        display: flex;
        font-size: 0.44rem;
        justify-content: space-between;
        color: #595959;

        .grade {
            font-weight: bold;
            color: #ea8b6b;

        }
    }
    .premiereAt {
        color: #ff8561;
    }
</style>