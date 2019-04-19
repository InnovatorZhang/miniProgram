// pages/login/login.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree: false,
    showTopTips: false,
    tips: '用户名或密码错误！请重新输入',
    userName: '',
    password: ''
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !this.data.isAgree
    });
  },

  //这里可以用作当用户登陆失败时就弹出的提示，后面改成与服务器通信验证身份是否通过
  tapToConfirm: function() {
    var that = this;
    var userName = that.data.userName;
    var password = that.data.password;
    if ((userName == '') || (password == '')) {
      that.setData({
        tips: '用户名和密码不能为空！'
      })
    } else {
      that.setData({
        tips: '请阅读并同意相关条款！'
      })
    }
    //不勾选同意和没输入信息不让进
    if (that.data.isAgree && (userName != '') && (password != '')) {
      that.setData({
        tips: '用户名或密码错误！请重新输入'
      })
      //跳转到主页，这里存放网路请求验证和跳转的逻辑,如果登陆失败则makeAToast()
      //TODO
      //成功之后将登陆信息保存为全局信息,后面要改成存到磁盘中，每次启动小程序会判断是否登陆过
      app.globalData.userName = userName;
      app.globalData.password = password;
      wx.navigateTo({
        url: '../../index/index',
      })

    } else {
      makeAToast(that);
    }
  },

  tapToRegister: function() {

    wx.navigateTo({
      url: '../register/register',
    })

  },

  tapToFindBackPW: function() {
    wx.showToast({
      title: '记不到，该背时',
      duration: 2000
    })
  },

  inputName: function(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  inputPW: function(e) {
    this.setData({
      password: e.detail.value
    })
  }

})

//将对象作为参数传入到方法中
function makeAToast(self) {
  self.setData({
    showTopTips: true
  });
  setTimeout(function() {
    self.setData({
      showTopTips: false
    });
  }, 3000);
}