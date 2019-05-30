var app = getApp()

Page({
  data: {
    imgUrls: [
      'http://schoolbuy.online:70/static/Poster/poster1.png',
      'http://schoolbuy.online:70/static/Poster/poster2.png',
      'http://schoolbuy.online:70/static/Poster/poster3.png',
    ],
    search_val: "",
    ortherBy: 0,
    page_count: 1,
    loading: false,
    autoplay: false,
    menu_direction: [0, 1, 0],
    good_list: [
    //   {
    //   name: 'ipad2018 99新 深空灰 在保',
    //   price: "2099",
    //   gphoto: 'https://i.loli.net/2019/05/26/5ce9e4fa8824823515.jpg',
    //   good_id: '99',
    //   user_name: '陈同学',
    //   school: '华北电力大学',
    //   student_number: '201709000103',
    //   pub_time: "2014-09-01"
    // }
  ],
    avavtar:""
  },

  onLoad(options) {
    // 页面初次加载，请求第一页数据，并且判断是否用户已经授权，若为授权，则转到授权页面
    // this.loadMore(1) //请求第一页
   
    var _this = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!userInfo.nickName)) {
      console.log("没有授权公开信息 将转入授权页")
      wx.redirectTo({
        url: "accredit/accredit",
      })
      wx.login({
        success: function (res) {
          if (res.code) {
            var d = app.globalData; //这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
            wx.request({
              url: l,
              data: {},
              method: 'GET',
              success: function (res) {
                console.log("请求到openID:" + JSON.stringify(res.data))
                var obj = {};
                obj.openid = res.data.openid;
                wx.setStorageSync('user', obj); //存储openid
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        } //end success  
      });
    } else {
      _this.getUserId(); // 已经授权，把openid、userInfo发给后台，获取我们的库中的userid
      this.data.avavtar=wx.getStorageSync("userInfo").avatarUrl
      this.socketConn()
      this.socketOn()
    }
    this.loadMore(1) //请求第一页

  },
  getUserId: function () {
    console.log("把openid、userInfo发给后台，获取我们的库中的userid")
    var _this = this;
    var openid = wx.getStorageSync('user').openid;
    var userInfo = wx.getStorageSync("userInfo")

    if (openid) {
      wx.request({
        url: "https://www.schoolbuy.online:80/user/id",
        data: {
          openid: openid,
          user_name: userInfo.nickName,
          gphoto: userInfo.avatarUrl
        },
        success: (res) => {
          console.log(res)
          app.globalData.userID = res.data
        }
      })
    }
  },
  bindsearch(e) {
    this.setData({
      search_val: e.detail.value
    })
  },
  onReachBottom() {
    var _this = this
    console.log("到底了")
    this.loadMore(_this.data.page_count)
  },
  loadMore(page_count) { //上拉加载
    var _this = this;
    _this.setData({
      loading: true
    })
    wx.request({
      url: 'https://www.schoolbuy.online:80/goods/index',
      method: "get",
      data: {
        page_count: _this.data.page_count
      },
      succes: function (res) {
        console.log("request success")
        console.log(res)
        var new_goods = res.data;
        var good_list = _this.data.good_list
        good_list.push(new_goods)
        _this.setData({
          good_list: good_list,
          page_count: _this.data.page_count + 1,
          loading: false
        })
      },
      fail: function (res) {
        console.log("加载请求失败：" + JSON.stringify(res))
      },
      complete(res) {
        // console.log("request complete")
        console.log(res)

        if (!res.data) {
          console.log("请求下一页失败")
          return
        }
        var new_goods = res.data;
        var good_list = _this.data.good_list
        new_goods.forEach(element => {
          good_list.push(element)
        });
        _this.setData({
          good_list: good_list,
          page_count: _this.data.page_count + 1,
          loading: false
        })

      }
    })
  },
  menuClick(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      ortherBy: index
    })
  },
  socketConn() {
    var _this = this
    var user_id=app.globalData.userID
    wx.connectSocket({
      url: `ws://www.schoolbuy.online:800/ws?user_id=18`,
      success: function (res) {}
    });

    wx.onSocketOpen(function (res) {
      console.log("连接websocket服务器成功。" + res);
      app.globalData.socketOpen = true
    });
  },
  getUnread() {
    wx.request({
      url: "https://schollbuy.online:80/ws/isnotread",
      data: {
        user_id: app.globalData.userID
      },
      success(res) {
        if (res.data.yes == 1) { //有未读消息

        } else { //无未读消息

        }
      }
    })
  },
  socketOn() { //socket长连接   接受新消息
    var _this=this
    wx.onSocketMessage(function (res) {
      console.log('收到服务器返回内容：' + (res.data));
      if (res.data) {  //代表有新消息发来
        app.globalData.haveUnread = true
        wx.showTabBarRedDot({
          index: 3,
        });
      }
    });
  }

})