package websocket


//一个socket的连接池
type Hub struct {

	clients map[int]*Client


	sendhub chan *Message


	register chan *Client


	unregister chan *Client
}

func newHub() *Hub {
	return &Hub{
		sendhub:  make(chan *Message),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[int]*Client),
	}
}

func (h *Hub) run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client.id] = client

		case client := <-h.unregister:
			if _, ok := h.clients[client.id]; ok {
				delete(h.clients, client.id)
				close(client.send)
			}
		case message := <-h.sendhub:
			if client,ok := h.clients[message.SendID]; ok {
				select {
				case client.send <- message:
				default:
					close(client.send)
					delete(h.clients, client.id)
				}
			}
		}
	}
}

