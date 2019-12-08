// pages/user_info/user_info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   avatars:null,
   uname:'',
   islogin:false
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
  userInfoHandler:function(res){
    app.globalData.userInfo = res.detail.userInfo;
    
    this.setData({
      avatars: app.globalData.userInfo.avatarUrl,
      uname: app.globalData.userInfo.nickName,
      islogin:true
    })
  
     // 发一份给服务器
    wx.request({
      url: 'https://www.kervi.cn/v1/houses',
      method: 'post',
      data: {
        type: 'userinfo',
        userinfo: res.detail.userInfo,
        uid: app.globalData.uid
      }, success: res => {
        // console.dir(res.data);
      }
    })


    // // 获取用户信息  底层的接口，说废弃就废弃，腾讯nb
    // wx.getSetting({
    //   success: res => {
    //     // console.dir(res);
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.dir(res);
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo;
    //           this.setData({
    //             avatars: app.globalData.userInfo.avatarUrl,
    //             uname: app.globalData.userInfo.nackName
    //           })
              
    //          
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  outlogin:function(res){
    this.setData({
      islogin:false,
      avatars:''
    })
    app.globalData.userInfo=''
  },
  //跳转到now页面
  getcoll:function(){
    wx.navigateTo({
      url: '../now/now',
    })
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