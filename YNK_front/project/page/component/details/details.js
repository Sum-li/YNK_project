// page/component/details/details.js
Page({
  data:{
    goods: {
      id: 1,
      images: ['https://i.loli.net/2019/05/11/5cd6683f0d244.jpg',
      'https://i.loli.net/2019/05/11/5cd6683e69b8d.jpg',
      'https://i.loli.net/2019/05/11/5cd6683f0d244.jpg',
      'https://i.loli.net/2019/05/11/5cd6683f1c711.jpg',
      'https://i.loli.net/2019/05/11/5cd6683f3bf75.jpg',
      'https://i.loli.net/2019/05/11/5cd6688074c5b.jpg',
    ],
      title: '新鲜梨花带雨',
      price: 0.01,
      gphoto:'https://i.loli.net/2019/05/11/5cd6683f1c711.jpg',
      detail: '这里是梨花带雨详情。',
      // parameter: '125g/个',
      service: '不支持退货',
      isbuy:false
    },
    user:{
      user_id:"",
      user_name:'',
      user_school:"",
      sell_count:""
    },
    num: 1,
    totalNum: 0,
    isMyself:false,
    hasCarts: false,
    // curIndex: 0,
    show: false,
    scaleCart: false
  },
  onLoad(){
    var _this=this;
    wx.request({
      url:"http://www.schoolbuy.online:80/goods/detail?goods_id=5",
      success:(res)=>{
        console.log(res)
        var good={
          title:res.data.name,
          images:res.data.images,
          price:res.data.price,
          isbuy:res.data.isbuy,
          gphoto:res.data.gphoto,
          detail:res.data.discribe
        }
        var user={
          user_id:res.data.user_id,
          user_name:res.data.username,
          user_school:res.data.school,
          sell_count:res.data.sell_count
        };

        _this.setData({
          goods:good,
          user:user,
        })
      },
      fail(res){
        console.log(res)

      }
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})