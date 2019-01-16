<template>
  <div class="loading">
    <div class="bg"><img src="../../../static/bg.jpg" /></div>
    <img class="logo" src="../../../static/logo.png" />
    <img mode="widthFix" class="spoken" src="../../../static/spoken2.png" />
    <div class="button" @click="gotoIndex">
      点击开启新时代
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    async created() {},
    mounted() {},
    onShow() {},
    methods: {
      gotoIndex() {
        wx.navigateTo({
          url: '/pages/index/main'
        })
      }
    },
    onUnload() {},
    onShareAppMessage: function(res) {},
    onPullDownRefresh() {},
  }
</script>

<style lang="scss">
  .loading {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    .bg {
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .logo {
      display: block;
      width: 280rpx;
      height: 280rpx;
      margin: 0 auto 0;
    }
    .spoken {
      display: block;
      margin-top: -50rpx;
      animation: spoken 8s infinite;
      width: 600rpx;
    }
    @keyframes spoken {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      to {
        transform: scale(1);
      }
    }
    .button {
      z-index: 9999;
      position: fixed;
      bottom: 10vh;
      left: 50%;
      transform: translateX(-50%);
      width: 75%;
      line-height: 80rpx;
      text-align: center;
      color: #FFFFFF;
      background: rgba(0, 0, 0, .4);
      border-radius: 10rpx;
    }
  }
</style>