<template>
    <div class="information">
        <div class="title">
            车辆信息
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
            v-for="item in option"
            :key="item"
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
                        <van-col span="9">粤A333XX</van-col>
                        <van-col span="15">
                            <van-tag type="primary">广东省广州市</van-tag>
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col
                            span="9"
                            class="grey"
                        >品牌种类：</van-col>
                        <van-col span="15">
                            小型汽车
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col
                            span="9"
                            class="grey"
                        >车身颜色：</van-col>
                        <van-col span="15">
                            白色
                        </van-col>
                    </van-row>
                    <van-row>
                        <van-col
                            span="9"
                            class="grey spac"
                        >所有人：</van-col>
                        <van-col span="15">
                            耿朝继
                        </van-col>
                    </van-row>
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