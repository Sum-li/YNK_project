const app = getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        var _this = this;

    },
    bindGetUserInfo: function (e) {
        var userInfo=e.detail.userInfo
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var _this = this;
            //发送用户信息给后台

            var userInfoObj={}
            userInfoObj.nickName=userInfo.nickName;
            userInfoObj.avatarUrl=userInfo.avatarUrl;
            userInfoObj.province=userInfo.province;
            userInfoObj.city=userInfo.city;
            userInfoObj.userGender	=userInfo.userGender;
            wx.setStorageSync('userInfo', userInfoObj); 
            //授权成功后，跳转进入小程序首页
            wx.switchTab({
                url: '../index'
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: 'warming',
                content: '您拒绝了授权，某些功能可能无法使用',
                showCancel: false,
                confirmText: '我知道了',
                success: function (res) {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '../index'
                        })
                    }
                }
            })

        }
    },

})