package API

import (
	"YNK_cms/src/models"
	"github.com/gin-gonic/gin"
	"net/http"
	"fmt"
)

func GetUserid(c *gin.Context) {

	openid := c.Query("openid")

	db := models.GetDB()
	defer db.Close()

	var user models.User

	if db.Table("users").Where("openid = ?",openid).First(&user).RecordNotFound(){
		user.Openid = openid
		db.Create(&user)
	}
	c.String(http.StatusOK,fmt.Sprintf("%v",user.ID))
}

//完善信息
func Information(c *gin.Context) {

}
