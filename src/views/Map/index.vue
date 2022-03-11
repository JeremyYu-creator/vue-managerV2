<template>
  <div class="container">
    <!--上方各种设置配置-->
    <div class="block-style">
      <div class="block-item">
        <el-button>查询城市</el-button>
        <el-input v-model="aimPlace"></el-input>
        <el-button @click="searchPlace">搜索</el-button>
      </div>
    </div>
    <!--缺少loading加载-->
    <div id="map" class="map-style"></div>
  </div>
</template>

<script lang="ts">
import { ref, onBeforeMount, defineComponent } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "mapShow",
  setup() {
    const load: any = ref(null); // 创建一个全局的地图实例，方便加入各种plugins，无需多次声明
    const map: any = ref(null);
    onBeforeMount(async () => {// 在这里直接进行图形的相关方法定义
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
        map.value = new load.value.Map("map", { // 实例化map对象
          zoom: 15, //级别
          center: [116.4929, 39.942], //中心点坐标
          viewMode: "3D", //使用3D视图
          // showIndoorMap:false, // 隐藏地图自带的室内地图图层
        })
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
          // console.log(getInfo.value);
        });
        weather.getForecast("北京市", function (err: any, data: any) {
          // 获取该城市未来的天气状况
          console.log(err, data);
        });
        } catch (e: any) {
        console.log(e)
      }
    });
    const aimPlace = ref('北京')
    const searchPlace = () => { // 搜索并跳转指定地点
      map.value.setCity(aimPlace.value);
      ElMessage.success(`已跳转到${aimPlace.value}`);
    }
    return {
        aimPlace,
        searchPlace,
    };
  },
});
</script>
<style lang="stylus" scoped>
.container
  width 1374px
  height 700px
  .map-style
    width: 100%;
    height: 100%;
  .block-style
    .block-item
      display flex
      align-items center
      width 20%
      margin 10px
</style>
