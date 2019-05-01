// pages/partProfile/profile/profile.js
const app = getApp();
Page({
  data: {
    avatar:'http://127.0.0.1/php4Homework/avatar/default.png',
    userName:'默认名字',
    items: [
      {
        icon: '../../../assets/images/iconfont-order.png',
        text: '我的帖子',
        path: '/pages/order/list/index'
      },
      {
        icon: '../../../assets/images/iconfont-addr.png',
        text: '我的学校',
        path: '/pages/address/list/index'
      },
      {
        icon: '../../../assets/images/iconfont-kefu.png',
        text: '联系客服',
        path: '15025508295',
      },
      {
        icon: '../../../assets/images/iconfont-help.png',
        text: '常见问题',
        path: '/pages/help/list/index',
      },
    ],
    settings: [
      {
        icon: '../../../assets/images/iconfont-clear.png',
        text: '清除缓存',
        path: '0.0KB'
      },
      {
        icon: '../../../assets/images/iconfont-about.png',
        text: '关于我们',
        path: '/pages/about/index'
      },
    ]
  },
  onLoad(options) {
    this.setData({ avatar: app.globalData.avatar, userName: app.globalData.userName})
  },
  logout(){
    //退出登陆时跳转到登录界面并清除缓存信息
    wx.showToast({
      icon: 'loading',
      title: '正在注销...',
      duration: 1000
    })
    try {
      // wx.removeStorageSync('userInfo');
      wx.clearStorage();
    } catch (e) {
      console('GG');
    }
    setTimeout(function(){
      wx.redirectTo({
        url: '../../partFirst/login/login',
      })
    },1000)

  }
})