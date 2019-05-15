// page/component/publish/publish.js
import { $init, $digest } from '../../../util/common.util'
import { promisify } from '../../../util/promise.util'

const wxUploadFile = promisify(wx.uploadFile)



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
    good_name:'',//名字
    category_id:'',//分类id
    quickinput_index:-1,
    textarea_value:"",//详细描述
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
      const category_id = this.data.index
      const price = this.data.price;
      var good_id=1;//后台传回来的
      const _this=this



      // good_name && textarea_value
      if (1) {
        wx.showLoading({
          title: '发布中...',
          mask: true
        })
          
        wx.uploadFile({
          url:"http://www.schoolbuy.online.:80/pub",
          filePath: _this.data.images[0],
          name: 'gphoto',
          formData:{
            name:good_name,
            user_id:"12345",
            name:good_name,
            category_id:category_id,
            price:price,
            discribe:textarea_value
          },
          success:(res)=>{
            // console.log("返回good_id的res.data："+ JSON.parse(res.data).ID)
            good_id=JSON.parse(res.data).ID;
            console.log("good_id:"+good_id)
            
            const arr = _this.data.images.map( (path,index) => {
              // if(index==0){
              //   return wxUploadFile({
              //     url: "http://www.schoolbuy.online.:80/pub",
              //     filePath: path,
              //     name: 'gphoto',
              //     formData:{
              //       name:good_name,
              //       category_id:category_id,
              //       user_id:"123",
              //       price:price,
              //       discribe:'textarea_value'
              //     }
              //   })
              // }else{
              //   return wxUploadFile({
              //     url: "http://www.schoolbuy.online.:80/pub",
              //     filePath: path,
              //     name: 'image',
              //     formData:{
              //       name:good_name,
              //       user_id:"123",
              //     }
              //   })
              // }
              if(index>0){
                return wxUploadFile({
                  url: "http://www.schoolbuy.online.:80/photo",
                  filePath: path,
                  name: 'image',
                  formData:{
                    name:good_name,
                    user_id:"12345",
                    goods_id:good_id
                  }
                })
              }
            })
            Promise.all(arr).then(res => {
                // 上传成功，获取这些图片在服务器上的地址，组成一个数组
                // console.log("发布商品res:"+ JSON.stringify(res))
                // return res.map(item => JSON.parse(item.data).url)
              }).catch(err => {
                console.log(">>>>error:", err)
              }).then(res => {
                // 发布成功，转到刚才发布的物品页
                wx.redirectTo({ url: '../index' }) 
              }).then(() => {
                wx.hideLoading()
              })
          }
        })

        // 将选择的图片组成一个Promise数组，准备进行并行上传
       
        // 开始并行上传图片
        // Promise.all(arr).then(res => {
        //   // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        //   console.log("发布商品res:"+ JSON.stringify(res))
        //   return res.map(item => JSON.parse(item.data).url)
        // }).catch(err => {
        //   console.log(">>>>error:", err)
        // }).then(res => {
        //   // 发布成功，转到刚才发布的物品页
        //   wx.redirectTo({ url: '../index' }) 
        // }).then(() => {
        //   wx.hideLoading()
        // })
      }
    }
  /**
   * 组件的方法列表
   */
  }
})
