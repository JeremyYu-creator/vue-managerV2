<template>
  <div class="container">
    <div id="map" style="width: 100%; height: 98%"></div>

      <el-card v-loading="mapDataLoading">
        <div id="panel"></div>
      </el-card>
  </div>
</template>

<script lang="ts">
// import { GoogleMap, Marker } from "vue3-google-map";
import { onMounted, ref, onBeforeMount, reactive, defineComponent } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "mapShow",
  setup() {
    const load: any = ref(null); // 创建一个全局的地图实例，方便加入各种plugins，无需多次声明
    const map: any = ref(null);
    const changeDirveTag: any = ref(null);
    const mapDataLoading = ref(true);
    onBeforeMount(async () => {
      try {
        load.value = await AMapLoader.load({
          key: "41417da0b45d919952ca225160450a43", // 申请好的Web端开发者Key，首次调用 load 时必填
          version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
          plugins: [
            // 一次性在最开始全部加载
            "AMap.Weather",
            "AMap.ToolBar",
            "AMap.PlaceSearch",
            "AMap.Marker",
            "AMap.Geolocation",
            "AMap.Autocomplete",
            "AMap.Driving",
            "AMap.DragRoute",
            "AMap.Geocoder",
            "AMap.Transfer",
            "AMap.Riding",
            // "AMap.IndoorMap",
          ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
          AMapUI: {
            // 是否加载 AMapUI，缺省不加载
            version: "1.1", // AMapUI 缺省 1.1
            plugins: [], // 需要加载的 AMapUI ui插件
          },
          Loca: {
            // 是否加载 Loca， 缺省不加载
            version: "1.3.2", // Loca 版本，缺省 1.3.2
          },
        });
        map.value = new load.value.Map("map", {
          zoom: 15, //级别
          center: [116.4929, 39.942], //中心点坐标
          viewMode: "3D", //使用3D视图
          // showIndoorMap:false, // 隐藏地图自带的室内地图图层
        });
        const geolocation = new load.value.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          buttonOffset: new load.value.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,
        });
        const trafficLayer = new load.value.TileLayer.Traffic({
          // 显示当前路段的交通情况
          zIndex: 10,
        });
        map.value.add(trafficLayer);
        map.value.addControl(geolocation);
        geolocation.getCurrentPosition((status: string, result: any) => {
          if (status === "complete") {
            console.log(result);
            console.log(result.position.lng, result.position.lat); // 可以拿到坐标
          } else {
            console.log(result);
          }
        });
        const weather = new load.value.Weather();
        weather.getLive("北京市", function (err: any, data: any) {
          // 默认是北京市，可以后续考虑根据当前定位在哪儿显示当前城市的地图和天气
          // 获取该城市的当前天气情况
          console.log(err, data);
          getInfo.value = data;

          loading.value = false;
          // console.log(getInfo.value);
        });
        weather.getForecast("北京市", function (err: any, data: any) {
          // 获取该城市未来的天气状况
          console.log(err, data);
          forecastArr.value = data.forecasts;
          updateTime.value = data.reportTime;
          futureLoading.value = false;
          mapDataLoading.value = false;
        });
      } catch (e) {
        futureLoading.value = false;
        throw new Error(e);
      }
    });
    const getInfo = ref({}); // 获取当前城市当天天气信息
    const loading = ref(true); // 第一个模块的loading
    const tag = ref(false); // 第一个模块的隐藏
    const forecastArr = ref([]); // 第二个模块的渲染数组
    const futureLoading = ref(true); // 第二个模块的loading
    const updateTime = ref("");
    const nowTag = ref(true);
    const futureTag = ref(true);
    const cityName = ref("");
    const mapLabels = reactive([
      "",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期日",
    ]);
    const show = ref(true);
    const tagFuture = ref(false);
    const closeWeather = (index: number) => {
      // 关闭选择页(可以考虑优化下)
      if (index === 1) {
        tag.value = false;
        nowTag.value = true;
      } else if (index === 2) {
        tagFuture.value = false;
        futureTag.value = true;
      } else if (index === 3) {
        tagSearchCity.value = false;
        searchCityTag.value = true;
      } else if (index === 4) {
        tagPlace.value = true;
        placeTag.value = false;
      } else if (index === 5) {
        searchDriving.value = true;
        drivingTag.value = false;
      }
    };
    const showHidden = (index: number) => {
      // 显示btn进行控制
      if (index === 1) {
        tag.value = true;
        nowTag.value = false;
      } else if (index === 2) {
        tagFuture.value = true;
        futureTag.value = false;
      } else if (index === 3) {
        tagSearchCity.value = true;
        searchCityTag.value = false;
      } else if (index === 4) {
        tagPlace.value = false;
        placeTag.value = true;
      } else if (index === 5) {
        searchDriving.value = false;
        drivingTag.value = true;
      }
    };
    const tagSearchCity = ref(false);
    const searchCityTag = ref(true);
    const placeTag = ref(false);
    const tagPlace = ref(true);
    const jumpTo = () => {
      const weather = new load.value.Weather(); // 有必要进行一个新的实例创建吗？
      weather.getLive(cityName.value, function (err: any, data: any) {
        // 获取该城市的当前天气情况
        console.log(err, data);
        getInfo.value = data;
        loading.value = false;
        // console.log(getInfo.value);
      });
      weather.getForecast(cityName.value, function (err: any, data: any) {
        // 获取该城市未来的天气状况
        console.log(err, data);
        forecastArr.value = data.forecasts;
        updateTime.value = data.reportTime;
        futureLoading.value = false;
      });
      if (!cityName.value) {
        cityName.value = "北京市";
      }
      map.value.setCity(cityName.value);
      ElMessage.success(`已跳转到${cityName.value}`);
    };
    const searchPlace = () => {
      const placeSearch = new load.value.PlaceSearch({
        map: map.value,
        city: cityName.value,
        citylimit: false, //是否强制限制在设置的城市内搜索
        pageSize: 20, // 每页限制多少条数(目前是这样：返回数据只能是1页，但是1页里的条数可以设置)
        extensions: "base", //返回基本地址信息
      });
      placeSearch.search(aimPlace.value, function (status: any, result: any) {
        // console.log(aimPlace.value)
        console.log(result);
        const pois = result.poiList.pois;
        for (let i = 0; i < pois.length; i++) {
          const poi = pois[i];
          const marker = [];
          marker[i] = new load.value.Marker({
            position: poi.location,
            title: poi.name,
          });
          map.value.add(marker[i]);
        }
        map.value.setFitView();
      });
    };
    const ruleForm = ref({
      // 启用表单限制输入
      provinceValue: "",
      wantPlaceStartValue: "",
      wantPlaceEndValue: "",
    });
    const rules = reactive({
      // 定义表单规则
      provinceValue: [
        { required: true, message: "请输入所在省份", trigger: "blur" },
      ],
      wantPlaceStartValue: [
        { required: true, message: "请输入起始地点", trigger: "blur" },
      ],
      wantPlaceEndValue: [
        { required: true, message: "请输入目标地点", trigger: "blur" },
      ],
    });
    const divRef = ref(null); // 关于vue3的相关表单验证方法：因为无法使用$ref去获取dom结点，故使用这种方式可以拿到
    const submitForm = (index: string) => {
      // 验证提交表单
      (divRef.value as any).validate((valid: any) => {
        if (valid) {
          routeDrive(index);
        } else {
          ElMessage.error("请输入完整搜索信息!");
          return false;
        }
      });
    };
    const activeName = ref("1");
    const tabLabels = ref([
      {
        name: "公交路线规划",
        icon: "el-icon-truck",
        index: "1",
      },
      {
        name: "驾车路线规划",
        icon: "el-icon-location-outline",
        index: "2",
      },
      {
        name: "骑行路线规划",
        icon: "el-icon-bicycle",
        index: "3",
      },
    ]);
    let searchDriving = ref(true);
    let drivingTag = ref(false);
    const routeDrive = (index: string) => {
      // 路线规划
      if (index === "2") {
        changeDirveTag.value = new load.value.Driving({
          // 展示路线详情
          map: map.value,
          panel: "panel",
        });
        changeDirveTag.value.search(
            [
              {
                keyword: ruleForm.value.wantPlaceStartValue,
                city: ruleForm.value.provinceValue,
              },
              {
                keyword: ruleForm.value.wantPlaceEndValue,
                city: ruleForm.value.provinceValue,
              },
            ],
            function (status: any, result: any) {
              if (status === "complete") {
                ElMessage.success("绘制驾车路线完成");
              } else {
                ElMessage.error("获取驾车数据失败：" + result);
              }
            }
        );
      } else if (index === "1") {
        const transOptions = reactive({
          map: map.value,
          city: ruleForm.value.provinceValue,
          panel: "panel",
          policy: load.value.TransferPolicy.LEAST_TIME, //乘车策略
        });
        changeDirveTag.value = new load.value.Transfer(transOptions);
        changeDirveTag.value.search(
            [
              {
                keyword: ruleForm.value.wantPlaceStartValue,
                city: ruleForm.value.provinceValue,
              },
              {
                keyword: ruleForm.value.wantPlaceEndValue,
                city: ruleForm.value.provinceValue,
              },
            ],
            function (status: any, result: any) {
              if (status === "complete") {
                console.log(result);
                ElMessage.success("绘制交通路线完成！");
              } else {
                ElMessage.error("绘制失败！" + result);
              }
            }
        );
      } else if (index === "3") {
        // console.log(changeDirveTag.value)
        // changeDirveTag.value && changeDirveTag.value.destroy()
        changeDirveTag.value = new load.value.Riding({
          map: map.value,
          panel: "panel",
        });
        changeDirveTag.value.search(
            [
              {
                keyword: ruleForm.value.wantPlaceStartValue,
                city: ruleForm.value.provinceValue,
              },
              {
                keyword: ruleForm.value.wantPlaceEndValue,
                city: ruleForm.value.provinceValue,
              },
            ],
            function (status: any, result: any) {
              if (status === "complete") {
                ElMessage.success("骑行路线绘制成功!");
              } else {
                ElMessage.error("该路线绘制失败！" + result);
              }
            }
        );
      }
      drivingTag.value = false;
      searchDriving.value = true;
    };
    onMounted(() => {
      show.value = !show.value;
      showData(); // 这个地方显示不出来是因为上面的函数是异步的，当onBeforeMounted执行完后，会立即执行下方的onMounted,因此只展示出Proxy
    });
    const showData = () => {
      console.log(getInfo);
    };
    const aimPlace = ref("");
    const searchValue = ref("");
    const mockDataSearchLoading = ref(false);
    const options: any = ref([]);
    const searchMockPlace = (query: string) => {
      // 进行相关的数据获取
      if (query !== "") {
        mockDataSearchLoading.value = true;
        setTimeout(async () => {
          mockDataSearchLoading.value = false;
          const autoOptions = {
            city: "全国",
          };
          const auto = new load.value.Autocomplete(autoOptions);
          await auto.search(query, (status: any, result: any) => {
            options.value = result;
            console.log(options.value);
            console.log(result);
            options.value = result.tips.filter((item: any) => {
              return item.name.indexOf(query) > -1;
            });
          });
        }, 200);
      } else {
        options.value = [];
      }
    };

    return {
      show,
      getInfo,
      showData,
      loading,
      tag,
      closeWeather,
      futureLoading,
      forecastArr,
      mapLabels,
      updateTime,
      tagFuture,
      nowTag,
      futureTag,
      showHidden,
      cityName,
      jumpTo,
      tagSearchCity,
      searchCityTag,
      searchPlace,
      aimPlace,
      placeTag,
      tagPlace,
      submitForm,
      ruleForm,
      rules,
      divRef,
      searchDriving,
      drivingTag,
      tabLabels,
      activeName,
      mapDataLoading,
      searchValue,
      searchMockPlace,
      mockDataSearchLoading,
      options,
    };
  },
});
</script>
<style lang="stylus" scoped>
.show-predict
  margin-bottom 1rem
  display flex
  .mockSearch
    // width 400px
    margin-left 20px
    display flex
    align-items center
    .mock-title
      margin-right 20px
      font-size 14px
    .select-style
      width 200px
