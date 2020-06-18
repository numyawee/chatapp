import { ChatService } from './chat.service';
import { Component } from '@angular/core';
import { OnInit , AfterViewChecked, ElementRef, ViewChild  } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  title = 'rxjs-chat';
  message: string;
  name: string;
  messages: any = [];

  constructor(private chatService: ChatService) {
    this.name = 'Num';
  }

  sendMessage() {
    if (this.message != '') {
      this.chatService.sendMessage({name: this.name , message: this.message});
      this.message = '';
    }
  }

  ngOnInit() {
    // console.log('init');
    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        this.messages.push(message)
        //console.log(message);
        // message.map((data)=> {this.messages.push(data);});
        //console.log(this.messages);

        //setTimeout(this.scrollToBottom(),1000);
        
      });
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  logout() {

  }
}
