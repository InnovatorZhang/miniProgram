// pages/partDownload/partDownload.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    downloadList:[],
    percent:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = app.globalData.token;
    //var token = "b9eafd0b3604b38c10af36c97dfd907f24126aee";
    this.getdownloadList(token);
  },
  /**
   * 获取下载资源列表
   */
  getdownloadList(token) {
    var that = this;
    wx.request({
      url: 'http://120.77.212.41/MYHTML/php4Homework/download/index.php',
      method: 'POST',
      data: {
        "type": 0,
        "content": {
          "token": token,
        }
      },
      success: function (res) {
        if (res.data.ErrorCode == 0) {
          that.setData({ downloadList: res.data.content.data});
        } 
      }
    })
  },
  /**
   * 下载资料
   */
  clickToDownload(e){
    var downloadpath = e.target.id;
    wx.showToast({
      title: '开始下载...',
    });
    this.startDownload(downloadpath);
  },
  /**
   * 下载的函数
   */
  startDownload(downloadPath){
    var that = this;
    //拿到下载任务对象
    const downloadTask = wx.downloadFile({
      url: downloadPath,
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success:function(res){
            wx.showToast({
              title: '保存成功了'
            });
          },
          fail: function (res) {
            wx.showToast({
              title: '保存成功了'
            })
          }
        })
      }
    });
    downloadTask.onProgressUpdate((res) => {
       //console.log('下载进度', res.progress)
      // console.log('已经下载的数据长度', res.totalBytesWritten)
      // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
      this.setData({ persent: res.progress});
    })
  }
})