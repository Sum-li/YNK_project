// page/component/orders/orders.js
let app =  getApp();
  
Page({
  data:{
    userID:'',
    address:"",
    phone:"",
    hasAddress: true,
    total:0,
    good_id:"3",
    good_images:['https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg',
      'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg',
      'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg',
      'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg',
      'https://i.loli.net/2019/05/20/5ce2ae0e814eb58405.jpg',            
    ],
    good_name:"ipad air2 99新",
    good_price:"999",    
    pay_type_arr:[
      '面交',
      '配送帮',
      // '邮递'
    ],
    pay_type:0,
    objectArray: [
      {
        id: 0,
        name: '面交'
      },
      {
        id: 1,
        name: '邮递'
      },
      {
        id: 2,
        name: '配送帮'
      }
    ],
    
  },
  onLoad(options){
    // this.setData({
    //   good_id:options.good_id
    // })
    console.log(options)
    this.setData({
      good_id:options.good_id
    })
    this.fresh()
  },
  fresh(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var _this=this;
    wx.request({
      url:`https://www.schoolbuy.online:80/goods/detail?goods_id=${_this.data.good_id}`,
      data:{
        good_id:_this.good_id
      },
      success:(res)=>{
        console.log(res)
        _this.setData({
          good_name:res.data.name,
          good_images:res.data.images,
          good_price:res.data.price
        })
      },
      complete(res){
        wx.hideLoading();
      }
    })
  },

  onReady() {
    // this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
    var userid=app.globalData.userID;
    this.setData({
      userID:userid
    })
  },
  bindPickerChange(e){
    this.setData({
      pay_type: e.detail.value
    })
  },

  toPay() {
    wx.showLoading({
      title: '正在下单',
      mask: true
    })
    var _this=this
    var _data=this.data;
    wx.request({
      url:"https://www.schoolbuy.online:80/logic/buy",
      method:"get",
      data:{
        user_id:_data.userID,
        goods_id:_data.good_id,
        address:_data.address,
        telephone:_data.phone,
        distribution_id:_data.pay_type+1
      },
      success(res){
        console.log("success")
        console.log(res)
        wx.redirectTo({
          url: '../cart4/cart4',
          success: (result) => {
            
          },
          fail: () => {},
          complete: () => {}
        });
          
        wx.showLoading({
          title: '操作成功',
          mask: true
        })
        setTimeout(()=>{
          wx.hideLoading()

        },500)
      },
      fail(res){
        wx.showLoading({
          title: '操作失败',
          mask: true
        })
        setTimeout(()=>{
          wx.hideLoading()
        },500)
      },
      complete(res){
      }
    })
  },
  
  tipPsb(){
    wx.showModal({
      title: '关于配送帮',
      content: '平台免费配送，我们将送货上门，待您亲自查看无误后再确认收货，如有不满意可当场拒签，无须面交，少点麻烦，多点安全。',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  changeAddress(e){
    this.setData({
      address:e.detail.value
    })
        console.log(e.detail)

  },
  changePhone(e){
    this.setData({
      phone:e.detail.value
    })
    console.log(e.detail)
  },
})