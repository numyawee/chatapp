import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
  private url = 'https://chatapp-numyawee.herokuapp.com/';
  socket: SocketIOClient.Socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        //console.log(message);
        observer.next(message);
      });
    });
  }
}
