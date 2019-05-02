package server

import "github.com/gin-gonic/gin"

func Startserver() {
	r := gin.Default()
	//r.GET("/test",test)
	//r.POST("/file",Upload)
	//r.POST("/goods/pub",Pub_goods)
	r.GET("/ws",wsHandlee)
	_ = r.Run(":80")
}
