<template>
  <div class="loading">
    <div class="bg"><img src="../../../static/bg.jpg" /></div>
    <!--<div class="black"></div>-->
    <img mode="widthFix" class="black" src="../../../static/black.png" />
    <div class="spoken-text">
      <div class="line2">影视巨星</div>
      <div class="line1">佑珍代言人</div>
    </div>
    <img class="sign" mode="widthFix" src="../../../dist/wx/static/sign.png" />
    <img mode="widthFix" class="logo" src="../../../static/logo.png" />
    <img mode="widthFix" class="spoken" src="../../../static/spoken2.png" />
    <img mode="widthFix" class="product" src="../../../static/product.png" />
    <img mode="widthFix" class="product-chinese" src="../../../static/product-chinese.png" />
    <img mode="widthFix" class="product-english" src="../../../static/product-english.png" />
    <div class="button" @click="gotoIndex">点击开启新时代</div>
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
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    .spoken-text {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      left: 100rpx;
      top: 180rpx;
      .line1 {
        width: 1em;
        font-family: "楷体";
        font-size: 28rpx;
      }
      .line2 {
        margin-top: 3em;
        margin-right: 5rpx;
        width: 1em;
        line-height: 1.5em;
        font-size: 22rpx;
      }
    }
    .sign{
    	position: absolute;
    	top: 380rpx;
    	left: 65rpx;
    	width: 120rpx;
    }
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
      position: absolute;
      top: -20rpx;
      right: 30rpx;
      width: 250rpx;
    }
    .spoken {
      position: absolute;
      top: 120rpx;
      left: 150rpx;
      animation: spoken 8s infinite;
      width: 450rpx;
    }
    .product {
      z-index: 99;
      position: absolute;
      right: 80rpx;
      bottom: 130rpx;
      width: 310rpx;
    }
    .product-chinese {
      z-index: 99;
      position: absolute;
      right: 110rpx;
      bottom: 120rpx;
      width: 250rpx;
    }
    .product-english {
      z-index: 99;
      position: absolute;
      right: 70rpx;
      bottom: 90rpx;
      width: 330rpx;
    }
    .black {
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 750rpx;
      /*height: 672rpx;
      background: url('https://www.zgjiaoli.com/public/images/black.png') bottom / cover;*/
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
    	padding: 20rpx 15rpx;
      z-index: 9999;
      position: absolute;
      top: 250rpx;
      right: 60rpx;
      width: 1em;
      text-align: center;
      color: #FFFFFF;
      background: rgba(0, 0, 0, .4);
      /*background: url('https://www.zgjiaoli.com/public/images/black.png') bottom / cover;*/
      border-radius: 10rpx;
    }
  }
</style>