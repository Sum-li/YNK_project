package API

import (
	"YNK_cms/src/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)


//前端获取所有分类
func GetCategory(c *gin.Context) {

	db:=models.GetDB()
	defer db.Close()

	var categorieslist []models.CategorySer

	db.Table("categories").Order("id").Find(&categorieslist)
	c.JSON(http.StatusOK,categorieslist)
}

//商品首页
func GoodsIndex(c *gin.Context) {

	db := models.GetDB()
	defer db.Close()

	Pn , _ := strconv.Atoi(c.Query("page_count"))
	skip := (Pn-1)*15

	var goodes []models.GoodSer

	db.Table("goods").Offset(skip).Limit(15).Select("goods.price,goods.name,goods.gphoto,goods.id,users.created_at,users.user_name,users.school,users.student_number").Joins("JOIN users ON users.id = goods.user_id").Scan(&goodes)

	c.JSON(http.StatusOK,goodes)
}

//分类商品页面
func GoodsCategory(c *gin.Context) {

	db := models.GetDB()
	defer db.Close()

	categoryid,_ := strconv.Atoi(c.Query("category_id"))
	Pn , _ := strconv.Atoi(c.Query("page_count"))
	skip := (Pn-1)*15

	var goodes []models.GoodSer

	db.Table("goods").Where("category_id = ?",categoryid).Offset(skip).Limit(15).Select("goods.price,goods.name,goods.gphoto,goods.id,users.created_at,users.user_name,users.school,users.student_number").Joins("JOIN users ON users.id = goods.user_id").Scan(&goodes)

	c.JSON(http.StatusOK,goodes)
}

//商品详情页面
func Goodsdetail(c *gin.Context) {

	db := models.GetDB()
	defer db.Close()

	intgoods_id, _ := strconv.Atoi(c.Query("goods_id"))
	goods_id := uint(intgoods_id)

	var goods models.Goods
	var images []string

	db.Table("goods").Where("id = ?",goods_id).First(&goods)
	db.Table("photos").Where("goods_id = ?",goods_id).Pluck("photo",&images)

	var result = make(map[string]interface{})
	result["name"] = goods.Name
	result["discribe"] = goods.Discribe
	result["price"] = goods.Price
	result["category_id"] = goods.CategoryID
	result["user_id"] = goods.UserID
	result["is_buy"] = goods.Is_buy
	result["gphoto"] = goods.Gphoto
	result["images"] = images

	c.JSON(http.StatusOK,result)

}