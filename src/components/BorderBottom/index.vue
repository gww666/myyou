<template>
    <div class="border_container" :style="{height, backgroundSize}">
    </div>
</template>
<script>
    import './index.scss'
    export default {
        props : {
            height : {
                type : String,
                default : "0.05rem"
            },
            backgroundSize : {
                type : String,
                default : "0.25rem"
            }
        }
    }
</script>

<style lang="scss" scoped>
    .border_container {
        background: url("../../assets/borderbottom4.png") repeat-x;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        
    }
</style>