var app = getApp();


Page({
  data: {
    category: [{
        name: '点心',
        id: 'dianxin'
      },
      {
        name: '粗茶',
        id: 'cucha'
      },
      {
        name: '淡饭',
        id: 'danfan'
      }
    ],
    detail: [],
    curIndex: 0,
    isScroll: false,
    toView: 'guowei',
    open: false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: ''
  },
  onReady() {
    var self = this;
    console.log(app.globalData)
    self.setData({
      category: app.globalData.category
    })

    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
      success(res) {
        // console.log(res.data)
        self.setData({
          detail: res.data
        })
      }
    });

  },

  switchTab(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      toView: e.currentTarget.dataset.id,
      curIndex: e.currentTarget.dataset.id
    })
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
    }else if(this.data.staus == 1 && this.data.startmark > this.data.newmark){
      this.setData({
        translate: 'transform: translateX(0px)'
      })
      this.data.staus = 1;
    }else {
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