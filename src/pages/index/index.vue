<template>
  <div class="index">
    <div class="banner">
      <swiper indicator-dots="true" autoplay="true" indicator-color="#fff" indicator-active-color="rgba(0,0,0,.4)">
        <block v-for="i in imgUrls" :key="i">
          <swiper-item>
            <img :src="i" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <div class="headimg">
        <open-data type="userAvatarUrl"></open-data>
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(i,index) in list" :key="index">
        <div class="headimg">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="detail">
          <div class="title">
            <div class="nickname">
              <open-data type="userNickName"></open-data>
            </div>
            <div class="tags">
              <div class="tag">
                {{i.type1_name}}
              </div>
              <div class="tag">
                {{i.type2_name}}
              </div>
              <div class="tag">
                {{i.type3_name}}
              </div>
            </div>
          </div>
          <rich-text class="content" :nodes="i.html">
          </rich-text>
          <div class="img-list" v-if="i.pick==1">
            <div class="img-item" v-for="(i,imgIndex) in i.imgs" :key="imgIndex">
              <img :src="i" />
            </div>
          </div>
          <div class="video-box" v-if="i.pick==2">
            <video class="video" :id="'videoPlay'+index" :src="i.video" loop="true" controls></video>
          </div>
          <div class="sub">
            <div class="time">
              {{i.time}}
            </div>
            <div class="operation">
              <div class="button" @click="copyText(i)">复制文案</div>
              <div class="button" @click="saveAll(i)">一键保存</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="list.length==0&&render">- - 暂无信息 - -</div>
    <view class="section">
      <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
        <div class="search">
          <img src="../../../static/search.png" />
          <p>分类搜索</p>
        </div>
      </picker>
    </view>
  </div>
</template>

<script>
  import fly from '../../utils/fly'
  import { formatTime } from '../../utils/index'
  export default {
    components: {},
    data() {
      return {
        imgUrls: [],
        list: [],
        multiArray: [],
        multiIndex: [],
        render: false,
        //筛选
        filter_type_one: 0,
        filter_type_two: 0,
        filter_type_three: 0,
        //分页
        indexPage: 1,
      }
    },
    async created() {
      let confiRes = await fly.get('api/index/getConfig')
      if(confiRes.code == 0) {
        //图片处理
        this.imgUrls = confiRes.data.top.split(',')
        //筛选处理
        let type1Arr = ['全部'],
          type2Arr = ['全部'],
          type3Arr = ['全部'];
        confiRes.data.type_one.forEach(i => {
          type1Arr.push(i.name)
        })
        confiRes.data.type_two.forEach(i => {
          type2Arr.push(i.name)
        })
        confiRes.data.type_three.forEach(i => {
          type3Arr.push(i.name)
        })
        this.multiArray.push(type1Arr)
        this.multiArray.push(type2Arr)
        this.multiArray.push(type3Arr)
        this.type_oneArr = confiRes.data.type_one
        this.type_twoArr = confiRes.data.type_two
        this.type_threeArr = confiRes.data.type_three

      }
      let listRes = await fly.get('api/index/getList')
      if(listRes.code == 0) {
        listRes.data.list.forEach(i => {
          //文案处理
          //i.html = i.info.replace(/\s+/g, "<br/>");
          let strContent = i.info;
          strContent = strContent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
          strContent = strContent.replace(/\n/g, '<br/>'); //IE7-8
          strContent = strContent.replace(/\s/g, ' '); //空格处理
          i.html = strContent;
          //图片处理
          i.imgs = i.imgs.split(',');
          //时间处理
          i.time = formatTime(new Date(i.modtime * 1000)).substring(0, 16)
        })
        this.list = listRes.data.list
      }
      this.render = true
    },
    mounted() {},
    onShow() {},
    methods: {
      async init() {},
      async bindMultiPickerChange(e) {
        let value = e.mp.detail.value;
        this.multiIndex = value;
        this.filter_type_one = value[0] != 0 ? this.type_oneArr[value[0] - 1].id : 0;
        this.filter_type_two = value[1] != 0 ? this.type_twoArr[value[1] - 1].id : 0;
        this.filter_type_three = value[2] != 0 ? this.type_threeArr[value[2] - 1].id : 0;
        let listRes = await fly.get('api/index/getList', {
          type_one: this.filter_type_one,
          type_two: this.filter_type_two,
          type_three: this.filter_type_three
        })
        listRes.data.list.forEach(i => {
          //文案处理
          let strContent = i.info;
          strContent = strContent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
          strContent = strContent.replace(/\n/g, '<br/>'); //IE7-8
          strContent = strContent.replace(/\s/g, ' '); //空格处理
          i.html = strContent;
          //图片处理
          i.imgs = i.imgs.split(',');
          //时间处理
          i.time = formatTime(new Date(i.modtime * 1000)).substring(0, 16)
        })
        this.list = listRes.data.list
      },
      bindMultiPickerColumnChange(e) {},
      copyText(i) {
        //      let removeTag = i.info.replace(/<\/?.+?>/g, "");
        //      let removeTag = removeTag.replace(/&nbsp;/g, "")
        wx.setClipboardData({
          data: i.info,
          success(res) {}
        })
      },
      saveAll(item) {
        //      let removeTag = item.info.replace(/<\/?.+?>/g, "");
        //      removeTag = removeTag.replace(/&nbsp;/g, "")
        wx.setClipboardData({
          data: i.info,
          success(res) {}
        })
        if(item.imgs.length > 0 && i.pick == 1) {
          item.imgs.forEach(pic => {
            wx.downloadFile({
              url: pic, // 仅为示例，并非真实的资源
              success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if(res.statusCode === 200) {
                  console.log('下载成功')
                }
              }
            })
          })
        }
        if(item.video && i.pick == 2) {
          wx.downloadFile({
            url: item.video, // 仅为示例，并非真实的资源
            success(res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if(res.statusCode === 200) {
                console.log('下载成功')
              }
            }
          })
        }
      },
      //已经购买过了显示详情
    },
    onUnload() {},
    onShareAppMessage: function(res) {
      if(res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '',
        path: '/pages/index/main',
        success: function(res) {},
        fail: function(res) {
          // 转发失败
        }
      }
    },
    async onPullDownRefresh() {
      wx.showLoading();
      let listRes = await fly.get('api/index/getList', {
        type_one: this.filter_type_one,
        type_two: this.filter_type_two,
        type_three: this.filter_type_three
      })
      listRes.data.list.forEach(i => {
        //文案处理
        let strContent = i.info;
        strContent = strContent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
        strContent = strContent.replace(/\n/g, '<br/>'); //IE7-8
        strContent = strContent.replace(/\s/g, ' '); //空格处理
        i.html = strContent;
        //图片处理
        i.imgs = i.imgs.split(',');
        //时间处理
        i.time = formatTime(new Date(i.modtime * 1000)).substring(0, 16)
      })
      this.list = listRes.data.list
      this.indexPage = 0;
      wx.hideLoading()
      wx.stopPullDownRefresh()
    },
    async onReachBottom() {
      wx.showLoading()
      if(this.list.length % 20 == 0) {
        this.indexPage++;
        let listRes = await fly.get('api/index/getList', {
          type_one: this.filter_type_one,
          type_two: this.filter_type_two,
          type_three: this.filter_type_three,
          page: this.indexPage
        })
        listRes.data.list.forEach(i => {
          //文案处理
          let strContent = i.info;
          strContent = strContent.replace(/\r\n/g, '<br/>'); //IE9、FF、chrome
          strContent = strContent.replace(/\n/g, '<br/>'); //IE7-8
          strContent = strContent.replace(/\s/g, ' '); //空格处理
          i.html = strContent;
          //图片处理
          i.imgs = i.imgs.split(',');
          //时间处理
          i.time = formatTime(new Date(i.modtime * 1000)).substring(0, 16)
        })
        this.list = listRes.data.list
      }
      wx.hideLoading()
    },
  }
