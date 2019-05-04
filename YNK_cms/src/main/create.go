package main

import "YNK_cms/src/models"

//
//import "YNK_cms/src/models"
//
func main() {
	db := models.GetDB()
	defer db.Close()
	//user1 := models.User{
	//	UserName:"测试",
	//	StudentNumber:"201709000111",
	//	School:"华北电力大学",
	//	Openid:"iewfhnwifwefewfwiejfnweui",
	//	Address:"保定市韩庄乡",
	//}
	//user2 := models.User{
	//	UserName:"测试",
	//	StudentNumber:"201709000111",
	//	School:"华北电力大学",
	//	Openid:"iewfhnwifwefewfwjfnweui",
	//	Address:"保定市韩庄乡",
	//}
	//user3 := models.User{
	//	UserName:"测试",
	//	StudentNumber:"201709000111",
	//	School:"华北电力大学",
	//	Openid:"iewfhnwifwefewfwifnweui",
	//	Address:"保定市韩庄乡",
	//}
	//user4 := models.User{
	//	UserName:"测试",
	//	StudentNumber:"201709000111",
	//	School:"华北电力大学",
	//	Openid:"iewfhnwifwefeiejfnweui",
	//	Address:"保定市韩庄乡",
	//}
	//
	//goods1 := models.Goods{
	//	Name:"测试商品",
	//	Discribe:"这是一个商品表的测试",
	//	Price:200,
	//	CategoryID:1,
	//	UserID:1,
	//	Is_buy:false,
	//	Gphoto:"tupian",
	//}
	//goods2 := models.Goods{
	//	Name:"测试商品",
	//	Discribe:"这是一个商品表的测试",
	//	Price:200,
	//	CategoryID:1,
	//	UserID:2,
	//	Is_buy:false,
	//	Gphoto:"tupian",
	//}
	//goods3 := models.Goods{
	//	Name:"测试商品",
	//	Discribe:"这是一个商品表的测试",
	//	Price:200,
	//	CategoryID:1,
	//	UserID:3,
	//	Is_buy:false,
	//	Gphoto:"tupian",
	//}
	//goods4 := models.Goods{
	//	Name:"测试商品",
	//	Discribe:"这是一个商品表的测试",
	//	Price:200,
	//	CategoryID:1,
	//	UserID:4,
	//	Is_buy:false,
	//	Gphoto:"tupian",
	//}
	//
	//db.Create(&user1)
	//db.Create(&user2)
	//db.Create(&user3)
	//db.Create(&user4)
	//db.Create(&goods1)
	//db.Create(&goods2)
	//db.Create(&goods3)
	//db.Create(&goods4)
	c1 := models.Category{
		Name:"书",
	}
	c2 := models.Category{
		Name:"鞋",
	}
	c3 := models.Category{
		Name:"笔",
	}
	c4 := models.Category{
		Name:"手机",
	}
	c5 := models.Category{
		Name:"电脑",
	}
	c6 := models.Category{
		Name:"零食",
	}
	db.Create(&c1)
	db.Create(&c2)
	db.Create(&c3)
	db.Create(&c4)
	db.Create(&c5)
	db.Create(&c6)

}