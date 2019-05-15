const app = getApp();

App({
  globalData:{
    url_path:"http://www.schoolbuy.online.:80/",
    appid:'wxbd407de09e3f2d9b',
    secret:'5be81acd89752e697503caafa0be0bd4',
    category:[
      {name:'电子产品',id:'guowei'},
      {name:'衣服裙子',id:'shucai'},
      {name:'零食饮料',id:'chaohuo'},
      {name:'点心',id:'dianxin'},
      {name:'粗茶',id:'cucha'},
      {name:'淡饭',id:'danfan'}
    ],
    userID:''
  },
  onLaunch: function () {
    console.log('App Launch')
    //获取用户信息
    var _this = this
    // var user=wx.getStorageSync('user') || {};  
    // var userInfo=wx.getStorageSync('userInfo') || {}; 
    // console.log("初次判断user:"+JSON.stringify(  user))
    // console.log("初次判断userInfo:"+JSON.stringify(  userInfo))

    // 获取userinfo
    //获取userinfo的部分先注释掉，因为目前用不到（头像和名字的直接用open-data）
    // if(( !userInfo.nickName)){ 

    //   wx.navigateTo({
    //     url:"page/component/accredit/accredit"
    //   })
    //   wx.login({  
    //   success: function(res){ 
    //       if(res.code) {
    //           wx.getUserInfo({
    //               success: function (res) {
    //                   var objz={};
    //                   objz.avatarUrl=res.userInfo.avatarUrl;
    //                   objz.nickName=res.userInfo.nickName;
    //                   //console.log(objz);
    //                   wx.setStorageSync('userInfo', objz);//存储userInfo
    //               }
    //           });
    //           var d=that.globalData;//这里存储了appid、secret、token串  
    //           var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';  
    //           wx.request({  
    //               url: l,  
    //               data: {},  
    //               method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    //               // header: {}, // 设置请求的 header  
    //               success: function(res){ 
    //                 console.log("请求openID:"+JSON.stringify(   res.data))
    //                   var obj={};
    //                   obj.openid=res.data.openid;  
    //                   obj.expires_in=Date.now()+res.data.expires_in;  
    //                   wx.setStorageSync('user', obj);//存储openid  
    //               }  
    //           });
    //       }else {
    //           console.log('获取用户登录态失败！' + res.errMsg)
    //       }          
    //     }//end success  
    //   }); 
    // }
    wx.login({
      success:function(res){
        if(res.code) {
          var d=_this.globalData;  
          var l='https://api.weixin.qq.com/sns/jscode2session?appid='+d.appid+'&secret='+d.secret+'&js_code='+res.code+'&grant_type=authorization_code';  
          wx.request({  
            url: l,  
            data: {},  
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function(res){ 
              console.log("请求openID:"+JSON.stringify(res.data))
              var openid=res.data.openid;
              wx.request({
                url: "http://schoolbuy.online.:80/login",  
                data:openid,
                success:(res)=>{
                  _this.globalData.userID=res.data
                  console.log(_this.globalData.userID)
                }
              })  
            }  
          });
        }
      }//end successs
    }) //end wx.login
    




    //获取分类信息
    wx.request({  
      url: "http://schoolbuy.online.:80/category",  
      data:{},
      method:'GET',
      success: function(res){ 
        _this.globalData.category=res.data;
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
