<template>
    <div class="loading_container" ref="loading_more">
        <div class="spinner" v-if="isLoadMoreing">
            <div class="spinner-container container1">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container2">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
            <div class="spinner-container container3">
                <div class="circle1"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
            </div>
        </div>
        <div v-if="!isLoadMoreing" class="toast">{{toastText}}</div>
    </div>
</template>

<script>
    const htmlFontSize = document.documentElement.style.fontSize.slice(0, -2);
    const SCREEN_HEIGHT = window.screen.height;
    const TABS_HEIGHT = htmlFontSize * 1.8;
    export default {
        data () {
            return {
                      page : 0
                   }
        },
        props : {
            toast : {
                type : Object,
                default : function () {
                    return {
                        "hasMore" : "加载更多",
                        "noMore" : "没有更多电影了"
                    }
                }
            },
            hasMore : {
                type : Boolean,
                default : true
            },
            getMoreListData : {
                type : Function
            },
            scrollY : {
                type : Number
            },
            isLoadMoreing : {
                type : Boolean,
                default : false
            }
        },
        computed : {
            toastText () {
                return this.hasMore ? this.toast.hasMore : this.toast.noMore;
            }
        },
        watch : {
            scrollY (newY) {
                if (this.getMoreListData) {
                  // console.log(1111111);
                  if (this.$refs.loading_more.getBoundingClientRect().top + TABS_HEIGHT < SCREEN_HEIGHT) {
                      // this.$refs.loading_more.getBoundingClientRect().top + pos.y
                      // console.log(111111111);
                      if (!this.isLoadMoreing && this.hasMore) {
                          //进行加载更多的操作
                          this.getMoreListData();
                      }
                  }
                    
                }
            }
        }
    }
</script>

<style scoped>
.toast {
    font-size: 14px;
}
.loading_container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

}
.spinner {
  width: 40px;
  height: 40px;
  position: relative;
  transform: scale(0.5);
}
 
.container1 > div, .container2 > div, .container3 > div {
  width: 8px;
  height: 8px;
  background-color: #bbb;
 
  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
 
.spinner .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
 
.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}
 
.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
 
.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }
 
.container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
.container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
 
.container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
 
.container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}
 
.container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
 
.container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}
 
.container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
 
.container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}
 
.container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
 
.container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}
 
@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>