package server

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func test(c *gin.Context) {
	c.String(http.StatusOK,"成功hahahahhahaha")
}

func Pub_goods(c *gin.Context)  {
	//type MyGoods struct {
	//	Name string		`gorm:"not null" form:"name" json:"name" binding:"required"`
	//	Discribe string		`form:"discribe" json:"discribe" binding:"required"`
	//	Price string		`gorm:"not null" json:"price" form:"price" binding:"required"`
	//	CategoryID uint		`gorm:"not null" json:"categoryid" form:"categoryid" binding:"required"`
	//	UserID uint		`gorm:"not null" json:"userid" form:"userid" binding:"required"`
	//	Gphoto string	`gorm:"not null" json:"gphoto" form:"gphoto" binding:"required"`
	//}
	//var mygoods MyGoods
	//if err := c.ShouldBind(&mygoods); err != nil {
	//	c.JSON(http.StatusBadRequest,gin.H{"error" :err.Error()})
	//	return
	//}
	//c.JSON(http.StatusOK,mygoods)


}

//func Upload(c *gin.Context) {
//	file ,_ := c.FormFile("file")
//	fmt.Printf("%#v",file)
//}


////商品首页
//func GoodsIndex(c *gin.Context) {
//	Pn , _ := strconv.Atoi(c.Query("page_count"))
//	skip := (Pn-1)*15
//	var goodes []models.GoodSer
//	db := models.GetDB()
//	defer db.Close()
//	db.Table("goods").Offset(skip).Limit(15).Select("goods.price,goods.name,goods.gphoto,goods.id,users.created_at,users.user_name,users.school,users.student_number").Joins("JOIN users ON users.id = goods.user_id").Scan(&goodes)
//	c.JSON(http.StatusOK,goodes)
//}

////分类商品页面
//func GoodsCategory(c *gin.Context) {
//	categoryid,_ := strconv.Atoi(c.Query("category_id"))
//	Pn , _ := strconv.Atoi(c.Query("page_count"))
//	skip := (Pn-1)*15
//	var goodes []models.GoodSer
//	db := models.GetDB()
//	defer db.Close()
//	db.Table("goods").Where("category_id = ?",categoryid).Offset(skip).Limit(15).Select("goods.price,goods.name,goods.gphoto,goods.id,users.created_at,users.user_name,users.school,users.student_number").Joins("JOIN users ON users.id = goods.user_id").Scan(&goodes)
//	c.JSON(http.StatusOK,goodes)
//}


//func Uploadimg(c *gin.Context) {
////	form,_ := c.MultipartForm()
////	images := form.File["image"]
////	name := c.PostForm("name")
////	urllist:= make([]string,0)
////
////	for _,img := range images {
////		base := filepath.Base(img.Filename)
////		dst := fmt.Sprintf("/home/YNK/mygo/src/YNK_cms/src/static/gphoto/%s%s",name,base)
////		url := fmt.Sprintf("http://www.schoolbuy.online./static/gphoto/%s%s",name,base)
////		urllist = append(urllist, url)
////		if err := c.SaveUploadedFile(img,dst); err != nil {
////			log.Printf("图片上传失败%v",err)
////			return
////		}
////		log.Printf("图片上传成功")
////	}
////	c.JSON(http.StatusOK,urllist)
////}
//
//func GetCategory(c *gin.Context) {
//	var categorieslist []models.CategorySer
//	db:=models.GetDB()
//	defer db.Close()
//	db.Table("categories").Order("id").Find(&categorieslist)
//	c.JSON(http.StatusOK,categorieslist)
//}

//func GetUserid(c *gin.Context) {
//	var user models.User
//	db := models.GetDB()
//	defer db.Close()
//	openid := c.Query("openid")
//	if db.Table("users").Where("openid = ?",openid).First(&user).RecordNotFound(){
//		user.Openid = openid
//		db.Create(&user)
//	}
//	c.String(http.StatusOK,fmt.Sprintf("%v",user.ID))
//}
//





























