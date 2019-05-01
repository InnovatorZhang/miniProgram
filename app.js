//app.js在这里取出磁盘中的token替换掉gobal中的token，token应该有login.js登陆时保存在磁盘中
//没有token的话就跳转到登陆界面
App({
  onLaunch: function () {

    var userInfo = wx.getStorageSync('userInfo');
    //如果磁盘中有数据则进入主页面，若没有数据则登陆
    if (userInfo){
      console.log('读取磁盘中信息');
      this.globalData.userName = userInfo.username;
      this.globalData.password = userInfo.password;
      //this.globalData.avatar = userInfo.avatar;
      this.globalData.gender = userInfo.gender;
      this.globalData.token = userInfo.token;
    }else{
      console.log('需要登陆');
      //有时候跳转不了
      wx.redirectTo({
        url: '/pages/partFirst/login/login',
      });
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.avatar = res.userInfo.avatarUrl;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userName: '请登录',
    password: 'morenmima',
    avatar:'http://127.0.0.1/php4Homework/avatar/default.png',
    gender:1,
    token: "658ba7e7314267075967da52e7ca2e0a55875890"
  }
})