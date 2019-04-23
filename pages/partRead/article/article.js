// pages/partRead/article/article.js
/**
 * TODO
 * 在这个页面中请求具体的文章的信息，将wxml中的静态信息改成变量绑定请求
 */
const app = getApp();
Page({

  data: {
    title: 'Article Name',
    author: 'zzh',
    article:'这里是内容',
    avatar: "/assets/images/icon_tabbar.png",
    articleId: 1
  },

  /**
   * 在这个方法中拿到articleList传来的参数并进行网络请求，拿到文章的内容
   */
  onLoad: function(options) {
    var articleId = this.data.articleId;
    console.log("articleId is " + options.articleId);
    if (options.articleId) {
      articleId = options.articleId;
    }
    //这时候先用默认的token，后面改成登陆时保存到全局变量中，这里用全局变量中的token进行登陆
    this.getArticlesList(articleId, app.globalData.token);
  },

  /**
   * 联网获取数据
   */
  getArticlesList(articleId, token) {
    var that = this;
    wx.request({
      url: 'http://localhost/php4homework/information/getInformation.php',
      // url: 'http://120.77.212.41/MYHTML/php4Homework/information/getInformation.php',
      method: 'POST',
      data: {
        "type": 2,
        "content": {
          "token": token,
          "articleId": articleId
        }
      },
      success: function(res) {
        var author = res.data.content.data[0].author;
        var title = res.data.content.data[0].title;
        var avatar = res.data.content.data[0].avatar;
        var article = res.data.content.data[0].article;
        var articleId = res.data.content.data[0].id;
        that.setData({
          title: title,
          author: author,
          avatar: avatar,
          article: article,
          articleId: articleId
        })
      }
    })
  }
})