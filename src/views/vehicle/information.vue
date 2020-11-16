<template>
  <div class="information">
    <div class="title">车辆信息
      <div class="back">
        <img
          src="../../assets/back.png"
          alt="返回"
          @click="offFn()"
        >
      </div>
    </div>
    <van-row
      type="flex"
      justify="space-between"
      class="content"
      v-for="(item, index) in option"
      :key="index"
      @click="onFn({ path: '/vehicle/archives'})"
    >
      <van-col
        span="9"
        class="juzhong"
      >
        <img
          src="../../assets/cheliang.png"
          alt="图片"
          class="people"
        >
      </van-col>
      <van-col
        span="14"
        class="juzhong"
      >
        <div style="width: 100%;">
          <van-row>
            <van-col span="9">{{item.license_plate}}</van-col>
            <van-col span="15">
              <van-tag type="primary">{{item.address}}</van-tag>
            </van-col>
          </van-row>
          <van-row>
            <van-col
              span="9"
              class="grey"
            >品牌种类：</van-col>
            <van-col span="15">{{item.brand}}</van-col>
          </van-row>
          <van-row>
            <van-col
              span="9"
              class="grey"
            >车身颜色：</van-col>
            <van-col span="15">{{item.color}}</van-col>
          </van-row>
          <van-row>
            <van-col
              span="9"
              class="grey spac"
            >所有人：</van-col>
            <van-col span="15">{{item.name}}</van-col>
          </van-row>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
 
<script>
import { vehicleQuery } from "@/api";
export default {
  name: "information",
  data() {
    return {
      option: [
        {
          license_plate: "粤A333XX",
          address: "广东省广州市",
          name: "耿朝继",
          color: "白色",
          brand: "小型汽车"
        }
      ]
    };
  },
  methods: {
    /**
     * 车辆信息查询
     */
    queryFn() {
      vehicleQuery({
        name: this.$route.query && this.$route.query.name
      })
        .then(res => {
          this.$notify({
            type: "success",
            message: "查询成功"
          });
          this.option = res.data;
        })
        .catch(err => {
          this.$notify({
            type: "warning",
            message: "查询失败"
          });
        });
    }
  },
  mounted() {
    this.queryFn();
  }
};
</script>
 
<style scoped lang="scss">
.information {
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
    padding: 14px;
    font-size: 14px;
    background: #fff;
    .people {
      border: 1px solid #c8c9cc;
      width: 90%;
      margin-top: 10px;
    }
    .grey {
      color: grey;
    }
    .spac {
      letter-spacing: 4.6px;
    }
    .van-row + .van-row {
      margin-top: 5px;
    }
  }
  .content + .content {
    margin-top: 10px;
  }
}
</style>