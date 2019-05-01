// page/component/publish/publish.js
import { $init, $digest } from '../../../util/common.util'




Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    accountName: "asaa",
    quickinput_index:-1,
    textarea_value:"",
    category: ["交通工具","电子产品","衣物鞋子","书本教材"],
    objectArray: [
      {
        id: 0,
        name: '交通工具'
      },
      {
        id: 1,
        name: '电子产品'
      },
      {
        id: 2,
        name: '衣物鞋子'
      },
      {
        id: 3,
        name: '书本教材'
      }
    ],
    index: 0,
    images: [],
    options:['新旧程度：','入手渠道：','使用感受：','出手原因：','222222','222222','222222','222222','222222']
    
  },
 
  
  methods: {
    onReady: function (e) {
      this.dialog = this.selectComponent("#dialog");//调用选择器

      $init(this)//图片选择功能初始化
    },
    toggle() {
      this.dialog.toggle()
    },  
    switchAccount: function (options) {
      this.setData({
        accountName: options.detail
      })

    }, //组件内部的方法将options传递过来的数据使用上
    chooseImage(e) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
        sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
        success: res => {
          const images = this.data.images.concat(res.tempFilePaths)
          // 限制最多只能留下3张照片
          this.data.images = images.length <= 9 ? images : images.slice(0, 9) 
          $digest(this)
        }
      })
    },
    removeImage(e) {
      const idx = e.target.dataset.idx
      this.data.images.splice(idx, 1)
      $digest(this)
    },
    handleImagePreview(e) {
      const idx = e.target.dataset.idx
      const images = this.data.images
      wx.previewImage({
        current: images[idx],  //当前预览的图片
        urls: images,  //所有要预览的图片
      })
    },
    select(e){
      var value=this.data.textarea_value;
      value+="\n"+this.data.options[e.detail.index]
      this.setData({
        textarea_value:value
      })
      
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value
      })
    },
  /**
   * 组件的方法列表
   */
  }
})
