- 创建用户表：   
url: https://localhost/user/login   
context: **openid**   
callback: **user_id**

- 发布商品：   
url: https://localhost/goods/pub   
context: {   
    **category_id**   
    **photos[]** //一个存有图片编码的数组   
    **Gphoto**   //商品的正面图  
    **name**   
    **discribe**   
    **price**   
    **user_id**  //发布者   
    }   
callback: Message //成功或失败

- 收藏商品：   
url: https://localhost/goods/coll    
context: {
    **user_id**   
    **goods_id**    
    }   
callback: Message //成功或失败

- 购买商品：   
url: https://localhost/goods/buy
context:{   
    **good_id**   
    **user_id**   //买家   
    }   
callback: Message //成功或失败

- 添加地址：   
url: https://localhost/user/address   
context: **user_id**   
callback: Message //成功或失败

- 首页商品列表：   
url: https://localhost/goods/Ilsit    
context: **Pn**   //第几次请求   
callback: {  
    **goods** : [  
        {   
            **name**   
            **price**   
            **Gphoto**  
            **good_id**  
    },...  
    ]  
    }   

- 分类列表：   
url: https://localhost/category   
context: none   
callback: {   
    **name**   
    **category_id**   
    }   

- 分类商品列表：  
url: https://localhost/goods/Clist   
context: {   
    **pn**    
    **category_id**
    }   
callback:  {  
    **goods** : [  
        {   
            **name**   
            **price**   
            **Gphoto**  
            **good_id**  
    },...  
    ]  
    }   

- 商品详情页面：   
url: https://localhost/goods/detail    
context: **goods_id**   
callback: {   
    goods: {   
        **category**  
        **discribe**  
        **put_time**
    },  
    photos: [content...],   
    user: {   
        **user_id**  
        **openid**  
    }   
    }
    
  **微信小程序比赛**  https://mp.weixin.qq.com/s?__biz=MjM5NDAxMDg4MA==&mid=2650959617&idx=1&sn=e994a667c4a20bbd272d89262982a32e&chksm=bd788d6e8a0f0478f3caa749cab292708b4161e84f5e52f1beb984c68ec201579593f0d94873&mpshare=1&scene=1&srcid=0311VRpSe0wLkOrdUmNbOcM6&pass_ticket=5EOuj0T7kVHGvSlJb7Kd0aFz63Aq5Xz6DIbPvphvjxk%3D#rd
