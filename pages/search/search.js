// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      sear_content:'落地窗',
      data:'',
      addr: app.globalData.mydomain
  },
  search:function(e){
    this.setData({
      //将输入的数据修改同步
      sear_content:e.detail.value
    })
    
  },
  toinfo:app.toinfo,
  searchGo:function() {
    console.dir("123");
    var that = this;
    wx.request({
      url: 'https://www.kervi.cn/v1/descsearch',
      data:{
        gjz:this.data.sear_content
      },success:res=>{
        var shuju = res.data.data;
        that.setData({
          datas:shuju
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})