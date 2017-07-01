<template>
    <div class="loading_container" :style="{display}">
        <img src="../../assets/loading.png" alt="">

    </div>
</template>

<script>
    export default {
        props : {
            visible : {
                type : Boolean,
                default : true
            }
        }
    }
</script>