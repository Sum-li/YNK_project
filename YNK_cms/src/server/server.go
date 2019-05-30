package server

import (
	"YNK_cms/src/server/API"
	"YNK_cms/src/server/websocket"
	"github.com/gin-gonic/gin"
	"log"
	"strconv"
)


func Apiserver() {

	r := gin.Default()
	//
	////静态页面渲染
	//r.Static("/static","/home/YNK/mygo/src/YNK_cms/src/static")
	//



	//商品逻辑分组
	goods := r.Group("/goods")
	{
		goods.GET("/category",API.GetCategory)
		goods.GET("/index",API.GoodsIndex)
		goods.GET("/goodscategory",API.GoodsCategory)
		goods.GET("/detail",API.Goodsdetail)
	}

	//用户逻辑分组
	user := r.Group("/user")
	{
		user.GET("/id",API.GetUserid)
	}

	//小程序操作逻辑分组
	logic := r.Group("/logic")
	{
		logic.POST("/pub",API.Pub_goods)
		logic.POST("/photo",API.Photos)
		logic.POST("/coll",API.Collection)
		logic.POST("/buy",API.Buy)
		logic.GET("/isnotread",API.IsNotRead)
		logic.GET("/getchatusersinfo",API.GetChatUsersinfo)
	}

	_ =r.Run(":80")
}

func Socketserver()  {
	r := gin.Default()

	//websocket服务器
	hub := websocket.Socket()
	r.GET("/ws", func(c *gin.Context) {
		id, _ := strconv.Atoi(c.Query("user_id"))
		log.Printf("***********id*******:%v",id)
		websocket.ServeWs(hub,id,c)
		log.Printf("*********没有跳出*********")
	})

	_ =r.Run(":800")
}