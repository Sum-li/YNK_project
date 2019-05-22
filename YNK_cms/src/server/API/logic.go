package API

import (
	"YNK_cms/src/models"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"path/filepath"
	"strconv"
	"fmt"
)

//发布商品
//包含一张正面图，不包含详情中的图
func Pub_goods(c *gin.Context) {

	db := models.GetDB()
	defer db.Close()

	name := c.PostForm("name")

	intcategory_id, _ := strconv.Atoi(c.PostForm("category_id"))
	category_id := uint(intcategory_id)

	discribe := c.PostForm("discribe")

	intprice, _ := strconv.Atoi(c.PostForm("price"))
	price := uint(intprice)

	intuser_id, _ := strconv.Atoi(c.PostForm("user_id"))
	user_id := uint(intuser_id)

	gphoto, _ := c.FormFile("gphoto")

	dst := fmt.Sprintf("D:\\a_Sum\\golang_project\\code\\src\\YNK_cms\\src\\static\\gphoto\\%d%s%s",user_id,name,filepath.Base(gphoto.Filename))
	url := fmt.Sprintf("http://www.schoolbuy.online./static/gphoto/%d%s%s",user_id,name,filepath.Base(gphoto.Filename))


	if err := c.SaveUploadedFile(gphoto,dst); err != nil {
		log.Printf("图片上传失败%v",err)
		return
	}
	log.Printf("图片上传成功")


	var goods models.Goods = models.Goods{
		Name:name,
		Discribe:discribe,
		Price:price,
		CategoryID:category_id,
		UserID:user_id,
		Gphoto:url,
	}
	db.Create(&goods)

	c.JSON(http.StatusOK,goods)
}


//发布商品时要传的图片
func Photos(c *gin.Context) {

	db := models.GetDB()
	defer db.Close()

	intuser_id, _ := strconv.Atoi(c.PostForm("user_id"))
	user_id := uint(intuser_id)

	intgoods_id, _ := strconv.Atoi(c.PostForm("goods_id"))
	goods_id := uint(intgoods_id)

	name := c.PostForm("name")

	image, _ := c.FormFile("image")

	dst := fmt.Sprintf("D:\\a_Sum\\golang_project\\code\\src\\YNK_cms\\src\\static\\image\\%d%s%s",user_id,name,filepath.Base(image.Filename))
	url := fmt.Sprintf("http://www.schoolbuy.online./static/image/%d%s%s",user_id,name,filepath.Base(image.Filename))


	if err := c.SaveUploadedFile(image,dst); err != nil {
		log.Printf("图片上传失败%v",err)
		return
	}
	log.Printf("图片上传成功")

	img := models.Photos{
		Photo:url,
		GoodsID:goods_id,
	}
	db.Create(&img)

	c.JSON(http.StatusOK,img)
}


//收藏商品
func Collection(c *gin.Context) {

	db := models.GetDB()
	defer db.Close()

	intuser_id, _ := strconv.Atoi(c.PostForm("user_id"))
	user_id := uint(intuser_id)

	intgoods_id, _ := strconv.Atoi(c.PostForm("goods_id"))
	goods_id := uint(intgoods_id)

	coll := models.Collections{
		UserID:user_id,
		GoodsID:goods_id,
	}
	db.Create(&coll)

	c.JSON(http.StatusOK,"")
}


//购买商品
func Buy(c *gin.Context) {

	db := models.GetDB()
	defer db.Close()

	//买家的id
	intuser_id, _ := strconv.Atoi(c.PostForm("user_id"))
	user_id := uint(intuser_id)

	intgoods_id, _ := strconv.Atoi(c.PostForm("goods_id"))
	goods_id := uint(intgoods_id)

	//改变商品的状态
	var goods models.Goods
	db.Table("goods").Where("id = ?",goods_id).First(&goods)
	goods.Is_buy = true
	db.Save(&goods)

	//创建购买记录
	buy := models.Buy{
		UserID:user_id,
		GoodsID:goods_id,
	}
	db.Create(&buy)

	c.JSON(http.StatusOK,true)
}




/*

关于websocket聊天的逻辑api

 */


//判断是否有未读消息
func IsNotRead(c *gin.Context)  {
	db := models.GetDB()
	defer db.Close()

	var chatinfo []models.Chatinfo
	db.Table("chatinfos").Where("is_read = ?",false).Find(&chatinfo)
	c.JSON(http.StatusOK,len(chatinfo)>0)
}

//获取聊天列表的用户公开信息
func GetChatUsersinfo(c *gin.Context)  {
	db := models.GetDB()
	defer db.Close()

	//该用户的id
	intuser_id, _ := strconv.Atoi(c.Query("user_id"))
	user_id := uint(intuser_id)

	type Chatuserinfo struct {
		UserName string		`json:"naame"`
		School string		`json:"school"`
		Gphoto	string		`json:"gphoto"`
	}

	var ChatUserId = make(map[uint]uint)
	var res Chatuserinfo
	var result []Chatuserinfo
	var chatinfo []models.Chatinfo

	db.Table("chatinfos").Where("receive_id = ? AND is_read = ?",user_id,false).Find(&chatinfo)
	for _,v := range chatinfo {
		if _, ok := ChatUserId[v.SendID]; !ok {
			ChatUserId[v.SendID] = v.SendID
		}
	}
	 for _,v := range ChatUserId {
	 	db.Table("users").Where("id = ?",v).Scan(&res)
	 	result = append(result,res)
	 }

	 c.JSON(http.StatusOK,result)
}

//获取单个聊天用户的公开信息
func GetChatUserinfo(c *gin.Context)  {
	db := models.GetDB()
	defer db.Close()

	//发送消息的用户的id
	intuser_id, _ := strconv.Atoi(c.Query("send_id"))
	send_id := uint(intuser_id)

	type Chatuserinfo struct {
		UserName string		`json:"naame"`
		School string		`json:"school"`
		Gphoto	string		`json:"gphoto"`
	}

	var result Chatuserinfo

	db.Table("users").Where("id = ?",send_id).Scan(&result)

	c.JSON(http.StatusOK,result)
}

//获取最近历史聊天记录

