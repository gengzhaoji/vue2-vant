<template>
  <div class="information">
    <div class="title">人员信息
      <div class="back">
        <img
          src="../../assets/back.png"
          @click="offFn()"
          alt="返回"
        >
      </div>
    </div>
    <van-row
      type="flex"
      justify="space-between"
      class="content"
      v-for="(item, index) in option"
      :key="index"
      @click="onFn({ path: '/people/archives'})"
    >
      <van-col
        span="8"
        class="juzhong"
      >
        <img
          src="../../assets/people.png"
          alt="图片"
          class="people"
        >
      </van-col>
      <van-col
        span="16"
        class="juzhong"
      >
        <div style="width: 100%;">
          <p class="one">
            <span class="name">{{item.name}}</span>
            <van-tag type="primary">{{item.gender}}</van-tag>
            <van-tag type="danger">疑似疫情</van-tag>
            <van-tag type="primary">涉赌</van-tag>
          </p>
          <p>
            <img
              src="../../assets/shenfen.png"
              alt=""
              class="width"
            >
            <span style="color:blue">{{item.id}}</span>
          </p>
          <p>
            <img
              src="../../assets/dizhi.png"
              alt=""
              class="width"
            >
            <span>{{item.residerce}}</span>
          </p>
          <p>
            <img
              src="../../assets/shouji.png"
              alt=""
              class="width"
            >
            <span>{{item.phone}}</span>
          </p>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
 
<script>
import { personnelQuery } from "@/api";
export default {
  name: "people_information",
  data() {
    return {
      option: [
        {
          name: "张卫兵",
          id: "4009983199110102345",
          phone: "13087692230",
          household: "户籍所在地",
          residerce: "广东省崇左市",
          gender: "男"
        }
      ]
    };
  },
  methods: {
    /**
     * 车辆信息查询
     */
    queryFn() {
      personnelQuery({
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
 
<style scoped lang = "scss">
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
    font-size: 12px;
    background: #fff;
    .people {
      border: 1px solid #c8c9cc;
      width: 80px;
    }
    .one {
      margin-bottom: 10px;
      .name {
        min-width: 40px;
        display: inline-block;
      }
    }
    .van-tag {
      margin-left: 5px;
    }
    .width {
      width: 14px;
      margin-right: 5px;
      transform: translate(0, 15%);
    }
  }
  .content + .content {
    margin-top: 8px;
  }
}
</style>