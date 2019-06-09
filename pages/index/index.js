// pages/index2/index2.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['../../assets/images/1185610181AD24DAB537F204F82E9D74.jpg', '../../assets/images/1185610181AD24DAB537F204F82E9D74.jpg',
      '../../assets/images/1185610181AD24DAB537F204F82E9D74.jpg'
    ],
    count:0,
    postion: -1,
    durationTime: 0,
    poster: 'http://120.77.212.41/MYHTML/music/images/彩虹.jpg',
    name: '彩虹',
    author: '周杰伦',
    src: 'http://120.77.212.41/MYHTML/music/周杰伦 - 彩虹.mp3',
    musicList: [],
    isPlaying: false,
    percent: 0,
    currentTime: '00:00',
    duration: "00:00"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.getMusicList();
    
    //修改服务器中用户头像地址,这里等待一秒，因为要等待异步获取的头像地址
    setTimeout(function () {
      that.modifyUserAvatar(app.globalData.avatar);
    }, 1000)
  },
  onReady(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  nextMusic() {
    var postion = (this.data.postion + 1) % this.data.musicList.length;
    this.setData({
      name: this.data.musicList[postion].name,
      author: this.data.musicList[postion].author,
      src: this.data.musicList[postion].src,
      poster: this.data.musicList[postion].picture,
      postion: postion
    });
    console.log('上一首切换：' + this.data.musicList[postion].name);
  },
  preMusic() {
    var postion = (this.data.postion + this.data.musicList.length - 1) % this.data.musicList.length;
    this.setData({
      name: this.data.musicList[postion].name,
      author: this.data.musicList[postion].author,
      src: this.data.musicList[postion].src,
      poster: this.data.musicList[postion].picture,
      postion: postion
    });
    console.log('下一首切换：' + this.data.musicList[postion].name);
  },
  pauseAndPlay() {
    var isPlaying = this.data.isPlaying;
    if (!isPlaying) {
      this.audioCtx.play();
    } else {
      this.audioCtx.pause();
    }
    this.setData({
      isPlaying: !isPlaying
    })
  },
  /**
   * 获取歌曲列表
   */
  // getMusicList() {
  //   var that = this;
  //   wx.request({
  //     url: 'http://127.0.0.1/php4Homework/information/getInformation.php',
  //     method: 'POST',
  //     data: {
  //       "type": 5,
  //       "content": {
  //         "token": "6924b9d8863057b0e964b79e487d6421e8459847"
  //       }
  //     },
  //     success: function (res) {
  //       if (res.data.ErrorCode == 0) {
  //         that.setData({ musicList: res.data.content.data })
  //       }
  //     }
  //   })
  // }
  getMusicList() {
    var that = this;
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/information/getInformation.php',
      method: 'POST',
      data: {
        "type": 5,
        "content": {
          "token": app.globalData.token
        }
      },
      success: function(res) {
        if (res.data.ErrorCode == 0) {
          that.setData({
            musicList: res.data.content.data
          })
        }
      }
    })
  },
  /**
   * 调整进度
   */
  seek(value) {
    this.audioCtx.seek(value);
  },
  /**
   * 拖动进度条改变播放进度
   */
  changeProgress(e){
    console.log('当前秒数:'+Math.ceil(e.detail.value * this.data.durationTime / 100))
    this.audioCtx.seek(Math.ceil(e.detail.value * this.data.durationTime / 100));
    this.setData({percent: e.detail.value});
  },
  /**
   * 获取歌曲的时长和当前时间
   */
  getTime(e) {
    this.data.count = this.data.count +1;
    //减缓一下进度条刷新速度
    if (this.data.count%4==0){
      var duration = Math.ceil((e.detail.duration / 60) - 1) + ':' + Math.ceil(e.detail.duration % 60)
      this.setData({
        currentTime: e.detail.currentTime,
        duration: duration,
        durationTime: e.detail.duration,
        percent: (e.detail.currentTime / e.detail.duration) * 100
      });
    }

  },
  /**
 * 修改用户头像地址
 */
  modifyUserAvatar(avatarUrl) {
    var that = this;
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/modify/avatar/index.php',
      method: 'POST',
      data: {
        "type": 0,
        "content": {
          "avatarUrl": avatarUrl,
          "token": app.globalData.token
        },
        success: function (res) {
          console.log('头像已修改');
        }
      }
    })},
    /**
     * 进入资料下载界面
     */
  tap_download(){
    wx.navigateTo({
      url: '../partDownload/partDownload'
    })
  }
})