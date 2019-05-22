var app = getApp()

Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    page_count: 0,
    loading: false,
    autoplay: false,
    menu_direction:[0,1,0],
    good_list: [{
      name: 'ipad2018 99新 深空灰 在保',
      price: "2099",
      gphoto: 'https://i.loli.net/2019/05/11/5cd6683e69b8d.jpg',
      good_id: '99',
      user_name: '陈同学',
      school: '华北电力大学',
      student_number: '201709000103',
      pub_time: "2014-09-01"
    }, {
      name: 'iphonexsm 99新 金色 在保',
      price: "5099",
      gphoto: 'https://i.loli.net/2019/05/11/5cd6683f0d244.jpg',
      good_id: '919',
      user_name: '陈同学',
      school: '华北电力大学',
      student_number: '201709000103',
      pub_time: "2018-09-01"
    }, {
      name: '漂亮的小裙子 m码',
      price: "199",
      gphoto: 'https://i.loli.net/2019/05/11/5cd6683f1c711.jpg',
      good_id: '1919',
      user_name: '陈同学',
      school: '华北电力大学',
      student_number: '201709000103',
      pub_time: "2018-09-01"

    }, {
      name: '三只松鼠大礼包 原价158，现礼包 原价158，现礼包 原价158，现在只要88！',
      price: "88",
      gphoto: 'https://i.loli.net/2019/05/11/5cd6683f3bf75.jpg',
      good_id: '499',
      user_name: '陈同学',
      school: '华北电力大学',
      student_number: '201709000103',
      pub_time: "2018-09-01"

    }, {
      name: '电动车 能骑到万博来回3次',
      price: "399",
      gphoto: 'https://i.loli.net/2019/05/11/5cd6688074c5b.jpg',
      good_id: '699',
      user_name: '陈同学',
      school: '华北电力大学',
      student_number: '201709000103',
      pub_time: "2018-09-01"

    }, ]
  },

  onLoad(options) {
    // 页面初次加载，请求第一页数据，并且判断是否用户已经授权，若为授权，则转到授权页面
    // this.loadMore(0) //请求第一页
    console.log()
    //查询授权情况
    var _this = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    console.log("初次判断user:" + JSON.stringify(user))
    console.log("初次判断userInfo:" + JSON.stringify(userInfo))
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
    }  
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
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
      url: 'http://www.schoolbuy.online.:80/test',
      data: 0,
      succes: function (res) {
        console.log("request success")
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
        console.log("request success")
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
  }
})