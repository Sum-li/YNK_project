package server

import (
	"github.com/gin-gonic/gin"
)

func Startserver() {
	r := gin.Default()
	//r.GET("/test",GoodsIndex)
	//r.POST("/file",Uploadimg)
	//r.POST("/goods/pub",Pub_goods)
	//r.GET("/ws",wsHandlee)
	//r.Static("/static","/home/YNK/mygo/src/YNK_cms/src/static")
	//r.GET("/category",GetCategory)
	//r.GET("/login",GetUserid)
	r.GET("/goodscategory",GoodsCategory)
	_ = r.Run(":80")
}
