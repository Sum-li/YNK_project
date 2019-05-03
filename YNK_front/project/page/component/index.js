Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    page_count:0,
    pages:0,
    loading:false,
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    good_list:[{
      name:'ipad2018 99新 深空灰 在保',
      price:"2099",
      gphoto:'/image/s4.png',
      good_id:'99',
      user_name:'陈泽旺',
      school:'华北电力大学',
      student_number:'201709000103',
      pub_time:"2018-09-01"
    },{
      name:'iphonexsm 99新 金色 在保',
      price:"5099",
      gphoto:'/image/s4.png',
      good_id:'919',
      user_name:'陈泽旺',
      school:'华北电力大学',
      student_number:'201709000103',
      pub_time:"2018-09-01"
    },{
      name:'漂亮的小裙子 m码',
      price:"199",
      gphoto:'/image/s1.png',
      good_id:'1919',
      user_name:'陈泽旺',
      school:'华北电力大学',
      student_number:'201709000103',
      pub_time:"2018-09-01"

    },{
      name:'三只松鼠大礼包 原价158，现礼包 原价158，现礼包 原价158，现在只要88！',
      price:"88",
      gphoto:'/image/s2.png',
      good_id:'499',
      user_name:'陈泽旺',
      school:'华北电力大学',
      student_number:'201709000103',
      pub_time:"2018-09-01"

    },{
      name:'电动车 能骑到万博来回3次',
      price:"399",
      gphoto:'/image/s5.png',
      good_id:'699',
      user_name:'陈泽旺',
      school:'华北电力大学',
      student_number:'201709000103',
      pub_time:"2018-09-01"

    },]
  },
  beautify_time(time){ //时间格式：yyyy-mm-dd hh:mm:ss  2018-09-01 11:11:11
    var timestamp=Date.parse(new Date(time))
    var mistiming = Math.round((Date.now() - timestamp) / 1000);
    var postfix = mistiming>0 ? '前' : '后'
    mistiming = Math.abs(mistiming)  //绝对值
    var arrr = ['年','个月','星期','天','小时','分钟','秒'];
    var arrn = [31536000,2592000,604800,86400,3600,60,1];
 
    for(var i=0; i<7; i++){
        var inm = Math.floor(mistiming/arrn[i])
        if(inm!=0){
            return inm+arrr[i] + postfix
        }
    }
  },
  onLoad(options) {
    // 页面初次加载，请求第一页数据
    this.loadMore(0)
  },
  onReachBottom() {
    var _this=this
    console.log("到底了")
    this.loadMore(_this.data.page_count)
    console.log("page_count:"+_this.data.page_count)
  },
  loadMore(page_count){//上拉加载
    // console.log(11111111)
    var _this=this;
    _this.setData({
      loading:true
    })
    wx.request({
      url:'http://www.schoolbuy.online.:80/test',
      data:0,
      succes:function(res){
        console.log("request success")
        var new_goods=res.data;
        var good_list=_this.data.good_list
        good_list.push(new_goods)
        _this.setData({
          good_list:good_list,
          page_count:_this.data.page_count+1,
          loading:false
        })
        // _this.page_count++;
      },
      fail:function(res){
        console.log("加载请求失败："+JSON.stringify(res))
      },
      complete(res){
        console.log("request success")
        if(!res.data){
          console.log("请求下一页失败")
          return
        }
        var new_goods=res.data;
        var good_list=_this.data.good_list
        new_goods.forEach(element => {
          good_list.push(element)
        });
        _this.setData({
          good_list:good_list,
          page_count:_this.data.page_count+1,
          loading:false
        })  
            
      }
    })
  }
})