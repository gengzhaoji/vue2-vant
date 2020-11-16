<template>
  <div class="archives">
    <div class="head">
      <img
        src="../../assets/head_b.jpg"
        style="width: 100%;position: absolute;"
        alt=""
      >
      <div class="title">车辆档案
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
        justify="center"
        style="position: relative;"
      >
        <van-col
          span="6"
          class="juzhong"
        >
          <div class="che_xiang">
            <img
              src="../../assets/che_xiang.png"
              class="juzhong_transform"
              alt=""
            >
          </div>
        </van-col>
        <van-col
          span="15"
          class="juzhong"
        >
          <div class="right">
            <h3>粤AW9878</h3>
            <p class="p2">
              <span>归属地：广东茂名</span>
              <span>车辆颜色：白色</span>
            </p>
            <p class="p3">
              <van-tag
                round
                type="success"
              >违</van-tag>
              <van-tag
                round
                type="danger"
              >逃</van-tag>
            </p>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <div class="jiben">
        <span class="xinxi">基本信息</span>
        <van-row
          v-for="(item,index) in items"
          :key="index"
        >
          <van-col
            span="7"
            class="grey tr"
          >{{item.name}}</van-col>
          <van-col
            span="17"
            class="ellipsis"
          >{{item.value}}</van-col>
        </van-row>
      </div>
      <div class="kakou kakou2">
        <van-collapse
          v-model="kakou2_index"
          accordion
        >
          <van-collapse-item
            v-for="(item,index) in items"
            :key="index"
            :name="index"
          >
            <!-- 自定义标题 -->
            <div
              slot="title"
              class="title c7"
            >
              2019年
              <span style="float: right;color:grey">（4条记录）</span>
            </div>
            <div class="text">
              <span class="xinxi">卡口信息</span>
              <van-row
                v-for="item in 3"
                :key="item"
                class="juzhong"
              >
                <van-col span="6">
                  <img
                    src="../../assets/cheliang.png"
                    style="width: 90%;"
                    alt=""
                  >
                </van-col>
                <van-col span="18">
                  <div style="width: 100%;">
                    <p class="ellipsis c7">广东省广州市白云区</p>
                    <p class="ellipsis">
                      <span class="grey">卡口区域：</span>
                      <span>厚街道</span>
                      <span class="fr">
                        <span class="grey">过车时间：</span>04月01日
                      </span>
                    </p>
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
      <!--车辆档案页面2部分-->
      <div class="kakou kakou2">
        <van-collapse
          v-model="kakou_index"
          accordion
        >
          <van-collapse-item
            v-for="(item,index) in items"
            :key="index"
            :name="index"
          >
            <!-- 自定义标题 -->
            <div
              slot="title"
              class="title c7"
            >
              2019年
              <span style="float: right;color:grey">（4条记录）</span>
            </div>
            <div class="text">
              <span class="xinxi">违章记录</span>
              <van-row
                v-for="item in 3"
                :key="item"
                class="juzhong"
              >
                <van-col
                  span="4"
                  class="left juzhong"
                >
                  <div>
                    <div class="shuxian"></div>
                    <div class="yuan">
                      <p class="shang">11</p>
                      <p class="xian"></p>
                      <p class="xia">04</p>
                    </div>
                  </div>
                </van-col>
                <van-col
                  span="20"
                  class="right"
                >
                  <div style="width: 100%;">
                    <p class="ellipsis c7">
                      广东省广州市白云区
                      <span class="fr">
                        <span class="grey ellipsis">04月01日</span>
                      </span>
                    </p>
                    <p>
                      <span class="grey ellipsis">违章情况：</span>
                      <span>厚街道</span>
                    </p>
                  </div>
                </van-col>
              </van-row>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "archives",
  data() {
    return {
      items: [
        {
          name: "类型：",
          value: "小型轿车"
        },
        {
          name: "登记时间：",
          value: "1998-09-03"
        },
        {
          name: "所有人：",
          value: "张师傅"
        },
        {
          name: "身份证：",
          value: "446321190890909090"
        },
        {
          name: "手机号码：",
          value: "137909090000"
        },
        {
          name: "户籍地：",
          value: "广东省广州市白云区人民东路南建业大厦9层302"
        }
      ],
      kakou_index: 0,
      kakou2_index: 0
    };
  },
  components: {
    // 组件
  },
  methods: {
    // 函数
  },
  mounted() {
    // 初始化函数
  },
  watch: {
    // 观察属性
  },
  computed: {
    // 计算属性
  }
};
</script>

