<template>
    <div class="tabs_container">
        <div v-for="(item, index) in tabs" :key="index">
            
            <i class="iconfont" :class="item.icon"></i>
            <span v-text="item.title"></span>
        </div>
    </div>
</template>

<script>
    import './index.scss'
    export default {
        data () {
            return {
                tabs : [
                    {title : "电影", icon : "icon-dianying"},
                    {title : "影院", icon : "icon-tabbaryingyuana"},
                    {title : "演出", icon : "icon-maikefenghuatong"},
                    {title : "商城", icon : "icon-shangcheng"},
                    {title : "我的", icon : "icon-wode"}
                ]
            }
        }
    }

</script>

<style lang="scss" scoped>
    
</style>