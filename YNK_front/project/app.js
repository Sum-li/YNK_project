const app = getApp();

App({
  globalData: {
    url_path: "http://www.schoolbuy.online.:80/",
    appid: 'wxbd407de09e3f2d9b',
    secret: '5be81acd89752e697503caafa0be0bd4',
    category: [{
        name: '电子产品',
        id: 'guowei'
      },
      {
        name: '衣服裙子',
        id: 'shucai'
      },
      {
        name: '零食饮料',
        id: 'chaohuo'
      },
      {
        name: '点心',
        id: 'dianxin'
      },
      {
        name: '粗茶',
        id: 'cucha'
      },
      {
        name: '淡饭',
        id: 'danfan'
      }
    ],
    userID: ''
  },
  getUserId: function () {
    var _this = this;
    var openid = wx.getStorageSync('user').openid;
    if (openid) {
      wx.request({
        url: "",
        data: {
          openid: openid
        },
        success: (res) => {
          _this.globalData.userID = res.data.userid
        }
      })
    }
  },
  onLaunch: function () {
    console.log('App Launch')
    //获取用户信息
    var _this = this
    var user = wx.getStorageSync('user') || {};
    // 获取openid发给后台，获取我们的库中的userid
    if ((!user.openid)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            var d = _this.globalData; //这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET',
              success: function (res) {
                console.log("请求到openID:" + JSON.stringify(res.data))
                var obj = {};
                obj.openid = res.data.openid;
                wx.setStorageSync('user', obj); //存储openid 在缓存
                _this.getUserId();
              }
            });
          } else {
            console.log('获取openid失败' + res.errMsg)
          }
        } //end success  
      }); //end login
    } else {
      _this.getUserId();
    }
    //获取分类信息
    wx.request({
      url: "http://schoolbuy.online.:80/category",
      data: {},
      method: 'GET',
      success: function (res) {
        _this.globalData.category = res.data;
        console.log(res)
      }
    });
  },
  onShow: function () {
    console.log('App Show')

  },
  onHide: function () {
    // wx.closeSocket({
    //   success:function(){
    //     console.log("close success")
    //   }
    // })

    console.log('App Hide')
  },



})