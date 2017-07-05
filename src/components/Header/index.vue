<template>
    <div class="commen_header">
        <img src="../../assets/iv_back_blue.png" alt="" @click="back">
        <span>{{title}}</span>
        <div class="commen_header_border"></div>
    </div>
</template>

<script>
    export default {
        props : {
            title : {
                type : String,
                default : "Tittle"
            }
        },
        data () {
            return {

            }
        },
        methods : {
            back() {
                window.history.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
.commen_header {
    display: flex;
    color: #595959;
    align-items: center;
    height: 1.5rem;
    font-size: 0.5rem;
    padding: 0 0.5rem;
    background: #fff;
    position: relative;
    

    img {
        height: 0.7rem;
        margin-right: 0.3rem;
    }

    
}
.commen_header_border {
    position: absolute;
    border-bottom: 1px solid #bbb;
    left: 0;
    bottom: 0;
    width: 100%;
}
</style>