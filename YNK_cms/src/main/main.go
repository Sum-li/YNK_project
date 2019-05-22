package main

import (
	//"YNK_cms/src/models"
	"YNK_cms/src/server"
	"fmt"
)

func main() {
	fmt.Println("web服务器开始")
	go server.Socketserver()
	server.Apiserver()
	//models.Createinit()
}
