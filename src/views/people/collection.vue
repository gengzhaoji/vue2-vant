<template>
  <div class="collection">
    <login :show="islogin"></login>
    <div class="title">人员采集
      <div class="back">
        <img
          src="../../assets/back.png"
          @click="offFn()"
          alt="返回"
        >
      </div>
    </div>
    <div class="content">
      <div>
        <p class="name">姓名</p>
        <van-cell-group>
          <van-field
            v-model="from.name"
            placeholder="请输入姓名"
          />
        </van-cell-group>
      </div>
      <div>
        <p class="name">证件号码</p>
        <van-cell-group>
          <van-field
            v-model="from.id"
            placeholder="请输入证件号码"
          >
            <img
              slot="right-icon"
              class="camera"
              src="../../assets/camera.png"
              alt="图片"
              @click="chooseFn()"
            >
          </van-field>
        </van-cell-group>
        <input
          type="file"
          ref="file"
          accept="image/*"
          style="display:none"
          @change="getFile($event)"
        >
      </div>
      <div>
        <p class="name">电话号码</p>
        <van-cell-group>
          <van-field
            v-model="from.phone"
            placeholder="请输入电话号码"
          />
        </van-cell-group>
      </div>
      <div>
        <p class="name">户籍所在地</p>
        <van-cell-group>
          <van-field
            v-model="from.household"
            placeholder="请输入户籍所在地"
          />
        </van-cell-group>
      </div>
      <div>
        <p class="name">当前地址</p>
        <van-cell-group>
          <van-field
            v-model="from.residerce"
            placeholder="请输入当前地址"
          >
            <img
              slot="right-icon"
              class="location"
              src="../../assets/Location.png"
              @click="getLocation()"
              alt=""
            >
          </van-field>
        </van-cell-group>
      </div>
      <div
        class="Determine"
        @click="insertFn()"
      >确认</div>
      <div
        class="cancel"
        @click="offFn()"
      >取消</div>
    </div>
  </div>
</template>
 
<script>
import compress from "../../utils/compress.js";
import { personnelInsert } from "@/api";
export default {
  name: "people_collection",
  data() {
    return {
      from: {
        name: "",
        id: "",
        phone: "",
        household: "",
        residerce: "",
        gender: "男"
      }
    };
  },
  methods: {
    /**
     * 人员采集提交逻辑
     */
    insertFn() {
      personnelInsert(this.from)
        .then(res => {
          this.$notify({
            type: "success",
            message: "提交成功"
          });
          this.from = {
            name: "",
            id: "",
            phone: "",
            household: "",
            residerce: "",
            gender: "男"
          };
        })
        .catch(e => {
          this.$notify({
            type: "warning",
            message: "提交失败"
          });
        });
    },
    /**
     * 获取定位
     */
    getLocation() {
      const vm = this;
      vm.islogin = true;
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
        function onComplete(data) {
          vm.dizhi = data.formattedAddress;
          vm.islogin = false;
        }
        function onError(data) {
          vm.getLngLatLocation();
        }
      });
    },
    getLngLatLocation() {
      const vm = this;
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            //逆向地理编码
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });
              var lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  vm.dizhi = data.regeocode.formattedAddress;
                  vm.islogin = false;
                }
              });
            });
          }
        });
      });
    },
    //选择函数
    chooseFn: function() {
      this.$refs.file.dispatchEvent(new MouseEvent("click"));
    },
    /**
     * 图片选择
     */
    getFile: function(event) {
      compress(event.target.files[0]).then(newFile => {
        newFile;
      });
    }
  },
  mounted() {
    // 初始化函数
  }
};
</script>
 
<style scoped lang = "scss">
.collection {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(248, 248, 248);
  .title {
    position: relative;
    background-color: #1583eb;
    color: #fff;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    .back {
      position: absolute;
      top: 0;
      left: 14px;
      img {
        height: 16px;
      }
    }
  }
  .content {
    padding: 5px 15px 0 15px;
    .name {
      padding: 10px 0 10px 0;
    }
    .van-cell {
      padding: 6px;
      border: 1px solid #8080805e;
      border-radius: 5px;
    }
    .camera {
      width: 20px;
      transform: translate(0, 2.5px);
    }
    .location {
      width: 14px;
      transform: translate(0, 2.5px);
    }
    .Determine {
      width: 70%;
      margin: 20px auto;
      text-align: center;
      background-color: blue;
      color: #fff;
      height: 30px;
      line-height: 30px;
      border-radius: 50px;
      letter-spacing: 14px;
      padding-left: 7px;
    }
    .cancel {
      width: 70%;
      margin: 20px auto;
      text-align: center;
      height: 30px;
      line-height: 30px;
      border-radius: 50px;
      letter-spacing: 14px;
      padding-left: 7px;
      border: 1px solid #8080805e;
    }
  }
}
</style>