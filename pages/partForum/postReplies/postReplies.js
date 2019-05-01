// pages/partForum/postReplies/postReplies.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postId:1,
    replies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = this.data.postId;
    console.log("postId is " + options.postId);
    if (options.postId){
      postId = options.postId;
    }
    var token = app.globalData.token;
    this.getReplies(token, postId);
  },
  /**
   * 获取回复列表
   */
  getReplies(token,postId){
    var that = this;
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/forum/getInformation.php',
      //url: 'http://120.77.212.41/MYHTML/php4Homework/information/getInformation.php',
      method: 'POST',
      data: {
        "type": 4,
        "content": {
          "token": token,
          "postId": postId
        }
      },
      success: function (res) {
        if (res.data.ErrorCode == 0) {
          that.setData({ replies: res.data.content.data });
        } else {
          console.log('没有回复哦');
        }
      }
    })
  }
})