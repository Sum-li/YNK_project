var app = getApp();


Page({
  data: {
    category: [{
        name: '点心',
        id: '0'
      },
      {
        name: '粗茶',
        id: '1'
      },
    ],
    page_count: [],
    detail: [
      [],
      
      [],[],[],[],[],[],[],
    ],
    curIndex: 0,
    isScroll: false,
    loading: false,
    toView: 0,
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: ''
  },
  onLoad(options) {
    var _this = this;
    var arr = []
    for (let i = 0; i < app.globalData.category.length; i++) {
      arr[i] = 0
    }
    _this.setData({
      category: app.globalData.category,
      page_count: arr
    })
  },
  onReady() {
    this.tap_ch() //进入分类页面时打开菜单
  },
  loadGoods(e) {
    var _this = this
    var id = e.detail.dataset.id

  },
  onReachBottom(){
    this.loadMore()
  },
  loadMore() {
    console.log("loadMore")
    this.data.loading = true
    var _this = this
    wx.request({
      url: 'https://www.schoolbuy.online:80/goods/goodscategory',
      data: {
        category_id: _this.data.curIndex,
        page_count: 1
      },
      success(res) {
        if(res.data.length==0){
          return
        }
        var page_count=_this.data.page_count
        page_count[_this.data.curIndex]++
        console.log(res)
        var new_goods = res.data;
        var good_list = _this.data.detail;
        for(var i=0;i<new_goods.length;i++){
          　　good_list[_this.data.curIndex].push(new_goods[i])
          }
        _this.setData({
          detail: good_list,
          page_count: page_count,
        })
      },
      fail(res) {
        console.log("load more fail")
        console.log(res)

      },
      complete(res) {
        _this.data.loading = false
      }
    })
  },


  switchTab(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      // toView: e.currentTarget.dataset.id,
      curIndex: e.currentTarget.dataset.index
    })
    this.loadMore()
  },
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        translate: 'transform: translateX(0px)'
      })
      this.data.open = false;
    } else {
      this.setData({
        translate: 'transform: translateX(' + this.data.windowWidth * 0.30 + 'px)'
      })
      this.data.open = true;
    }
  },
  tap_start: function (e) {
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    if (this.data.staus == 1) {
      // staus = 1指默认状态
      this.data.startmark = e.touches[0].pageX;
    } else {
      // staus = 2指屏幕滑动到右边的状态
      this.data.startmark = e.touches[0].pageX;
    }

  },
  tap_drag: function (e) {
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if (this.data.mark < this.data.newmark) {
      if (this.data.staus == 1) {
        if (this.data.windowWidth * 0.30 > Math.abs(this.data.newmark - this.data.startmark)) {
          this.setData({
            translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
          })
        }
      }

    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if (this.data.mark > this.data.newmark) {
      if (this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark - this.data.startmark) + 'px)'
        })
      } else if (this.data.staus == 2 && this.data.startmark - this.data.newmark < this.data.windowWidth * 0.30) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newmark + this.data.windowWidth * 0.30 - this.data.startmark) + 'px)'
        })
      }

    }

    this.data.mark = this.data.newmark;

  },
  tap_end: function (e) {
    if (this.data.staus == 1 && this.data.startmark <= this.data.newmark) {
      if (Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth * 0.2)) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.30 + 'px)'
        })
        this.data.staus = 2;
      }
    } else if (this.data.staus == 1 && this.data.startmark > this.data.newmark) {
      this.setData({
        translate: 'transform: translateX(0px)'
      })
      this.data.staus = 1;
    } else {
      if (Math.abs(this.data.newmark - this.data.startmark) <= (this.data.windowWidth * 0.2)) {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.30 + 'px)'
        })
        this.data.staus = 2;
      } else {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }
    }

    this.data.mark = 0;
    this.data.newmark = 0;
  }

})