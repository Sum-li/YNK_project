var app = getApp();


Page({
    data: {
        category: [
            
            {name:'点心',id:'dianxin'},
            {name:'粗茶',id:'cucha'},
            {name:'淡饭',id:'danfan'}
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onReady(){
        var self = this;
        console.log(app.globalData)
        self.setData({
            category:app.globalData.category
        })
        
        wx.request({
            url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
            success(res){
                // console.log(res.data)
                self.setData({
                    detail : res.data
                })
            }
        });
        
    },
    switchTab(e){
        this.setData({
            toView : e.target.dataset.id,
            curIndex : e.target.dataset.index
        })
    }
    
})