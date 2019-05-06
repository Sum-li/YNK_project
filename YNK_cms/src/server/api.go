package server

//
//func test(c *gin.Context) {
//	c.String(http.StatusOK,"成功hahahahhahaha")
//}

//func Pub_goods(c *gin.Context)  {
//	//type MyGoods struct {
//	//	Name string		`gorm:"not null" form:"name" json:"name" binding:"required"`
//	//	Discribe string		`form:"discribe" json:"discribe" binding:"required"`
//	//	Price string		`gorm:"not null" json:"price" form:"price" binding:"required"`
//	//	CategoryID uint		`gorm:"not null" json:"categoryid" form:"categoryid" binding:"required"`
//	//	UserID uint		`gorm:"not null" json:"userid" form:"userid" binding:"required"`
//	//	Gphoto string	`gorm:"not null" json:"gphoto" form:"gphoto" binding:"required"`
//	//}
//	//var mygoods MyGoods
//	//if err := c.ShouldBind(&mygoods); err != nil {
//	//	c.JSON(http.StatusBadRequest,gin.H{"error" :err.Error()})
//	//	return
//	//}
//	//c.JSON(http.StatusOK,mygoods)
//
//
//}

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

////发布商品
//func Pub_goods(c *gin.Context) {
//
//	db := models.GetDB()
//	defer db.Close()
//
//	name := c.PostForm("name")
//	intcategory_id, _ := strconv.Atoi(c.PostForm("category_id"))
//	category_id := uint(intcategory_id)
//	discribe := c.PostForm("discribe")
//	intprice, _ := strconv.Atoi(c.PostForm("price"))
//	price := uint(intprice)
//	intuser_id, _ := strconv.Atoi(c.PostForm("user_id"))
//	user_id := uint(intuser_id)
//
//	gphoto, _ := c.FormFile("gphoto")
//
//	dst := fmt.Sprintf("D:\\a_Sum\\golang_project\\code\\src\\YNK_cms\\src\\static\\gphoto\\%d%s%s",user_id,name,filepath.Base(gphoto.Filename))
//	url := fmt.Sprintf("http://www.schoolbuy.online./static/gphoto/%d%s%s",user_id,name,filepath.Base(gphoto.Filename))
//
//
//	if err := c.SaveUploadedFile(gphoto,dst); err != nil {
//		log.Printf("图片上传失败%v",err)
//		return
//	}
//	log.Printf("图片上传成功")
//
//
//	var goods models.Goods = models.Goods{
//		Name:name,
//		Discribe:discribe,
//		Price:price,
//		CategoryID:category_id,
//		UserID:user_id,
//		Gphoto:url,
//	}
//	db.Create(&goods)
//
//	c.JSON(http.StatusOK,goods)
//}
//
//func Photos(c *gin.Context) {
//	db := models.GetDB()
//	defer db.Close()
//
//	intuser_id, _ := strconv.Atoi(c.PostForm("user_id"))
//	user_id := uint(intuser_id)
//
//	intgoods_id, _ := strconv.Atoi(c.PostForm("goods_id"))
//	goods_id := uint(intgoods_id)
//
//	name := c.PostForm("name")
//
//	image, _ := c.FormFile("image")
//
//	dst := fmt.Sprintf("D:\\a_Sum\\golang_project\\code\\src\\YNK_cms\\src\\static\\image\\%d%s%s",user_id,name,filepath.Base(image.Filename))
//	url := fmt.Sprintf("http://www.schoolbuy.online./static/image/%d%s%s",user_id,name,filepath.Base(image.Filename))
//
//
//	if err := c.SaveUploadedFile(image,dst); err != nil {
//		log.Printf("图片上传失败%v",err)
//		return
//	}
//	log.Printf("图片上传成功")
//
//	img := models.Photos{
//		Photo:url,
//		GoodsID:goods_id,
//	}
//	db.Create(&img)
//
//	c.JSON(http.StatusOK,img)
//}

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
































