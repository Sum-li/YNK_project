package server

import (
	"github.com/gin-gonic/gin"
)

func Startserver() {
	r := gin.Default()
	r.GET("/test",GoodsIndex)
	//r.POST("/file",Upload)
	//r.POST("/goods/pub",Pub_goods)
	//r.GET("/ws",wsHandlee)
	r.Static("/static","~/home/YNK/mygo/src/YNK_cms/src/static")
	_ = r.Run(":80")
}
