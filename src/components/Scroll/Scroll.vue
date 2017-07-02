<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        props : {
            probeType : {
                type : Number,
                default : 1
            },
            click : {
                type : Boolean,
                default : true
            },
            list : {
                type : Array,
                default : []
            },
            listenScroll : {
                type : Boolean,
                default : false
            },
            listenTouchend : {
                type : Boolean,
                default : false
            },
            listenScrollStart: {
                type : Boolean,
                default : false
            }
        },
        methods : {
            initScroll () {
                if (!this.$refs.wrapper) {
                    console.log("还没有拿到dom");
                    return false;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType : this.probeType,
                    click : this.click
                });
                console.log(this.scroll);
                //如果监听scroll，绑定一个滚动事件
                if (this.listenScroll) {
                    // console.log("ssss");
                    this.scroll.on('scroll', (pos) => {
                        // console.log("ssss");
                        this.$emit('mscroll', pos)
                    });
                }
                if (this.listenTouchend) {
                    this.scroll.on('touchend', (pos) => {
                        // console.log("ssss");
                        // console.log("滑动结束");
                        this.$emit('mtouchend', pos);
                    });
                }
                if (this.listenScrollStart) {
                    this.scroll.on('scrollStart', () => {
                        // console.log("ssss");
                        // console.log("滑动结束");
                        // console.log(pos);
                        this.$emit('mscrollStart');
                    });
                }
                // this.scroll.on('touchend', (pos) => {
                //     // console.log("ssss");
                //     console.log("取消滑动");
                //     // this.$emit('mscrollEnd', pos);
                // });
            },
            enable () {
                this.scroll && this.scroll.enable();
            },
            refresh () {
                // console.log("this.scroll", this.scroll);
                this.scroll && this.scroll.refresh();
            },
            disable () {
                this.scroll && this.scroll.disable();
            },
            scrollTo () {
                //x, y, time, easing
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement () {
                //el, time, offsetX, offsetY, easing
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            }
        },
        mounted () {
            setTimeout(() => {
                this.initScroll();
            }, 20);
        },
        watch : {
            list : function () {
                setTimeout(() => {
                    // console.log("data变化");
                    // console.log(this.list.length);
                    this.refresh();
                }, 20);
            }
        }
    }
</script>

<style>
    
</style>