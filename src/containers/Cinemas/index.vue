<template>
    <div class="cinemas_container">
        <cinema-header 
            :district="district" 
            :services="services"
            :handleDistrictChoose="handleDistrictChoose"
            :handleServicesChoose="handleServicesChoose"
            :handleSXConfirm="handleSXConfirm">
        </cinema-header>
        <div class="cinema_list_container">
            <cinema-list :list="resList"></cinema-list>
        </div>
        <footer>
            <tabs></tabs>
        </footer>
    </div>
</template>

<script>
    // import Scroll from "../../components/Scroll";
    import CinemaList from "../../components/CinemaList";
    import CinemaHeader from "../../components/CinemaHeader";
    import Tabs from "../../components/Tabs";
    import axios from "axios";
    import {cinema as cinemaAPI} from "../../api";


    export default {
        props : {

        },
        data () {
            return {
                scrollY: -1,
                cinemasList : [],
                resList : [],
                district: [],
                services: [],
                districtChoose : "",
                servicesChoose : [],
            }
        },
        methods : {
            getCinemasData () {
                let url = cinemaAPI;
                axios.get(url)
                .then(data => {
                    // console.log(data);
                    if (data.status === 200) {
                        // console.log(data);
                        this.cinemasList = data.data.data.cinemas;
                        this.resList = data.data.data.cinemas;
                        // console.log(this.cinemasList);
                        this.handleDistrict(this.cinemasList);
                        this.handleServices(this.cinemasList);
                    }
                })
                .catch(e => console.log(e));
            },
            //获取地区分类
            handleDistrict (data) {
                data.forEach(item => {
                    this.district.push(item.district.name);
                });

                this.district = [...new Set(this.district)];
                // console.log(this.district);
            },
            //获取服务分类
            handleServices (data) {
                data.forEach(item => item.labels.forEach(item1 => this.services.push(item1.name)));
                this.services = [...new Set(this.services)];
                console.log(this.services);
            },
            //处理地区选择事件
            handleDistrictChoose (dist) {
                this.districtChoose = dist;
                console.log(dist);
                
            },
            //处理服务选择事件
            handleServicesChoose (serv) {
                this.servicesChoose = [...serv];
                console.log(serv);
            },
            //处理确定筛选事件
            handleSXConfirm () {
                if (this.districtChoose || this.servicesChoose.length > 0) {
                    this.resList = [];
                } else {
                    console.log("无筛选");
                    return;
                }
                
                this.cinemasList.forEach(item => {
                    // let fn = item => {
                    //     console.log(item);
                    // }
                    // console.log(eval(`item.district.name === '${this.districtChoose}'`));
                    if (this.districtChoose && this.servicesChoose.length === 0) {
                        if (item.district.name === this.districtChoose) {
                            this.resList.push(item);
                        }
                    } else if (this.districtChoose && this.servicesChoose.length > 0) {
                        // console.log(eval(`item.district.name === '${this.districtChoose}' && fn(item)`));
                        // console.log(this.cinemaReg(item));
                        if (item.district.name === this.districtChoose && this.cinemaReg(item)) {
                            this.resList.push(item);
                        }
                    } else if (!this.districtChoose && this.servicesChoose.length > 0) {
                        if (this.cinemaReg(item, ...this.servicesChoose)) {
                            this.resList.push(item);
                        }
                    }
                });
                console.log(this.resList);
            },
            //对筛选条件进行序列化处理
            serializeParams () {
                let res = "";
                if (this.districtChoose) {
                    res += `item.district.name === '${this.districtChoose}'`;
                }
                let s = [];
                this.servicesChoose.forEach(item => {
                    s.push(item);
                });
                if (s.length > 0) {
                    if (res) {
                        res += " && fn(...s)";
                    } else {
                        res = "fn(...s)";
                    }
                }
                return res;
            },
            cinemaReg (cinema) {
                // cinema.labels.forEach()
                // let flag = false;
                if (cinema.labels.length < this.servicesChoose.length) {
                    // console.log(222222);
                    return false;
                }
                let arr = cinema.labels.map(item => {
                    return item.name;
                });
                let str = arr.toString();
                console.log(str);
                for (let index in this.servicesChoose) {
                    if (str.indexOf(this.servicesChoose[index]) == -1) {
                        return false;
                    }

                }
                // console.log(true);
                return true;
                // return val + "ssssssss";
            }
            

        },
        watch : {

        },
        components : {
            // "scroll" : Scroll,
            "cinema-list" : CinemaList,
            "cinema-header" : CinemaHeader,
            "tabs" : Tabs
        },
        created () {
            this.getCinemasData();
        }
    }
</script>
<style lang="scss" scoped>
    .cinema_list_container {
        position: absolute;
        top: 2.5rem;
        bottom: 1.8rem;
        left: 0;
        width: 100%;
    }
    .cinemas_container {
        width: 100%;
    }
</style>