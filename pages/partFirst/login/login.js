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
      wx.showToast({
        icon: 'loading',
        title: '正在登陆...',
        duration: 1000
      })
      that.login(userName, password);
    } else {
      that.makeABanner();
    }
  },

  /**
   * 跳转到注册界面
   */
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
  },
  /**
   * 弹出提示消息
   */
  makeABanner() {
    var that = this;
    that.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  /**
   * 验证用户名和密码是否正确
   */
  login(userName, password) {
    var that = this;
    //跳转到主页，这里存放网路请求验证和跳转的逻辑,如果登陆失败则makeAToast()
    wx.request({
       url: 'http://127.0.0.1/php4Homework/login/index.php',
      //url: 'http://120.77.212.41/MYHTML/php4Homework/login/index.php',
      method: 'POST',
      data: {
        "type": 0,
        "content": {
          "username": userName,
          "password": password
        }
      },
      success: function(res) {
        if (res.data.ErrorCode == 0) {
          //将用户名和密码保存到全局变量中
          app.globalData.userName = userName;
          app.globalData.password = password;
          app.globalData.gender = res.data.content.data.gender;
          app.globalData.token = res.data.content.data.token;
          app.globalData.avatar = res.data.content.data.avatar;

          //将用户名和密码和token等信息保存到磁盘中,key值为userInfo
          wx.setStorageSync('userInfo', res.data.content.data);
          console.log('正在登陆...');
          setTimeout(function() {
            wx.switchTab({
              url: '../../index/index',
              // url: '../../partRead/articleList/articleList'
            })
          }, 1000);
        } else {
          setTimeout(function() {
            that.makeABanner();
          }, 1000);
        }
      }
    })
    //成功之后将登陆信息保存为全局信息,后面要改成存到磁盘中，每次启动小程序会判断是否登陆过
  }
})