// pages/register/register.js
Page({
  data: {
    isAgree: false,
    showTopTips: false,
    tips: '你看哈你两次密码输的一不一样，条款同意没得!',
    userName: '',
    password: '',
    passwordConfirm: ''
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !this.data.isAgree
    });
  },

  //这里可以用作当用户登陆失败时就弹出的提示，后面改成与服务器通信注册用户
  tapToConfirm: function() {
    var that = this;
    var password = that.data.password;
    var passwordConfirm = that.data.passwordConfirm;
    var userName = that.data.userName;

    if ((password == '') || (userName == '') || (passwordConfirm == '')) {
      that.setData({
        tips: '你信息都没填完带嘛！'
      })
    } else {
      that.setData({
        tips: '你看哈你两次密码输的一不一样，条款同意没得!'
      })
    }
    //不勾选同意不让进
    if (that.data.isAgree && (password == passwordConfirm) && (password != '')) {
      //向服务器发送注册请求，注册成功则弹出成功消息并跳转到登陆页面
      wx.showToast({
        title: '正在注册...',
        icon: 'loading',
        mask: true,
        duration: 1000
      });
      that.register(userName, password)
    } else {
      that.makeABanner()
    }
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
  inputPWAgain: function(e) {
    this.setData({
      passwordConfirm: e.detail.value
    })
  },
  /**
   * 发送注册请求的方法，返回值为Boolean代表是否成功
   */
  register(userName, password) {
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/register/index.php',
      //url:'http://120.77.212.41/MYHTML/php4Homework/register/index.php',
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
          setTimeout(function () {
            wx.showToast({
              title: '注册成功啦！'
            })
          }, 500)
          //跳转到登录页，这里存放网路请求验证和跳转的逻辑
          setTimeout(function() {
            wx.navigateTo({
              url: '../login/login',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: '用户名已被使用！'
          })
        }
      }
    })
  },
  makeABanner(){
    var that = this;
    that.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 2500);
  }
})