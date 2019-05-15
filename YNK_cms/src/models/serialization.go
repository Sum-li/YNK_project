package models

import "time"


//商品
type GoodSer struct {
	Price uint		`json:"price"`
	Name string		`json:"name";orm:"Scan:name"`
	Gphoto string	`json:"gphoto"`
	ID uint		`json:"good_id";db:"id"`
	UserName string		`json:"user_name"`
	CreatedAt time.Time	`json:"pub_time"`
	School string	`json:"school"`
	StudentNumber string	`json:"student_number"`
}


//分类
type CategorySer struct {
	Name string		`json:"name"`
	ID uint		`json:"id"`
}

