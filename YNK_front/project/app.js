const app = getApp();

App({
  globalData: {
    // url_path: "http://www.schoolbuy.online.:80/",
    appid: 'wx9cfbc6a0999d6e12',
    secret: '3407cf52445ca173899bb2d217b030df',
    category: [{
        name: '电子产品',
        id: '0'
      },
      {
        name: '衣服裙子',
        id: '1'
      },
      {
        name: '零食饮料',
        id: '2'
      },
      {
        name: '点心',
        id: '3'
      },
      {
        name: '粗茶',
        id: '4'
      },
      {
        name: '淡饭',
        id: '5'
      }
    ],
    userID: '',
    socketOpen:false,
    haveUnread:false,
    certified:false//已认证
  },
  onLaunch: function () {
    console.log('App Launch')
    var _this = this
    
    wx.request({
      url: "https://schoolbuy.online:80/goods/category",
      data: {},
      method: 'GET',
      success: function (res) {
        _this.globalData.category = res.data;
        console.log(res)
      }
    });

    wx.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！')
    })
  },
  onShow: function () {
    console.log('App Show')
    // this.socketConn()
    // this.socketOn()
  },
  socketConn() {
    var _this = this
    var user_id = app.globalData.userID
    wx.connectSocket({
      url: `ws://www.schoolbuy.online:800/ws?user_id=${user_id}`,
      success: function (res) {}
    });

    wx.onSocketOpen(function (res) {
      console.log("连接websocket服务器成功。" + res);
      app.globalData.socketOpen = true
    });
  },
  socketOn() { //socket长连接   接受新消息
    var _this = this
    wx.onSocketMessage(function (res) {
      console.log('收到服务器发来消息：' + (res.data));
      if (res.data) { //代表有新消息发来
        app.globalData.haveUnread = true
        wx.showTabBarRedDot({
          index: 3,
        });
      }
    });
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