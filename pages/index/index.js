//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isDisabled: false,
    punchsignTimes: 0
  },
  /**
   *
   */
  onLoad: function(options) {
    var that = this;
    //检查是否签到了，签过则将按钮不可用
    this.isPunchsigned();
    //获取签到次数
    var token = app.globalData.token;
    this.getPunchsignTimes(token);
    //修改服务器中用户头像地址,这里等待一秒，因为要等待异步获取的头像地址
    setTimeout(function(){
      that.modifyUserAvatar(app.globalData.avatar);
      console.log(app.globalData.avatar);
    },1000)
  },

  /**
   * 签到，签到之后禁用按钮，在这里向服务器发送签到信息
   */
  punchsign() {
    //获取token
    var token = app.globalData.token;
    this.punchsignToServer(token);
  },
  /**
   * 自拍打卡所用方法
   */
  photoPunchsign() {
    wx.showToast({
      title: '自拍的代码',
    });
    wx.chooseImage({
      count: 1,
      sizeType:  'compressed',
      sourceType: 'camera',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePath = res.tempFilePaths[0];
        console.log(tempFilePath);
      }
    })
    //示例代码
    // wx.chooseImage({
    //   success(res) {
    //     const tempFilePaths = res.tempFilePaths
    //     wx.uploadFile({
    //       url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //       filePath: tempFilePaths[0],
    //       name: 'file',
    //       formData: {
    //         user: 'test'
    //       },
    //       success(res) {
    //         const data = res.data
    //         // do something
    //       }
    //     })
    //   }
    // })
  },
  /**
   * 签到所用方法
   */
  punchsignToServer(token) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/php4Homework/punchsign/index.php',
      method: 'POST',
      data: {
        "type": 0,
        "content": {
          "token": token
        }
      },
      success: function(res) {
        if (res.data.ErrorCode == 0) {
          that.setData({
            isDisabled: true
          });
          wx.setStorageSync("punchsign", true);
          //获取当前时间戳
          var timeStamp = Date.parse(new Date())
          console.log(new Date());
          //这里是毫秒为单位的
          var expiretime = timeStamp + 72000000;
          //二十小时后过期
          wx.setStorageSync("expiretime", expiretime);
          wx.showToast({
            title: '签到成功',
          });
          that.setData({
            punchsignTimes: res.data.content.data
          })
        } else {
          console.log('请求失败');
        }
      }
    })
  },
  /**
   * 获取已签到次数
   */
  getPunchsignTimes(token) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/php4Homework/punchsign/index.php',
      method: 'POST',
      data: {
        "type": 1,
        "content": {
          "token": token
        }
      },
      success: function(res) {
        if (res.data.ErrorCode == 0) {
          that.setData({
            punchsignTimes: res.data.content.data
          })
        } else {
          console.log('请求失败');
        }
      }
    })
  },
  /**
   * 检查今天是否签到过了
   */
  isPunchsigned() {
    //这里查看签到按钮今天是否已经按了
    var expiretime = wx.getStorageSync("expiretime") || 0;
    var isDisabled = wx.getStorageSync("punchsign");
    var timestamp = Date.parse(new Date());
    if (timestamp > expiretime) {
      this.setData({
        isDisabled: false
      });
    } else {
      this.setData({
        isDisabled: true
      });
    }
  },
/**
 * 修改用户头像地址
 */
  modifyUserAvatar(avatarUrl) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/php4Homework/modify/avatar/index.php',
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
    })
  },
})