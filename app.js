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
      this.globalData.avatar = userInfo.avatar;
      this.globalData.gender = userInfo.sex;
      this.globalData.token = userInfo.token;
    }else{
      console.log('需要登陆');
      wx.redirectTo({
        url: '/pages/partFirst/login/login',
      })
    }
    
  },
  globalData: {
    userName: '默认名字',
    password: 'morenmima',
    avatar:'http://127.0.0.1/php4Homework/avatar/default.png',
    gender:1,
    token: "658ba7e7314267075967da52e7ca2e0a55875890"
  }
})