<style scoped lang="scss">
.archives {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(248, 248, 248);
  .head {
    position: relative;
    .title {
      margin-bottom: 10px;
      position: relative;
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
    .che_xiang {
      border-radius: 50%;
      background-color: #fff;
      width: 86px;
      height: 86px;
      img {
        width: 50px;
      }
    }
    .right {
      color: #fff;
      .p2 {
        margin: 5px 0;
        font-size: 12px;
        color: rgb(216, 190, 190);
        span {
          margin-right: 15px;
        }
      }
      .p3 {
        .van-tag + .van-tag {
          margin-left: 5px;
        }
      }
    }
  }
  .c7 {
    color: blueviolet;
  }
  .content {
    padding: 15px;
    margin-top: 25px;
    .jiben {
      background-color: #fff;
      position: relative;
      .xinxi {
        position: absolute;
        border: 1px solid grey;
        width: 24px;
        text-align: center;
        padding: 10px 0;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
      }
      /deep/ .van-row {
        border: 1px solid grey;
      }
      /deep/ .van-col {
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
      }
      .van-col + .van-col {
        border-left: 1px solid grey;
      }
      .van-row + .van-row {
        border-top: 0;
      }
    }
    .kakou {
      padding-bottom: 10px;
      background: #fff;
      margin-top: 15px;
      /deep/.van-collapse-item__content {
        padding: 0;
      }
      /deep/.van-collapse-item__content {
        background-color: transparent;
      }
      /deep/.van-collapse-item__wrapper {
        overflow: hidden;
        width: calc(100% + 15px);
        margin-left: -15px;
      }
      /deep/.van-hairline--top::after {
        border-color: grey;
      }
      /deep/.van-cell:not(:last-child)::after {
        border-color: grey;
      }
      .text + .text {
        border-top: 1px solid gray;
      }
      .text {
        padding: 0 15px 0 30px;
        position: relative;
        .xinxi {
          position: absolute;
          border: 1px solid grey;
          width: 24px;
          text-align: center;
          padding: 5px 0;
          top: 50%;
          transform: translate(-26px, -50%);
          background: #fff;
          font-size: 12px;
        }
        /deep/.van-row {
          padding: 10px 0;
          font-size: 12px;
        }
        .van-row + .van-row {
          border-top: 1px dashed gray;
        }
      }
    }
    .kakou2 {
      /deep/.van-row {
        position: relative;
      }
      .van-row + .van-row {
        border-top: 0 !important;
      }
      .left {
        .shuxian {
          position: absolute;
          border-left: 1px solid rgba(128, 128, 128, 0.4);
          height: 101%;
          top: 0;
          left: 8.333333333333334%;
          z-index: 0;
          widows: 0;
        }
        .yuan {
          position: relative;
          z-index: 2;
          display: inline-block;
          width: 40px;
          height: 40px;
          background: #7e7ed6;
          color: #fff;
          border-radius: 50%;
          .shang {
            text-align: center;
            height: 18px;
            line-height: 24px;
            margin-right: 10px;
          }
          .xian {
            border-bottom: 1px solid;
            width: 60%;
            margin: 0 auto;
            transform: rotate(-35deg);
          }
          .xia {
            text-align: center;
            height: 18px;
            line-height: 12px;
            margin-left: 10px;
          }
        }
      }
      .right {
        border: 1px solid rgba(128, 128, 128, 0.4);
        padding: 5px;
        background: rgba(241, 231, 231, 0.25);
        position: relative;
        &::before {
          content: " ";
          border-left: 0;
          border-top: 8px solid transparent;
          border-right: 8px solid rgba(128, 128, 128, 0.4);
          border-bottom: 8px solid transparent;
          position: absolute;
          left: -8px;
          top: 10px;
        }
        &::after {
          content: " ";
          border-left: 0;
          border-top: 6px solid transparent;
          border-right: 6px solid rgb(251, 249, 249);
          border-bottom: 6px solid transparent;
          position: absolute;
          left: -6px;
          top: 12px;
        }
      }
    }
  }
}
</style>