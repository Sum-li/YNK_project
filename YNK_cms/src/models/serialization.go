package models

import "time"

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

//func (goods *Goods) Serialization() GoodSer {
//	var g GoodSer = GoodSer{
//		Price:  goods.Price,
//		Name:   goods.Name,
//		Gphoto: goods.Gphoto,
//		GoodID: goods.ID,
//		Pubtime:goods.CreatedAt,
//	}
//	db := GetDB()
//	defer db.Close()
//	db.Select("")
//	return g
//}