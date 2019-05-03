package models

import (
	"github.com/jinzhu/gorm"
	"time"
)

type User struct {
	gorm.Model
	UserName string
	StudentNumber string
	School string
	Openid string	`gorm:"not null;unique"`
	Address string
	Goods []Goods
	Collections []Collections
	Buy []Buy
	Send []Chatinfo	`gorm:"ForeignKey:SendID"`
	Receive []Chatinfo `gorm:"ForeignKey:ReceiveID"`
}

type Category struct {
	ID uint
	Name string		`gorm:"not null;unique"`
	Goods []Goods
}

type Goods struct {
	gorm.Model
	Name string		`gorm:"not null" form:"name" json:"name"`
	Discribe string		`form:"discribe" json:"discribe"`
	Price uint		`gorm:"not null" json:"price" form:"price"`
	CategoryID uint		`gorm:"not null" json:"category_id" form:"category_id"`
	UserID uint		`gorm:"not null" json:"user_id" form:"user_id"`
	Is_buy bool		`gorm:"not null;default:false"`
	Gphoto string	`gorm:"not null"`
	Photos []Photos
	Collections []Collections
	Buy []Buy
}

type Photos struct {
	ID uint
	Photo string		`gorm:"not null"`
	GoodsID uint		`gorm:"not null"`
}

type Collections struct {
	ID uint
	UserID uint		`gorm:"not null"`
	GoodsID uint		`gorm:"not null"`
}

type Buy struct {
	ID uint
	UserID uint		`gorm:"not null"`
	GoodsID uint		`gorm:"not null"`
}

type Chatinfo struct {
	ID uint
	SendID uint
	ReceiveID uint
	CreatedAt time.Time
	Context string
}