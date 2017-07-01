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

<style lang="scss">
    
</style>