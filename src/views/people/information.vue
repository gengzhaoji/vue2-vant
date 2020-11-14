<template>
    <div class="information">
        <div class="title">
            人员信息
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
            v-for="item in option"
            :key="item"
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
                        <span>张卫兵</span>
                        <van-tag type="primary">男</van-tag>
                        <van-tag type="danger">疑似疫情</van-tag>
                        <van-tag type="primary">涉赌</van-tag>
                    </p>
                    <p>
                        <img
                            src="../../assets/shenfen.png"
                            alt=""
                            class="width"
                        >
                        <span style="color:blue">4009983199110102345</span>
                    </p>
                    <p>
                        <img
                            src="../../assets/dizhi.png"
                            alt=""
                            class="width"
                        >
                        <span>广州省崇左市江州区太平镇江滨街道</span>
                    </p>
                    <p>
                        <img
                            src="../../assets/shouji.png"
                            alt=""
                            class="width"
                        >
                        <span>13679204359</span>
                    </p>
                </div>
            </van-col>
        </van-row>
    </div>
</template>
 
<script>
export default {
    name: 'information',
    data() {
        return {
            option: [{
                chepai: '粤A333XX',
                diqu: '广东省广州市',
                zhonglei: '小型汽车',
                color: '白色',
                people: '耿朝继'
            }, {
                chepai: '粤A333XX',
                diqu: '广东省广州市',
                zhonglei: '小型汽车',
                color: '白色',
                people: '耿朝继'
            }]
        }
    },
    methods: { // 函数
    },
    mounted() { // 初始化函数
    },
}
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