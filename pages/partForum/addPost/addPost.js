// pages/partForum/addPost/addPost.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textLength: 0,
    title: '',
    post: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 获取标题
   */
  inputTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  /**
   * 获取内容
   */
  inputPost(e) {
    this.setData({
      post: e.detail.value,
      textLength: e.detail.cursor
    })
  },
  /**
   * 提交帖子到服务器
   */
  tapToConfirm() {
    var post = this.data.post;
    var title = this.data.title;
    if (post && title) {
      var token = app.globalData.token;
      //提交给服务器
      this.submitPost(title, token, post);

    } else {
      wx.showToast({
        title: '请完善信息！',
      })
    }
  },
  /**
   * 提交帖子到服务器中
   */
  submitPost(title, token, post) {
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/forum/getInformation.php',
      method: 'POST',
      data: {
        "type": 1,
        "content": {
          "token": token,
          "title": title,
          "post": post
        }
      },
      success: function (res) {
        if (res.data.ErrorCode == 0) {
          wx.showToast({
            title: '提交成功',
          })
          setTimeout(function () {
            //跳转到帖子列表界面
            wx.navigateBack({
              url: '../postList/postList',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '提交失败',
          })
        }
      }
    })
  }
})