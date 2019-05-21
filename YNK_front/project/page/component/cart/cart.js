// page/component/new-pages/cart/cart.js
Page({
  data: {
    hasList:true,          // 列表是否有数据
    goods:[{
      good_id:"1",
      user_id:"1",
      good_name:"Ipad air2金色 99新",
      good_gphoto:'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg      ',
      good_desc:`
        2017年购入，64g内存，打游戏没问题
        因换新出手
      `
    },{
      good_id:"1",
      user_id:"1",
      good_name:"Ipad air2金色 99新",
      good_gphoto:'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg      ',
      good_desc:`
        2017年购入，64g内存，打游戏没问题
        因换新出手
      `
    },{
      good_id:"1",
      user_id:"1",
      good_name:"Ipad air2金色 99新",
      good_gphoto:'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg      ',
      good_desc:`
        2017年购入，64g内存，打游戏没问题
        因换新出手
      `
    },{
      good_id:"1",
      user_id:"1",
      good_name:"Ipad air2金色 99新",
      good_gphoto:'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg      ',
      good_desc:`
        2017年购入，64g内存，打游戏没问题
        因换新出手
      `
    },{
      good_id:"1",
      user_id:"1",
      good_name:"漂亮的小裙子 m码",
      good_gphoto:'https://i.loli.net/2019/05/20/5ce2ae119398f76026.jpg',
      good_desc:`
        2017年购入，64g内存，打游戏没问题
        因换新出手
      `
    },{
      good_id:"1",
      user_id:"1",
      good_name:"三只松鼠大礼包 原价158，现礼包 原价158，现礼包 原价158，现在只要88！",
      good_gphoto:'https://i.loli.net/2019/05/20/5ce2ae119565d87811.jpg',
      good_desc:`
        2017年购入，64g内存，打游戏没问题
        因换新出手
      `
    },{
      good_id:"1",
      user_id:"1",
      good_name:"电动车 能骑到万博来回3次能骑到万博来回3次能骑到万博来回3次",
      good_gphoto:'https://i.loli.net/2019/05/20/5ce2ae11e5f2836752.jpg',
      good_desc:`
        2017年购入，64g内存，打游戏没问题
        因换新出手
      `
    },],
    total:""   //收藏的物品总数
  },
  onShow() {

    if(this.data.goods.length==0){
      this.setData({
        hasList: false,
      });
    }


  },
  to(e){
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../details/details',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
    }
  },


})