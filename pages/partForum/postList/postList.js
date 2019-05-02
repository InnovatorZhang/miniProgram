// pages/partForum/postList/postList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset: 0,
    limit: 8,
    posts: [],
    //标志是否继续请求数据
    flag: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var offset = this.data.offset;
    var limit = this.data.limit;
    var token = app.globalData.token;
    this.getPosts(offset, limit, token);
  },
  /**
 * 滑动到底部触发的事件
 */
  lower(e) {
    if (this.data.flag) {
      var offset = this.data.offset;
      var limit = this.data.limit;
      var that = this;
      var token = app.globalData.token;
      this.getPosts(offset, limit, token);
      wx.showToast({
        title: '正在加载数据...',
        icon: 'loading',
        mask: true,
        duration: 1000
      });
      //一秒后返回顶部
      setTimeout(function () {
        that.setData({ scrollTop: 0 })
      }, 1000)
    } else {
      wx.showToast({
        title: '没有数据啦',
        icon: 'none',
        mask: true,
        duration: 1500
      });
    }

  },
  /**
   * 获取帖子列表
   */
  getPosts(offset, limit, token) {
    var that = this;
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/forum/getInformation.php',
      method: 'POST',
      data: {
        "type": 3,
        "content": {
          "token": token,
          "offset": offset,
          "limit": limit
        }
      },
      success: function (res) {
        if (res.data.ErrorCode == 0) {
          var length = res.data.content.data.length;
          if (length < 8) {
            that.setData({ posts: res.data.content.data, offset: offset,flag: false});
          } else {
            that.setData({ posts: res.data.content.data, offset: offset + length });
          }

        } else {
          that.setData({ flag: false });
          console.log('请求失败');
        }
      }
    })
  },
  addPost() {
    wx.navigateTo({
      url: '../addPost/addPost'
    })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.setData({ flag: true });
    var offset = this.data.offset;
    var limit = this.data.limit;
    var token = app.globalData.token;
    this.getPosts(offset, limit, token);
  }
})