package server

import (
	"YNK_cms/src/models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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


//商品首页
func GoodsIndex(c *gin.Context) {
	Pn , _ := strconv.Atoi(c.Query("page_count"))
	skip := (Pn-1)*15
	//skip := 2
	var goodes []models.GoodSer
	db := models.GetDB()
	defer db.Close()
	db.Table("goods").Offset(skip).Limit(15).Select("goods.price,goods.name,goods.gphoto,goods.id,users.created_at,users.user_name,users.school,users.student_number").Joins("JOIN users ON users.id = goods.user_id").Scan(&goodes)
	c.JSON(http.StatusOK,goodes)
}