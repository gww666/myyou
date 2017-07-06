<template>
    <div class="cinema_header_container">
        <div class="cinema_header">
            <div class="c_left">
                <img src="../../assets/iv_back_blue.png" alt="" v-if="hasBackIcon">
                <span>{{title}}</span>
            </div>
            <i class="iconfont icon-chazhao" v-if="!sxShow"></i>
            <div class="c_h_border"></div>
        </div>
        <div class="sx" v-if="!sxShow">
            <p>全部区域、服务</p>
            <span @click.stop="handleSXClick">筛选<i class="iconfont icon-icon"></i></span>
        </div>
        <div class="cinema_sx_cover" v-if="sxShow">
            <div class="district">
                <p>区域</p>
                <div>
                    <span v-for="(item, index) in district" 
                        :key="index"
                        @click="handleDistrictClick(item, index)"
                        :class="{'span_active' : districtActiveIndex === index}">
                        {{item}}
                    </span>
                </div>
            </div>
            <div class="services">
                <p>服务</p>
                <div>
                    <span v-for="(item, index) in services" 
                        :key="index"
                        @click="handleServicesClick(item)"
                        :class="{'span_active' : servicesIsActive(item)}">
                        {{item}}
                    </span>
                </div>
            </div>
            <div class="btn">
                <span class="btn_cancel" @click="cancel">取消</span>
                <span class="btn_confirm" @click="confirm">确定</span>
            </div>
            
        </div>
        <div class="c_h_cover" v-if="sxShow" @click.stop.prevent="cancel"></div>
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
            },
            district : {
                type : Array,
                default : function () {
                    return [];
                }
            },
            services : {
                type : Array,
                default : function () {
                    return [];
                }
            },
            //处理地区选择
            handleDistrictChoose : {
                type : Function
            },
            //处理服务选择
            handleServicesChoose : {
                type : Function
            },
            //处理确定事件
            handleSXConfirm : {
                type : Function
            }
        },
        data () {
            return {
                sxShow : false,
                districtActiveIndex : -1,
                servicesChooseArray: [],
            }
        },
        methods : {
            handleSXClick () {
                this.sxShow = !this.sxShow;
            },
            handleDistrictClick (item, index) {
                this.districtActiveIndex = index;
                this.handleDistrictChoose(item);
            },
            handleServicesClick (item) {
                if (this.servicesIsActive(item)) {
                    //已存在，从数组中移除该项
                    this.removeItemFromServicesChooseArray(item);
                } else {
                    this.servicesChooseArray.push(item);
                }
                this.handleServicesChoose(this.servicesChooseArray);
                // this.servicesChooseArray = [...new Set(this.servicesChooseArray)];
            },
            servicesIsActive (item) {
                let i = 0;
                for (let index in this.servicesChooseArray) {
                    i++;
                    if (this.servicesChooseArray[index] === item) {
                        return true;
                        // console.log(11111);
                        // break;
                    }
                }
                // console.log(i);
            },
            //从servicesChooseArray移除某个子项
            removeItemFromServicesChooseArray (item) {
                for (let index in this.servicesChooseArray) {
                    if (this.servicesChooseArray[index] === item) {
                        this.servicesChooseArray.splice(index, 1);
                        break;
                    }
                }
            },
            // 隐藏筛选面板
            cancel () {
                this.sxShow = false;
            },
            confirm () {
                this.handleSXConfirm();
                this.cancel();
            },
        },
        computed : {
        }

    }
</script>
<style lang="scss" scoped>
    .cinema_header_container {
        // position: relative;
        // z-index: 2;

    }
    .cinema_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        position: relative;
        width: 100%;
        height: 1.5rem;
        background: #fff;
        box-sizing: border-box;
        font-size: 0.5rem;
        z-index: 2;

        .c_left {
            display: flex;
            align-items: center;

            img {
                height: 0.7rem;
                margin-right: 0.25rem;
            }
        }

        .c_h_border {
            border-bottom:1px solid #bbb;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%; 
        }
    }

    .icon-chazhao {
        color: #44c0d9;
        font-size: 0.5rem;
    }

    //筛选
    .sx {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        height: 1rem;
        justify-content: space-between;
        padding: 0 0.5rem;
        align-items: center;
        color: #757575;
        font-size: 0.4rem;
        position: relative;
        z-index: 2;
        background: #fff;

        span {
            color: #36bfd1;

            .iconfont {
                
            }
        }
    }

    .cinema_sx_cover {
        // position: absolute;
        // top: 1.5rem;
        // left: 0;
        // width: 100%;
        // bottom: 1.8rem;
        font-size: 0.3rem;
        background: #fff;
        z-index: 2;
        position: relative;

        .span_active {
            background: #ebc39b;
            color: #fff;
            border: 1px solid #ebc39b;
        }
        
    }
    .district {
        padding: 0 0.3rem;
        border-bottom: 1px solid #e0e0e0;
        padding-top: 0.5rem;
        
        
        >div {
            display: flex;
            flex-flow: row wrap;
            margin-top: 0.45rem;
            justify-content: space-between;

            span {
                width: 2.08rem;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                height: 0.63rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #8d8d8d;
                margin-bottom: 0.45rem;
            }
            
        }
    }
    .services {
        padding: 0 0.3rem;
        border-bottom: 1px solid #e0e0e0;
        padding-top: 0.5rem;
        >div {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            margin-top: 0.45rem;

            span {
                width: 2.08rem;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                height: 0.63rem;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #8d8d8d;
                margin-bottom: 0.45rem;
            }
        }
    }

    .btn {
        display: flex;
        padding-top: 0.57rem;
        padding-bottom: 0.27rem;

        >span {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.87rem;
            font-size: 0.45rem;
        }
        >span:nth-of-type(2) {
            border-left: 1px solid #e0e0e0;
            color: #36bfd1;
        }
    }

    .c_h_cover {
        background: #000;
        opacity: 0.4;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 1.8rem;
        width: 100%;
        z-index: 1;
    } 



</style>