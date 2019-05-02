// pages/partForum/postReplies/postReplies.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postId:1,
    replies:[],
    reply:'',
    inputText:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = this.data.postId;
    console.log("postId is " + options.postId);
    if (options.postId) {
      postId = options.postId;
      this.setData({
        postId: postId
      })
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
  ,
  inputReply(e) {
    this.setData({
      reply: e.detail.value
    })
  },
  tapToConfirm() {
    var postId = this.data.postId;
    var token = app.globalData.token;
    var reply = this.data.reply;
    this.submitReply(postId, reply, token);
  },
  /**
   * 向服务器提交回复
   */
  submitReply(postId, reply, token) {
    var that = this;
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/forum/getInformation.php',
      method: 'POST',
      data: {
        "type": 2,
        "content": {
          "token": token,
          "content": reply,
          "postId": postId
        }
      },
      success: function (res) {
        if (res.data.ErrorCode == 0) {
          wx.showToast({
            title: '提交成功',
          })
          that.setData({inputText:''});
          //刷新页面
          that.getReplies(token, postId);
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
      }
    })
  }
})