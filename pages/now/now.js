// pages/now/now.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: app.globalData.mydomain,
    datas:''
  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  toinfo:app.toinfo,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://www.kervi.cn/v1/getcolls',
      data:{
        uid:app.globalData.uid
      },success:res=>{
        this.setData({
          datas: res.data.data
        })
      }
    })
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
    let arr2 = this.data.arr2;
    let arr1 = this.data.arr1;
    let res = arr1.concat(arr2);
    this.setData({
      arr1: res
    })
    console.log(arr1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      console.dir('a');
  }
})