import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  darkMode:boolean = false;
  @Output() themeEvent = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void { }

  sendTheme(){
    this.themeEvent.emit(this.darkMode)
  }
}
