import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit {
  userSession: Object;

  constructor() { }
   
  ngOnInit() {
    this.userSession = JSON.parse(sessionStorage.getItem("userDetails"));
  }

}