.container
  width 1374px
  height 700px
  .img-style
    width 600px
    height 500px
    -webkit-transition:width 1s, height 1s,
        background-color 1s, -webkit-transform 1s;
    transition:width 1s, height 1s, background-color 1s, transform 1s;
  .img-style:hover
    -webkit-transform:rotate(360deg);
    transform:rotate(360deg);
  .text
    font-size 20px
  .custom-loading-svg .el-loading-mask > .el-loading-spinner > .circular {
    animation: none;
  }
  .loading-style
    position absolute
    width 15rem
    height 17rem
    background #fff
    display inline-block
    padding 0 0.5rem
    top 60%
    left 30%
    border-radius 4px
    .info
      .title
        padding 0.5rem
        // text-align center
        border-bottom 1px solid black
        display flex
        align-item center
        justify-content space-around
        font-size 0.9rem
        .close
          margin-left 8rem
          cursor pointer
          height 1rem
          line-height 1.4rem
      .content
        margin 1rem
        height 0.7rem
        font-size 0.8rem
  .forecast
    position absolute
    width 25rem
    height 15rem
    background #fff
    display inline-block
    padding 0 0.5rem
    top 25%
    left 70%
    border-radius 4px
    overflow scroll
    .bgc
      .title
        display flex
        align-item center
        border-bottom 1px solid black
        padding 0.5rem
        font-size 1rem
        color #625b57
        justify-content space-around
        // position fixed
        // margin-bottom 1rem
        // height 1rem
        .updateTime
          font-size 0.6rem
          height 1.6rem
          line-height 1.6rem
          color firebrick
        .close
          cursor pointer
          height 1rem
          line-height 1.7rem
      .content-style
        font-size 0.6rem
        padding 0.5rem
        // margin-top 1rem
        .content-week
          color #007fff
          .content-week-item
            font-size 0.8rem
            margin-right 0.5rem
        .content-all, .content-week
          display flex
          align-items center
          //justify-content space-around
          .content-item
            height 0.7rem
            font-size 0.5rem
            margin-right 0.5rem
            margin-bottom 0.5rem
  .search
    position absolute
    top 70%
    right 5%
    background #fff
    width 20rem
    height 6rem
    padding-top 1rem
    .block
      display flex
      justify-content space-around
      align-items center
      .input-style
        width 10rem
      .cityName
        font-size 0.8rem
      .close
        cursor pointer
    .btn
      display flex
      justify-content flex-end
      margin 1rem
  .searchPlace
    position absolute
    top 55%
    right 5%
    background #fff
    width 20rem
    height 8rem
    padding-top 0.5rem
    .title
      border-bottom 0.1rem solid black
      color #625b57
      // text-align center
      display flex
      justify-content space-between
      align-items center
      margin 0.5rem
      padding-bottom 0.5rem
      .close
        padding-left 1.5rem
    .block-place
      display flex
      align-items center
      justify-content space-around
      padding 1rem
      .input-place
        width 10rem
  .route
    width 30rem
    position absolute
    top 17%
    left 30%
    .btn-route
      display flex
      justify-content flex-end
    .title
      font-size 1rem
      border-bottom 0.1rem solid black
      margin-bottom 1rem
      padding-bottom 0.5rem
      display flex
      justify-content space-between
      .close
        cursor pointer
    .range-item
      display flex
      align-items center
      margin-bottom 1rem
      .txt
        width 5rem
        font-size 0.8rem
      .input-style
        width 10rem
  // display flex
  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
  }
  #panel .amap-call {
    background-color: #009cf9;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  #panel .amap-lib-driving {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
  }
</style>