</script>

<style lang="scss">
  .index {
    .search {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      left: 30rpx;
      top: 50%;
      transform: translateY(-50%);
      width: 100rpx;
      height: 100rpx;
      background: #a91c25;
      color: #FFFFFF;
      font-size: 20rpx;
      border-radius: 50%;
      animation: spoken 3s infinite;
      img {
        width: 40rpx;
        height: 40rpx;
      }
    }
    @keyframes spoken {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      to {
        transform: scale(1);
      }
    }
    .no-data {
      text-align: center;
      color: #999999;
    }
    .banner {
      position: relative;
      swiper {
        width: 100vw;
        height: 40vw;
      }
      swiper-item {
        img {
          width: 100%;
          height: 100%;
        }
      }
      .headimg {
        position: absolute;
        right: 30rpx;
        top: calc(40vw - 82rpx);
        overflow: hidden;
        display: block;
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
      }
    }
    .list {
      margin-top: 100rpx;
      .item {
        box-sizing: border-box;
        padding: 50rpx 30rpx;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #aaa;
        &:last-child {
          border-bottom: none;
        }
        .headimg {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          flex-shrink: 0;
          overflow: hidden;
        }
        .detail {
          width: 570rpx;
          .title {
            min-height: 60rpx;
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .nickname {
              color: #a91c25;
            }
            .tags {
              padding: 10rpx 0;
              display: flex;
              justify-content: flex-end;
              .tag {
                border-radius: 6rpx;
                color: #a91c25;
                border: 1rpx solid #a91c25;
                height: 40rpx;
                font-size: 20rpx;
                margin-left: 10rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 10rpx;
              }
            }
          }
          .content {}
          .img-list {
            margin-top: 20rpx;
            display: flex;
            flex-wrap: wrap;
            .img-item {
              width: 170rpx;
              height: 170rpx;
              margin-right: 30rpx;
              margin-bottom: 30rpx;
              &:nth-child(3n) {
                margin-right: 0;
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .video-box {
            margin-top: 20rpx;
            margin-bottom: 30rpx;
            video {
              width: 570rpx;
              height: 320rpx;
            }
          }
          .sub {
            height: 40rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .time {
              color: #999999;
              font-size: 22rpx;
            }
            .operation {
              display: flex;
              justify-content: space-between;
              .button {
                height: 40rpx;
                background: #A91C25;
                color: #FFFFFF;
                padding: 0 16rpx;
                font-size: 24rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 6rpx;
                margin-left: 16rpx;
              }
            }
          }
        }
      }
    }
  }
</style>