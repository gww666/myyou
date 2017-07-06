<template>
    <div class="c_l_item_container">
        <div class="t_container">
            <p class="name">{{item.name}}</p>
            <span class="price" v-if="item.minimumPrice">￥{{item.minimumPrice}}<font>起</font></span>
        </div>
        <div class="a_container">
            <p class="address">{{item.address}}</p>
            <span class="distance">1.2km</span>
        </div>
        <div class="ac_container">
            <span v-for="(item1, index) in item.labels">{{item1.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props : {
            item : {
                type : [Object, Array],
                default : function () {
                    // console.log(this);
                    return {};
                }
            }
        },
        data () {
            return {
            }
        },
        methods : {

        },
        watch : {

        },
        components : {
        },
    }
</script>
<style lang="scss" scoped>
.c_l_item_container {
    padding: 0.55rem 0.38rem;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e0e0e0;
    background: #fcfcfc;  

    >div {
        display: flex;
        justify-content: space-between;
        
    }
    .t_container {
        font-size: 0.4rem;
        line-height: 0.4rem;
        .name {
            
        }
        .price {
            color: #ff6640;

            font {
                font-size: 0.3rem;
            }
        }
    }

    .a_container {
        font-size: 0.28rem;
        color: #bcbcbc;
        line-height: 0.4rem;
        margin-top: 0.23rem;
        margin-bottom: 0.38rem;
        .address {
            width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .ac_container {
        justify-content: left;

        span {
            background: #51add0;
            color: #fff;
            font-size: 0.28rem;
            border-radius: 3px;
            margin-right: 0.2rem;
        }

    }
    
    

}


</style>