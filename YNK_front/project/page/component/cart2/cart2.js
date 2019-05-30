// page/component/cart2/cart2.js
let app =  getApp();

  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [
    //   {
    //   name: "ipadair2air2air2air2air2air2air2air2air2air2air2air2 99新",
    //   number: "21312312598653-07869",
    //   money: "999",
    //   status: "订单已结束"
    // }
  ],
    page_count:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    this.fresh()

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

  },
  edit(e) {
    wx.navigateTo({
      url: '../publish/publish',
      success: (result) => {

      },
      fail: (res) => {
        console.log(res)
      },
      complete: () => {}
    });
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },

  preventTouchMove: function () {

  },
  fresh(){
    var _this=this
    console.log("fresh")
    wx.request({
      url: "https://www.schoolbuy.online:80/goods/mypub",
      data: {
        user_id: app.globalData.userID,
        page_count:_this.data.page_count
      },
      success(res) {
        console.log(res)
        var orders=_this.data.orders
        var newgoods=res.data
        for(var i=0;i<newgoods.length;i++){
          orders.push(newgoods[i])
        }
        _this.setData({
          orders:orders,
          page_count:_this.data.page_count+1
        })
      }
    })
  },

  go: function () {
    this.setData({
      showModal: false
    })
  }
})