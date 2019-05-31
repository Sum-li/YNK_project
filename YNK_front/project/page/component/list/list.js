// page/component/list/list.js
Page({
  data:{
    detail:[{
      good_id:1,
      good_gphoto:"asdasd",
      name:"asdasd"
    }],
    key:"",
    cate:"ipad 2018",
    loading:false,
    noMore:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      key:options.key
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})