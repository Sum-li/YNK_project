const app = getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        var that = this;
        // 查看是否授权
        var objz={};
        objz.avatarUrl=res.userInfo.avatarUrl;
        objz.nickName=res.userInfo.nickName;
        //console.log(objz);
        wx.setStorageSync('userInfo', objz);//存储userInfo
        
    },
    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            //发送用户信息给后台
            wx.request({
                url: app.globalData.urlPath + 'user/add',
                data: {
                    openid: getApp().globalData.openid,
                    nickName: e.detail.userInfo.nickName,
                    avatarUrl: e.detail.userInfo.avatarUrl,
                    province:e.detail.userInfo.province,
                    city: e.detail.userInfo.city
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    //从数据库获取用户信息
                    that.queryUsreInfo();
                }
            });
            //授权成功后，跳转进入小程序首页
            wx.switchTab({
                url: '../index'  
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
              title:'warming',
              content:'您拒绝了授权，某些功能可能无法使用',
              showCancel:false,
              confirmText:'我知道了',
              success:function(res){
                  if (res.confirm) {
                    wx.switchTab({
                      url: '../index'  
                    })
                  } 
              }
          })
            
        }
    },
    //获取用户信息接口
    queryUsreInfo: function () {
        wx.request({
            url: app.globalData.urlPath + 'user/userInfo',
            data: {
                openid: app.globalData.openid
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
                console.log("accredit页面的res.data:"+res.data)
                getApp().globalData.userInfo = res.data;
            }
        })
    },

})