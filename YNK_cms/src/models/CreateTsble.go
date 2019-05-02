package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func GetDB() *gorm.DB {
	db, err := gorm.Open("mysql", "root:1386538lc520,,.@tcp(127.0.0.1:3306)/ynk_cms?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		fmt.Printf("connet mysql failed %s",err)
		return	nil
	}
	return db
}

func Createinit() {
	db := GetDB()
	defer db.Close()
	db.Set("gorm:table_options", "ENGINE=InnoDB").CreateTable(&User{},&Goods{},&Category{},&Photos{},&Collections{},&Buy{},Chatinfo{})
}