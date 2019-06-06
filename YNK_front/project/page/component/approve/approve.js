// page/component/approve/approve.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    number: "",
    school: "",
    image: null,
    res: {
      name: "",
      number: "",
      school: ""
    },
    yes: 0,
    approved: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this
    console.log(app.globalData)
    if(app.globalData.certified==true){
      console.log(11111)
      this.setData({
        yes:1,
        approved:1
      })
    }
  },
  submit() {
    console.log(11111)
    wx.showLoading({
      title: "认证中",
      mask: true,
    });

    var _this = this
    var data = this.data
    if (data.name && data.school && data.number && data.image != null) {
      wx.uploadFile({
        url: 'https://www.schoolbuy.online:80/logic/authenticate',
        filePath: _this.data.image[0],
        name: "image",
        formData: {
          user_id: app.globalData.userID,
          school: _this.data.school,
          name: _this.data.name,
          school_number: _this.data.number
        },
        success: (res) => {
          console.log(res)
          if(res.data.authentication==true){
            _this.setData({
              res: res.data,
              yes: 1,
              approved:1
            })
          }
          
        },
      });
        
    }
    // _this.setData({
    //   approved: 1
    // })
    wx.hideLoading();

  },

  chooseimg() {
    var _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _this.setData({
          image: tempFilePaths
        })
      }
    })
  },

  bindName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  bindPhone(e) {
    this.setData({
      number: e.detail.value
    });
  },
  bindDetail(e) {
    this.setData({
      school: e.detail.value
    });
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