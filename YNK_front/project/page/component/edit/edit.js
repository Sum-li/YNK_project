// page/component/edit/edit.js
import {
  $init,
  $digest
} from '../../../util/common.util'
import {
  promisify
} from '../../../util/promise.util'
let app = getApp();


const wxUploadFile = promisify(wx.uploadFile)


Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_id: 1,
    good_name: '', //名字
    category_id: '', //分类id
    quickinput_index: -1,
    textarea_value: "", //详细描述
    price: "",
    category: ["其他", "交通工具", "电子产品", "衣物鞋子", "书本教材"], //可选的物品种类
    index: 0, //picker组件用到
    images: [],
    gphoto: '',
    img_remove: [],
    img_new: [],
    options: ['新旧程度:', '入手渠道:', '使用感受:', '出手原因:'],
    old_gphoto: ""
  },

  onLoad: function (options) {
    $init(this) //图片选择功能初始化

    var _this = this
    var temp = []
    app.globalData.category.forEach((element, index) => {
      temp[index] = element.name
    });
    this.setData({
      category: temp,
      good_id: options.good_id,
    })
    this.fresh()
  },
  fresh() {
    var _this = this
    console.log("Resad")
    console.log(_this.data.good_id)
    wx.request({
      url: `https://www.schoolbuy.online:80/goods/detail`,
      data: {
        user_id: app.globalData.userID,
        goods_id: _this.data.good_id
      },
      success: (res) => {
        console.log(res)
        var temp_imgs = res.data.images || []
        var temp_gphoto = res.data.gphoto
        temp_imgs.unshift(temp_gphoto)
        _this.setData({
          good_name: res.data.name,
          images: temp_imgs,
          price: res.data.price,
          textarea_value: res.data.discribe,
          gphoto: res.data.gphoto
        })

      },
    });

  },

  inputedit(e) {
    this.setData({
      good_name: e.detail.value
    });
  },
  textareaedit(e) {
    this.setData({
      textarea_value: e.detail.value
    });
  },
  priceEdit(e) {
    this.setData({
      price: e.detail.value
    });
  },

  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'], //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        var temp = this.data.img_new.concat(res.tempFilePaths)
        this.setData({
          img_new: temp
        })
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

    var signal = 0
    var img_remove = this.data.img_remove
    var img_new = this.data.img_new
    img_new.forEach((element, index) => {
      if (element == e.target.dataset.url) {
        img_new.splice(index, 1)
        signal = 1
      }
    });
    if (signal == 1) { //删的是新加的

    } else { //删的是旧的
      img_remove.push(e.currentTarget.dataset.url)
      console.log(e.currentTarget)
    }
    this.setData({
      img_remove: img_remove,
      img_new: img_new
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },

  select(e) {
    var value = this.data.textarea_value;
    value += "\n" + this.data.options[e.detail.index]
    this.setData({
      textarea_value: value
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
    const _this = this

    // console.log(good_name)
    // console.log(textarea_value)

    // console.log(category_id)

    // console.log(price)


    var images = this.data.images
    var img_remove = this.data.img_remove
    var img_new = this.data.img_new
    var new_gphoto = images[0]
    var old_gphoto = this.data.gphoto

    if (old_gphoto == new_gphoto) { //首图没换
      console.log("首图没换")
      wx.request({
        url: "https://www.schoolbuy.online:80/logic/editgoods",
        data: {
          goods_id:_this.data.good_id,
          name: good_name,
          category_id: category_id+1,
          price: price,
          discribe: textarea_value,
          img_remove:img_remove,
          gphoto:new_gphoto
        },
        success(res) {
          console.log(res)
          var arr = img_new.map((path, index) => {
            if (index >= 0) {
              return wxUploadFile({
                url: "https://www.schoolbuy.online:80/logic/photo",
                filePath: path,
                name: 'image',
                formData: {
                  name: good_name,
                  user_id: app.globalData.userID,
                  goods_id: _this.data.good_id
                }
              })
            }
          })
          Promise.all(arr).then(res => {
            console.log(res)
            // 上传成功，获取这些图片在服务器上的地址，组成一个数组
            // console.log("发布商品res:"+ JSON.stringify(res))
            // return res.map(item => JSON.parse(item.data).url)
          }).catch(err => {
            console.log(">>>>error:", err)
          }).then(res => {
            // 发布成功，清空输入框、转到刚才发布的物品页
            // wx.navigateTo({
            //   url: `../details/details?good_id=${good_id}`
            // })
          }).then(() => {
            // _this.setData({
            //   good_name: '',
            //   textarea_value: "",
            //   price: 0,
            //   images: []
            // })


            wx.hideLoading()
          })
        },
        complete(res) {
          wx.navigateBack({
            delta:1
          })

        }
      })
    } else { //首图换了
      var signal = 0; //信号变量，判断新的首图是旧图的一部分还是新选择的
      images.forEach(element => {
        if (new_gphoto == element) {
          signal = 1
        }
      });

      if (signal == 1) { //新的首图是旧图的一部分
        console.log("新的首图是旧图的一部分")
        console.log(img_remove)
        wx.request({
          url: "https://www.schoolbuy.online:80/logic/editgoods",
          data: {
            goods_id:_this.data.good_id,
            name: good_name,
            category_id: category_id+1,
            price: price,
            discribe: textarea_value,
            img_remove:img_remove,
            gphoto:new_gphoto

          },
          success(res) {
            console.log(res)
            var arr = img_new.map((path, index) => {
              if (index > 0) {
                return wxUploadFile({
                  url: "https://www.schoolbuy.online:80/logic/photo",
                  filePath: path,
                  name: 'image',
                  formData: {
                    name: good_name,
                    user_id: app.globalData.userID,
                    goods_id: _this.data.good_id
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
              // 发布成功，清空输入框、转到刚才发布的物品页
              // wx.navigateTo({
              //   url: `../details/details?good_id=${good_id}`
              // })
            }).then(() => {
              // _this.setData({
              //   good_name: '',
              //   textarea_value: "",
              //   price: 0,
              //   images: []
              // })


              wx.hideLoading()
            })
          }
        })

      } else { //新的首图是是新选择的
        console.log("新的首图 是 是新选择的")

        wx.uploadFile({
          url: "https://www.schoolbuy.online:80/logic/editgoods",
          filePath: images[0],
          name: 'gphoto',
          formData: {
            goods_id:_this.data.good_id,
            name: good_name,
            category_id: category_id+1,
            price: price,
            discribe: textarea_value, 
            img_remove:img_remove,
          },
          success(res) {
            console.log(res)
            var arr = img_new.map((path, index) => {
              if (index > 0) {
                return wxUploadFile({
                  url: "https://www.schoolbuy.online:80/logic/photo",
                  filePath: path,
                  name: 'image',
                  formData: {
                    name: good_name,
                    user_id: app.globalData.userID,
                    goods_id: _this.data.good_id
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
              // 发布成功，清空输入框、转到刚才发布的物品页
              // wx.navigateTo({
              //   url: `../details/details?good_id=${good_id}`
              // })
            }).then(() => {
              // _this.setData({
              //   good_name: '',
              //   textarea_value: "",
              //   price: 0,
              //   images: []
              // })


              wx.hideLoading()
            })








          }
        })


      }
    }


    // good_name && textarea_value
    // if (good_name) {
    //   wx.showLoading({
    //     title: '发布中...',
    //     mask: true
    //   })

    //   wx.uploadFile({
    //     url: "https://www.schoolbuy.online:80/logic/pub",
    //     // filePath: _this.data.images[0] ||null,
    //     filePath: null,
    //     name: 'gphoto',
    //     formData: {
    //       name: good_name,
    //       user_id: app.globalData.userID,
    //       name: good_name,
    //       category_id: category_id,
    //       price: price,
    //       discribe: textarea_value
    //     },
    //     success: (res) => {
    //       good_id = JSON.parse(res.data).ID;
    //       console.log("good_id:" + good_id)

    //       const arr = _this.data.img_new.map((path, index) => {

    //         if (index > 0) {
    //           return wxUploadFile({
    //             url: "https://www.schoolbuy.online:80/logic/photo",
    //             filePath: path,
    //             name: 'image',
    //             formData: {
    //               name: good_name,
    //               user_id: app.globalData.userID,
    //               goods_id: good_id
    //             }
    //           })
    //         }
    //       })
    //       Promise.all(arr).then(res => {
    //         // 发布成功，清空输入框、转到刚才发布的物品页
    //         wx.navigateTo({
    //           url: `../details/details?good_id=${good_id}`
    //         })
    //       }).then(() => {
    //         _this.setData({
    //           good_name: '',
    //           textarea_value: "",
    //           price: 0,
    //           images: []
    //         })

    //         wx.hideLoading()
    //       })
    //     }
    //   })

    // }
  },
  onUnload: function () {

  },




})