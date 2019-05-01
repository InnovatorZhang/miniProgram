// pages/partForum/postList/postList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset:0,
    limit:10,
    posts:[],
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
    var newOffset = this.data.offset + 5;
    var limit = this.data.limit;
    var that = this;
    var token = app.globalData.token;
    this.setData({ offset: newOffset })
    this.getPosts(newOffset, limit, token);
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      mask: true,
      duration: 1500
    });
    //一秒后返回顶部
    setTimeout(function () {
      that.setData({ scrollTop: 0 })
    }, 1000)
  },
  /**
   * 获取帖子列表
   */
  getPosts(offset, limit, token){
    var that = this;
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/forum/getInformation.php',
      //url: 'http://120.77.212.41/MYHTML/php4Homework/information/getInformation.php',
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
          that.setData({ posts: res.data.content.data });
        } else {
          console.log('请求失败');
        }
      }
    })
  }
})