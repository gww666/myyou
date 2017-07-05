<template>
    <div class="cinema_header">
        <div>
            <img src="../../assets/iv_back_blue" alt="" v-if="hasBackIcon">
            <span>{{title}}</span>
        </div>
        <i class="iconfont icon-chazhao"></i>

        <div class="c_h_border"></div>
    </div>
</template>

<script>
    export default {
        props : {
            hasBackIcon : {
                type : Boolean,
                default : true
            },
            title : {
                type : String,
                default : "影院"
            }
        }
    }
</script>
<style lang="scss" scoped>
    
</style>