<template>
    <div class="icon_container" :style="{width, height}">
        <img src="../../assets/back_icon.png" alt="">
    </div>
</template>
<script>
    export default {
        props : {
            width : {
                type : String,
                default : "0.3rem"
            },
            height : {
                type : String,
                default : "0.5rem"
            }
        }
    }
</script>
<style lang="scss" scoped>
    .icon_container {

        img {
            width: 100%;
            height: 100%;
        }
    }
</style>