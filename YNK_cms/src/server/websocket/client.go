package websocket

import (
	"encoding/json"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

//
const (
//	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second
//
//	//Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second
//
//	//Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10
//
//	// Maximum message size allowed from peer.
//	//maxMessageSize = 512
)

//var (
//	newline = []byte{'\n'}
//	space   = []byte{' '}
//)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:func(r *http.Request) bool{
		return true
	},
}

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	//socket连接池的引用
	hub *Hub

	//用户的id，用于唯一标识一个连接
	id int

	//一个socket的连接服务
	conn *websocket.Conn

	// 数据的传输管道
	send chan *Message
}

//接收的消息
type Message struct {
	SendID int	`json:"send_id"`
	ReceiveID int	`json:"receive_id"`
	Context string	`json:"context"`
	messagetype int
}




func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()
	//c.conn.SetReadLimit(maxMessageSize)
	//c.conn.SetReadDeadline(time.Now().Add(pongWait))
	//c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		mt, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		var Msg Message
		err = json.Unmarshal(message,&Msg)
		if err != nil {
			log.Printf("*********出错！！！*******%#v",Msg)
			break
		}

		Msg.messagetype = mt

		c.hub.sendhub <- &Msg
	}
}

//writePump pumps messages from the hub to the websocket connection.
//
//A goroutine running writePump is started for each connection. The
//application ensures that there is at most one writer to a connection by
//executing all writes from this goroutine.
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.hub.unregister <- c
		c.conn.Close()
	}()
	for {
		select {
		case message,ok := <-c.send:
			if !ok {
				return
			}
			data,err := json.Marshal(*message)
			if err != nil {
				return
			}
			if err := c.conn.WriteMessage(message.messagetype,data);err !=nil{
				return
			}
			for i := 0; i < len(c.send); i++ {
				message, ok := <-c.send
				if !ok {
					return
				}
				data,err := json.Marshal(*message)
				if err != nil {
					return
				}
				if err := c.conn.WriteMessage(message.messagetype,data);err !=nil{
					return
				}
			}
		case <-ticker.C:
			//_ = c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
		//select {
		//case message, ok := <-c.send:
		//	//c.conn.SetWriteDeadline(time.Now().Add(writeWait))
		//	if !ok {
		//		// The hub closed the channel.
		//		//c.conn.WriteMessage(websocket.CloseMessage, []byte{})
		//		return
		//	}
		//
		//	w, err := c.conn.NextWriter(websocket.TextMessage)
		//	if err != nil {
		//		return
		//	}
		//	w.Write(message)
		//
		//	// Add queued chat messages to the current websocket message.
		//	n := len(c.send)
		//	for i := 0; i < n; i++ {
		//		w.Write(newline)
		//		w.Write(<-c.send)
		//	}
		//
		//	if err := w.Close(); err != nil {
		//		return
		//	}
		////case <-ticker.C:
		////	c.conn.SetWriteDeadline(time.Now().Add(writeWait))
		////	if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
		////		return
		////	}
		//}
	}
}
