<template>
  <div class="login">
    <div class="beijing juzhong">
      <img
        src="../assets/login.jpg"
        class="login_img"
        alt=""
      >
    </div>
    <div class="beijing juzhong">
      <img
        src="../assets/trastion.png"
        class="trastion"
        alt=""
      >
    </div>
    <div class="beijing juzhong">
      <img
        src="../assets/head.png"
        class="head"
        alt=""
      >
    </div>
    <div class="tc logo">
      <img
        src="../assets/logo.png"
        alt=""
      >
      <p>
        <span>云</span>
        <span>搜</span>
      </p>
    </div>
    <div class="button">人脸识别登录</div>
  </div>
</template>
 
<script>
export default {
  name: "login",
  data() {
    return {};
  },
  components: {
    // 组件
  },
  methods: {
    // 函数
  },
  mounted() {
    // 初始化函数
  }
};
</script>
 
<style scoped lang="scss">
.login {
  background-color: rgb(0, 37, 141);
  width: 100%;
  height: 100%;
  overflow: hidden;
  .beijing {
    position: fixed;
    width: 100%;
    height: 100%;
    .login_img {
      width: 100%;
    }
    .trastion {
      width: 170px;
      margin-top: 60px;
      animation: rotating 2s linear infinite;
    }
    @keyframes rotating {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0);
      }
    }
    .head {
      width: 20%;
      margin-top: 50px;
    }
  }
  .logo {
    position: relative;
    margin-top: 70px;
    img {
      width: 30%;
    }
    p {
      font-weight: 600;
      color: #fff;
      font-size: 26px;
      span {
        margin: 0 15px;
      }
    }
  }
  .button {
    position: fixed;
    bottom: 50px;
    width: 60%;
    padding: 10px;
    left: 20%;
    text-align: center;
    background-color: rgb(22, 131, 236);
    color: #fff;
    font-size: 16px;
    border-radius: 10px;
  }
}
</style>