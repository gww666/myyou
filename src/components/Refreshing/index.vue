<template>
    <div class="loading_refresh" ref="loading_refresh">
        <div class="refresh_container">
            <img src="../../assets/loading.png" alt="">
            <span class="refresh_icon" ref="refresh_icon"></span>
        </div>
    </div>
</template>

<script>
    const htmlFontSize = document.documentElement.style.fontSize.slice(0, -2);
    const REFRESH_CONTAINER_HEIGHT = htmlFontSize * 2;
    export default {
        data () {
            return {
                _scrollChecked : false
            }
        },
        methods : {
            //固定loading圈圈位置,
            setLoadingIconPosition () {
                //获取父容器的宽度
                let c_width = htmlFontSize * 1.16;
                //获取圈圈宽度
                let q_width = htmlFontSize * 0.45;
                //计算left值
                let q_left = (c_width - q_width) / 2;
                //给圈圈设置left
                // this.$refs.refresh_icon.style.left = q_left + "px";
                this.$refs.refresh_icon.style.left = "0.23rem";
            }
        },
        props : {
            getFirstListData : {
                type : Function
            },
            scrollY : {
                type : Number
            },
            scrollEnd : {
                type : Boolean,
                default : false
            },
            isProtected : {
                type : Boolean,
                default : false
                
            },
            scrollChecked : {
                type : Boolean,
                default : false
            },
            isRefreshing : {
                type : Boolean,
                default : false
            }
        },
        watch : {
            scrollY (newY) {
                // console.log(2222);
                // this._scrollChecked = this.scrollChecked;
                if (this.scrollEnd && !this.scrollChecked && newY >= REFRESH_CONTAINER_HEIGHT + 20 && !this.isProtected) {
                    // console.log(111);
                    

                    if (!this.isRefreshing) {
                        this.getFirstListData();
                    }
                    
                }
            }
        },
        created () {
            setTimeout(() => {
                //固定loading圈圈位置,
                this.setLoadingIconPosition();
            }, 20);
            
        }
    }
</script>

<style lang="scss" scoped>
    .loading_refresh {
        display : flex;
        position: absolute;
        top: -2rem;
        left: 0;
        justify-content: center;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .refresh_container {
        width: 1.16rem;
        height: 1.7rem;
        position: relative;
        // display: flex;
        // justify-content: center;


        img {
            width: 100%;
            height: 100%;
        }
        .refresh_icon {
            // width: 100%;
            position: absolute;
            display: block;
            height: 0.45rem;
            width: 0.45rem;
            border: 0.1rem solid #fff;
            border-radius: 50%;
            // left: (50% - 0.3rem);
            // left: 0;
            // right: 50%;
            // margin-top: 0.37rem;
            top: 0.38rem;
            border-top-color: #4cbdd1;
            // border-left: 0;
            // border-top-left-radius:none;
            // border-bottom-right-radius:50%;
            // border-bottom-right-radius:50%;
            animation: icon-anim 0.6s infinite;
        }
    }

    @keyframes icon-anim {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>