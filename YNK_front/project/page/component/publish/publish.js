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
    good_name:'',
    quickinput_index:-1,
    textarea_value:"",
    category: ["其他","交通工具","电子产品","衣物鞋子","书本教材"],//可选的物品种类
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
    index: 0,  //picker组件用到
    images: [],
    options:['新旧程度:','入手渠道:','使用感受:','出手原因:','222222','222222','222222','222222','222222']
  },
 
  
  methods: {
    onReady: function (e) {

      $init(this)//图片选择功能初始化
    },
    inputedit(e){
      let value = e.detail.value;
      this.data.good_name=value;
      this.setData({
        name:this.data.good_name
      });
    },
    textareaedit(e){
      let value = e.detail.value;
      this.data.textarea_value=value;
      this.setData({
        name:this.data.textarea_value
      });
    },
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
    submitForm(e) {
      const good_name = this.data.good_name
      const textarea_value = this.data.textarea_value
  
      if (good_name && textarea_value) {
        wx.showLoading({
          title: '发布...',
          mask: true
        })
  
        // 将选择的图片组成一个Promise数组，准备进行并行上传
        const arr = this.data.images.map(path => {
          return wxUploadFile({
            url: "",
            filePath: path,
            name: 'qimg',
          })
        })
  
        // 开始并行上传图片
        Promise.all(arr).then(res => {
          // 上传成功，获取这些图片在服务器上的地址，组成一个数组
          return res.map(item => JSON.parse(item.data).url)
        }).catch(err => {
          console.log(">>>> upload images error:", err)
        }).then(urls => {
          // 调用保存问题的后端接口
          return createQuestion({
            title: title,
            content: content,
            images: urls
          })
        }).then(res => {
          // 发布成功，转到刚才发布的物品页
          wx.redirectTo({ url: 'pageE' }) 
        }).then(() => {
          wx.hideLoading()
        })
      }
    }
  /**
   * 组件的方法列表
   */
  }
})
