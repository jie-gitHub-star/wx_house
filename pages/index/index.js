//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    addr: app.globalData.mydomain,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    datas:'',
    selfpage:1,
    last_page:'',
    headpic:"../../icon/index/head.jpg",
    icons: [{
     src:"../../icon/index/t1(1).svg", txt:"绿化"
    },{
      src: "../../icon/index/t1(2).svg", txt: "健康"
    }, {
      src: "../../icon/index/t1(3).svg", txt: "安静"
    }, {
      src: "../../icon/index/t1(4).svg", txt: "和谐"
    }]
  },
  //跳转到详情页，带上id
  toinfo:function(e){
    // console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../shopinfo/shopinfo?rid=' + e.currentTarget.id
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goSearch:function(){
    wx.switchTab({
      url: '../search/search',
    })
  },
  onLoad: function () {
    var that = this;//获取到onLoad()对象
    wx.request({
      url: 'https://www.kervi.cn/v1/houses',
      data:{'page':1,'index':'1'},
      success:function(res){
        that.setData({
          datas: res.data.data.data,//获取全部数据
          last_page: res.data.data.last_page//获取最大页
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //自定义函数
  tosea:function(){
    wx.navigateTo({
      url: '../second_house/second_house',
    })
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    let that = this;
    let selfpage = this.data.selfpage;
    let last_page = this.data.last_page;
    //判断是不是最后一页
    if (selfpage <= last_page){
      //如果不是，加载下一页，然后页数加一
      selfpage+=1;
      // 原本数据
      var pdata = this.data.datas;
      wx.request({
        url: 'https://www.kervi.cn/v1/houses',
        data: { 'page': selfpage, 'index': '1' },
        success: function (res) {
          that.setData({
            selfpage:selfpage,
            //concat()拼接两个数组
            datas: pdata.concat(res.data.data.data),
            last_page: res.data.data.last_page,//获取最大页
          })
        }
      })
    }else{
      // 提示最后一页了
    }
    
  }
})
