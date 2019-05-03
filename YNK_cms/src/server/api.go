package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func test(c *gin.Context) {
	c.String(http.StatusOK,"成功hahahahhahaha")
}

func Pub_goods(c *gin.Context)  {
	type MyGoods struct {
		Name string		`gorm:"not null" form:"name" json:"name" binding:"required"`
		Discribe string		`form:"discribe" json:"discribe" binding:"required"`
		Price string		`gorm:"not null" json:"price" form:"price" binding:"required"`
		CategoryID uint		`gorm:"not null" json:"categoryid" form:"categoryid" binding:"required"`
		UserID uint		`gorm:"not null" json:"userid" form:"userid" binding:"required"`
		Gphoto string	`gorm:"not null" json:"gphoto" form:"gphoto" binding:"required"`
	}
	var mygoods MyGoods
	if err := c.ShouldBind(&mygoods); err != nil {
		c.JSON(http.StatusBadRequest,gin.H{"error" :err.Error()})
		return
	}
	c.JSON(http.StatusOK,mygoods)
}

func Upload(c *gin.Context) {
	file ,_ := c.FormFile("file")
	fmt.Printf("%#v",file)
}