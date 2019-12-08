// pages/shopinfo/shopinfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr : app.globalData.mydomain,
    slider:'',
    autoplay:true,
    icon_cell:"../../icon/head.svg",
    icon_share: "../../icon/zhuan.svg",
    acreage: 69,
    dispark: 1,
    district: "南竹子胡同",
    f_time: "2003年",
    feature: "核心卖点：南北板楼",
    floor: 6,
    floor_type: "板楼",
    house_type: "三房1厅1卫",
    issue: "2019-11-20 17:15:29",
    location: "近地铁朝阳门365米",
    oriented: "4",
    referrer: "谢超",
    sell_price: 850,
    spruce: "1",
    trading_area: "朝阳门内",
    unit_price: 12314,    //转发用的
    rid:0 
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target); 
    }
    return {
      title: '爱窝',
      path: 'pages/index/index?rid='+this.data.rid,  // 路径，传递参数到指定页面。
      imageUrl: this.data.slider[0], // 分享的封面图
     success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.rid);
    this.setData({
      rid: options.rid
    })
    var that = this;
    wx:wx.request({
      url: 'https://www.kervi.cn/v1/houses?rid='+options.rid,
      data: {info:1},
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({//你敢信？，下面这堆数据
          slider : res.data.data.pics,
          datas: res.data.data,
          acreage: res.data.data.acreage,
          dispark: res.data.data.dispark,
          district: res.data.data.district,
          f_time: res.data.data.f_time,
          feature: res.data.data.feature,
          floor: res.data.data.floor,
          floor_type: res.data.data.floor_type,
          house_type: res.data.data.house_type,
          issue: res.data.data.issue,
          location: res.data.data.location,
          oriented: res.data.data.oriented,
          referrer: res.data.data.referrer,
          sell_price: res.data.data.sell_price,
          spruce: res.data.data.spruce,
          trading_area: res.data.data.trading_area,
          unit_price: res.data.data.unit_price
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  docollected: function (e) {
    wx.request({
      url: 'https://www.kervi.cn/v1/houses',
      method: 'post',
      data: {
        type: 'collected',
        rid: e.currentTarget.dataset.rid,
        uid: app.globalData.uid
      }, success: res => {
        console.dir(res);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})