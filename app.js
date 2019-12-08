//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录

    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: 'https://www.kervi.cn/v1/openid',
          data:{code:res.code},
          //获取后台处理结果
          success:res=>{
            // console.dir(res);
            let uid=res.data.data.uid;
            that.globalData.uid=uid;
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
   
  },
  globalData: {
    userInfo: null,
    mydomain:'https://www.kervi.cn/',
    uid:''
  },
  toinfo:function(e){
    // console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../shopinfo/shopinfo?rid=' + e.currentTarget.id
    })
  }
})