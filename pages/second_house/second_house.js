// pages/second_house/second_house.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpval:'',
    sea_areas:[{
      area_txt:'区域',
      area_icon: "../../icon/arrow-down.svg",
      aid:'areas',
      s:'seainp1'
    },{
      area_txt: "价格",
        area_icon: "../../icon/arrow-down.svg",
        aid:'prices',
        s: 'seainp2'
    }, {
      area_txt: "房型",
        area_icon: "../../icon/arrow-down.svg",
        aid: 'tps',
        s: 'seainp3'
    }, {
      area_txt: "搜索",
        area_icon: "../../icon/arrow-down.svg",
        aid: '3',
        s: 'seainp4'
    }],
    tag:'',
    ishidden:true,
    area:'',
    areas:'',
    prices:'',
    tps:'',
    mores:'',
    seatype:'',
    datas:'',//获取的列表数据
    addr: app.globalData.mydomain
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // var a=this.data.sea_areas[0].area_txt;
      var that = this;
      wx:wx.request({
        url: 'https://www.kervi.cn/v1/cates',
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          that.setData({
            prices: res.data.data[0],
            tps: res.data.data[1],
            areas: res.data.data[2],
          })
        },error:function(res){
        }
      })
  },//区域下拉的按钮
  seainp1:function(e){
    var arr = false;
    var data = this.data.areas;
    this.setData({
      ishidden:arr,
      area:data,
      seatype:'area'
    })
  },//价格下拉的按钮
  seainp2: function (e) {
    var arr = false;
    var data = this.data.prices;
    this.setData({
      ishidden: arr,
      area: data,
      seatype:'price'
    })
  },//房型下拉的按钮
  seainp3: function (e) {
    var arr = false;
    var data = this.data.tps;
    this.setData({
      ishidden: arr,
      area: data,
      seatype:'housetp'
    })
  },//搜索按钮
  seainp4: function (e) {
    wx.navigateTo({
      url: 'pages/second_house/second_house',
    })
  },
  taginfo:function(e){
    var resval = this.data.inpval+','+e.currentTarget.dataset.index;
    this.setData({
      ishidden: true,
      inpval:resval
    })
    var that = this;
    wx.request({
      url: 'https://www.kervi.cn/v1/searchs',
      data:{
        index : e.currentTarget.dataset.index,
        type : this.data.seatype
      },success:function(res){
        var shuju = res.data.data;
        that.setData({
          datas:shuju
        })
      }
    })
  },
  //跳转到详情页，带上id
  toinfo: function (e) {
    wx.navigateTo({
      url: '../shopinfo/shopinfo?rid=' + e.currentTarget.id
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
    wx.getUserInfo({
      success: res => {
        console.log(res);
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
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