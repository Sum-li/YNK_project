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