<template>
  <div class="archives">
    <div class="head">
      <img
        src="../../assets/head_b.jpg"
        style="width: 100%;position: absolute;"
        alt=""
      >
      <div class="title">人员档案
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
              src="../../assets/people.png"
              class="juzhong_transform"
              alt=""
            >
          </div>
        </van-col>
        <van-col
          span="17"
          class="juzhong"
        >
          <div class="right">
            <div class="p1">
              <h3>张三丰</h3>
              <van-tag type="primary">男</van-tag>
            </div>
            <p class="p2">610426199312163539</p>
            <div class="p3">
              <div>
                <span class="name">民
                  <span class="tra">空</span>族
                </span>：汉
              </div>
              <div>
                <span class="name">年
                  <span class="tra">空</span>龄
                </span>：38
              </div>
            </div>
            <div class="p4 ellipsis">
              <span class="name">现住地</span>
              <span>：广西东兴市人民西路广信大楼12层</span>
            </div>
            <p class="p5">
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
      <!--基本信息-->
      <div class="jiben">
        <span class="xinxi">基本信息</span>
        <div class="bff">
          <van-row
            v-for="(item,index) in items"
            :key="index"
          >
            <van-col
              span="7"
              class="tr"
            >{{item.name}}</van-col>
            <van-col
              span="17"
              class="ellipsis"
            >{{item.value}}</van-col>
          </van-row>
        </div>
      </div>
      <!--通讯号码-->
      <div class="tongxun">
        <span class="xinxi">通讯号码</span>
        <div class="bff">
          <van-row>
            <van-col
              span="8"
              class="tc"
            >
              <img src="../../assets/qq.png">
              <p class="name">QQ号码</p>
              <p>1317993594</p>
            </van-col>
            <van-col
              span="8"
              class="tc"
            >
              <img src="../../assets/phone.png">
              <p class="name">手机号码</p>
              <p>1317993594</p>
            </van-col>
            <van-col
              span="8"
              class="tc"
            >
              <img src="../../assets/wx.png">
              <p class="name">微信号码</p>
              <p>1317993594</p>
            </van-col>
          </van-row>
        </div>
      </div>
      <!--个人证件-->
      <div class="zhengjian">
        <span class="xinxi">个人证件</span>
        <div class="bff">
          <van-row>
            <van-col span="12">
              <div class="juzhong">
                <div class="img">
                  <img
                    src="../../assets/shenfenzheng.png"
                    alt=""
                  >
                </div>
                <div class="rig">
                  <p class="name">身份证</p>
                  <p class="">610426199412163538</p>
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="juzhong">
                <div class="img">
                  <img
                    src="../../assets/jiashi.png"
                    alt=""
                  >
                </div>
                <div class="rig">
                  <p class="name">驾驶证</p>
                  <p class="ellipsis">610426199412163538</p>
                </div>
              </div>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              <div class="juzhong">
                <div class="img">
                  <img
                    src="../../assets/gangao.png"
                    alt=""
                  >
                </div>
                <div class="rig">
                  <p class="name">港澳通行证</p>
                  <p class="ellipsis">610426199412163538</p>
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="juzhong">
                <div class="img">
                  <img
                    src="../../assets/huzhao.png"
                    alt=""
                  >
                </div>
                <div class="rig">
                  <p class="name">护照</p>
                  <p class="ellipsis">610426199412163538</p>
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!--交通工具-->
      <div class="jiaotong jiben">
        <span class="xinxi">交通工具</span>
        <div class="bff">
          <van-row>
            <van-col span="3">序号</van-col>
            <van-col span="9">车牌</van-col>
            <van-col span="8">类型</van-col>
            <van-col span="4">颜色</van-col>
          </van-row>
          <van-row
            v-for="item in 2"
            :key="item"
          >
            <van-col span="3">1</van-col>
            <van-col span="9">粤A9877</van-col>
            <van-col span="8">小轿车</van-col>
            <van-col span="4">白色</van-col>
          </van-row>
        </div>
      </div>
      <!--地址信息-->
      <div class="dizhi jiben">
        <span class="xinxi">地址信息</span>
        <div class="bff">
          <van-row>
            <van-col span="3">序号</van-col>
            <van-col span="16">地址</van-col>
            <van-col span="5">资源</van-col>
          </van-row>
          <van-row
            v-for="item in 2"
            :key="item"
          >
            <van-col span="3">1</van-col>
            <van-col
              span="16"
              class="ellipsis"
            >广东省广州市白云区人民东路南建业大厦9层302</van-col>
            <van-col
              span="5"
              class="ellipsis"
            >数据来源</van-col>
          </van-row>
        </div>
      </div>
      <!--案件相关-->
      <div class="anjian jiben">
        <span class="xinxi">案件相关</span>
        <div class="bff">
          <van-row
            v-for="(item, index) in 2"
            :key="index"
          >
            <div class="title">AADASDSSDFSDFASFSAFSD
              <span>-刑事案件</span>
            </div>
            <div class="text">2014年抢劫他人财物等尽快交三方方式发散哈市飞洒ski诶富士康。</div>
          </van-row>
        </div>
      </div>
      <!--亲密度-->
      <van-swipe>
        <van-swipe-item
          v-for="(item, index) in 2"
          :key="index"
        >
          <!--亲密度-->
          <div class="qinmi">
            <span class="xinxi">亲密度</span>
            <div class="bff">
              <!--数据循环-->
              <div
                class="xunhuan"
                v-for="(item2, index2) in 2"
                :key="index2"
              >
                <div class="qinmi_head">
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
                          src="../../assets/people.png"
                          class="juzhong_transform"
                          alt=""
                        >
                      </div>
                    </van-col>
                    <van-col
                      span="18"
                      class="juzhong"
                    >
                      <div class="right">
                        <div class="p1">
                          <p>张三丰</p>
                          <van-tag
                            type="primary"
                            style="margin-right: 0.13333rem;"
                          >男</van-tag>
                          <van-tag
                            type="success"
                            round
                          >
                            <van-icon
                              name="like"
                              color="#fff"
                              style="margin-right:.3em"
                            />亲密度95%
                          </van-tag>
                        </div>
                        <p class="p2">610426199312163539</p>
                        <div class="p3">
                          <div>
                            <span class="name">民
                              <span class="tra">空</span>
                              <span class="tra">空</span>族
                            </span>：汉
                          </div>
                          <div>
                            <span class="name">年
                              <span class="tra">空</span>龄
                            </span>：38
                          </div>
                        </div>
                        <div class="p3">
                          <div>
                            <span class="name">婚姻状况</span>：离婚
                          </div>
                          <div>
                            <span class="name">户籍地</span>：38
                          </div>
                        </div>
                        <div class="p4 ellipsis">
                          <span class="name">现住地</span>
                          <span>：广西东兴市人民西路广信大楼12层</span>
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                </div>
                <div class="table">
                  <van-row>
                    <van-col span="3">序号</van-col>
                    <van-col span="16">地址</van-col>
                    <van-col span="5">资源</van-col>
                  </van-row>
                  <van-row>
                    <van-col span="3">1</van-col>
                    <van-col
                      span="16"
                      class="ellipsis"
                    >广东省广州市白云区人民东路南建业大厦9层302</van-col>
                    <van-col
                      span="5"
                      class="ellipsis"
                    >数据来源</van-col>
                  </van-row>
                </div>
              </div>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
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
              <span style="float: right;color:rgba(128, 128, 128, 0.3)">（4条记录）</span>
            </div>
            <div class="text">
              <span class="xinxi">轨迹信息</span>
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
                      <img
                        :src="item|icon"
                        alt=""
                      >
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
                        <span class="rgba(128, 128, 128, 0.3) ellipsis">04月01日</span>
                      </span>
                    </p>
                    <p>
                      <span class="rgba(128, 128, 128, 0.3) ellipsis">违章情况：</span>
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
  name: "people_archives",
  data() {
    return {
      items: [
        {
          name: "户籍：",
          value: "广东省广州市白云区人民东路南建业大厦9层302"
        },
        {
          name: "出生日期：",
          value: "1998-09-03"
        },
        {
          name: "出生地：",
          value: "广东省广州市白云区人民东路南建业大厦9层302"
        },
        {
          name: "联系电话：",
          value: "137909090000"
        },
        {
          name: "服务处所：",
          value: "服务"
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
  },
  filters: {
    icon: function (data) {
      switch (data) {
        case 1:
          return require("../../assets/jiudian.png");
          break;
        case 2:
          return require("../../assets/wangba.png");
          break;
        case 3:
          return require("../../assets/feiji.png");
          break;
        case 4:
          return require("../../assets/huoche.png");
          break;
      }
    }
  }
};
</script>
 
<style scoped lang = "scss">
.archives {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(248, 248, 248);
  .head {
    position: relative;
    .title {
      margin-bottom: 4px;
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
      width: 70px;
      height: 70px;
      overflow: hidden;
      z-index: 2;
      position: relative;
      img {
        position: relative;
        width: 58px;
        margin-top: 4px;
      }
    }
    .right {
      color: #fff;
      width: 100%;
      .p1 {
        h3 {
          display: inline-block;
          margin-right: 10px;
        }
      }
      .p2 {
        margin-top: 4px;
        font-size: 12px;
        color: rgb(166, 160, 255);
      }
      .p3 {
        margin-top: 4px;
        font-size: 12px;
        div {
          display: inline-block;
          .name {
            letter-spacing: 4px;
            .tra {
              color: transparent;
            }
          }
        }
        div + div {
          margin-left: 40px;
        }
      }
      .p4 {
        margin-top: 4px;
        font-size: 12px;
        .name {
          letter-spacing: 4px;
        }
      }
      .p5 {
        margin-top: 4px;
        .van-tag + .van-tag {
          margin-left: 5px;
        }
      }
    }
  }
  .c7 {
    color: blueviolet;
  }
  .bff {
    background-color: #fff;
  }
  .xinxi {
    position: absolute;
    border: 1px solid rgba(128, 128, 128, 0.3);
    width: 24px;
    text-align: center;
    padding: 10px 0;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
  }
  .content {
    padding: 15px 0;
    margin-top: 8px;
    .jiben {
      position: relative;
      padding: 0 15px;
      .tr {
        color: gray;
      }
      /deep/ .van-row {
        border: 1px solid rgba(128, 128, 128, 0.3);
      }
      /deep/ .van-col {
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
      }
      .van-col + .van-col {
        border-left: 1px solid rgba(128, 128, 128, 0.3);
      }
      .van-row + .van-row {
        border-top: 0;
      }
    }
    .tongxun {
      padding: 0 15px;
      margin-top: 0.4rem;
      position: relative;
      /deep/.van-row {
        padding: 10px 0;
      }
      /deep/.van-col {
        padding: 4px 0;
      }
      .van-col + .van-col {
        border-left: 1px solid rgba(128, 128, 128, 0.3);
      }
      .tc {
        font-size: 12px;
        img {
          width: 46px;
        }
        .name {
          color: rgb(128, 128, 128);
          margin-bottom: 10px;
        }
      }
    }
    .zhengjian {
      padding: 0 15px;
      margin-top: 0.4rem;
      position: relative;
      /deep/ .van-row {
        padding-left: 10px;
      }
      /deep/.van-col {
        padding: 10px 5px;
        .juzhong {
          .img {
            width: 22%;
            font-size: 0;
            img {
              width: 30px;
            }
          }
          .rig {
            width: 78%;
            font-size: 12px;
            .name {
              color: rgb(128, 128, 128);
              margin-bottom: 4px;
            }
          }
        }
      }
      .van-col + .van-col {
        border-left: 1px solid rgba(128, 128, 128, 0.3);
      }
      .van-row + .van-row {
        border-top: 1px solid rgba(128, 128, 128, 0.3);
      }
    }
    .jiaotong {
      margin-top: 0.4rem;
      position: relative;
      .bff {
        padding: 15px 10px 15px 0;
      }
      /deep/.van-row {
        margin-left: 20px;
        font-size: 12px;
        background: rgb(242, 242, 242);
      }
      .van-row + .van-row {
        background: transparent;
      }
    }
    .dizhi {
      margin-top: 0.4rem;
      position: relative;
      .bff {
        padding: 15px 10px 15px 0;
      }
      /deep/.van-row {
        margin-left: 20px;
        font-size: 12px;
        background: rgb(242, 242, 242);
      }
      .van-row + .van-row {
        background: transparent;
      }
    }
    .anjian {
      margin-top: 0.4rem;
      position: relative;
      .bff {
        padding: 15px 10px 15px 20px;
      }
      /deep/.van-row {
        font-size: 12px;
        border: 0;
        .title {
          font-size: 14px;
          margin: 5px 0;
        }
        .text {
          color: grey;
          margin-bottom: 5px;
        }
      }
      .van-row + .van-row {
        border-top: 1px solid rgba(128, 128, 128, 0.3);
      }
    }
    /deep/.van-swipe__indicators {
      top: 30px !important;
      right: 10px !important;
      left: auto !important;
      /deep/.van-swipe__indicator {
        width: 10px;
        height: 4px;
        border-radius: 5px;
        background: gray;
      }
      /deep/.van-swipe__indicator--active {
        background-color: #1989fa !important;
      }
    }
    .qinmi {
      margin-top: 0.4rem;
      position: relative;
      padding: 0 10px 0 20px;
      .bff {
        padding: 10px 10px 10px 15px;
      }
      .qinmi_head {
        position: relative;
        .che_xiang {
          border-radius: 50%;
          background-color: rgb(242, 242, 242);
          width: 70px;
          height: 70px;
          overflow: hidden;
          z-index: 2;
          position: relative;
          img {
            position: relative;
            width: 58px;
            margin-top: 4px;
          }
        }
        .right {
          width: 100%;
          .p1 {
            p {
              display: inline-block;
              margin-right: 5px;
              font-size: 12px;
            }
          }
          .p2 {
            margin-top: 4px;
            font-size: 12px;
            color: rgb(166, 160, 255);
          }
          .p3 {
            margin-top: 4px;
            font-size: 12px;
            display: flex;
            div {
              width: 50%;
              display: inline-block;
              .name {
                .tra {
                  color: transparent;
                }
              }
            }
          }
          .p4 {
            margin-top: 4px;
            font-size: 12px;
            .name {
              letter-spacing: 4px;
            }
          }
        }
      }
      .table {
        margin-top: 10px;
        /deep/.van-row {
          font-size: 12px;
          background: rgb(242, 242, 242);
        }
        .van-row + .van-row {
          background: transparent;
        }
        /deep/ .van-row {
          border: 1px solid rgba(128, 128, 128, 0.3);
        }
        /deep/ .van-col {
          height: 30px;
          line-height: 30px;
          padding: 0 5px;
        }
        .van-col + .van-col {
          border-left: 1px solid rgba(128, 128, 128, 0.3);
        }
        .van-row + .van-row {
          border-top: 0;
        }
      }
      .xunhuan + .xunhuan {
        margin-top: 10px;
        padding-top: 5px;
        border-top: 1px dashed rgb(242, 242, 242);
      }
    }
    .kakou {
      padding: 0 15px 10px 15px;
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
        border-color: rgba(128, 128, 128, 0.3);
      }
      /deep/.van-cell:not(:last-child)::after {
        border-color: rgba(128, 128, 128, 0.3);
      }
      .text + .text {
        border-top: 1px solid gray;
      }
      .text {
        padding: 0 15px 0 30px;
        position: relative;
        .xinxi {
          position: absolute;
          border: 1px solid rgba(128, 128, 128, 0.3);
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
      /deep/.van-collapse {
        background-color: #fff;
      }
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
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            position: relative;
          }
          .xian {
            border-bottom: 1px solid;
            width: 60%;
            margin: 0 auto;
            transform: rotate(-35deg);
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