// pages/partRead/articleList/articleList.js
const app = getApp();

Page({
  data: {
    articles: [],
    offset:0,
    limit:20,
    scrollTop:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var offset = this.data.offset;
    var limit = this.data.limit;
    var token = app.globalData.token;
    console.log(app.globalData.token);
    this.getArticlesList(offset, limit, token);
  },

  /**
   * 滑动到底部触发的事件
   */
  lower(e) {
    var newOffset = this.data.offset + 20;
    var limit = this.data.limit;
    var that = this;
    var token = app.globalData.token;
    this.setData({offset:newOffset})
    this.getArticlesList(newOffset,limit,token);
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading',
      mask: true,
      duration: 1500
    });
    //一秒后返回顶部
    setTimeout(function(){
      that.setData({ scrollTop: 0 })
    },1000)
    
  },



  /**
   * 联网获取数据
   */
  getArticlesList(offset,limit,token){
    var that = this;
    wx.request({
      url: 'http://localhost/php4Homework/information/getInformation.php',
      //url: 'http://120.77.212.41/MYHTML/php4Homework/information/getInformation.php',
      method: 'POST',
      data: {
        "type": 1,
        "content": {
          "token":token,
          "offset": offset,
          "limit": limit
        }
      },
      success: function (res) {
        that.setData({ articles: res.data.content.data });
      }
    })
  }
})