import { Component, OnInit } from '@angular/core';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  
})

export class SidebarComponent implements OnInit {
  
   userSession = <myGlobals.Users>{};


  constructor() { }

  ngOnInit() {
    this.userSession = JSON.parse(sessionStorage.getItem("userDetails"));
  }

  
  
}

