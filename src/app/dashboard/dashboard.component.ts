import { Component, OnInit } from '@angular/core';
import * as myGlobals from '../globals';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _securityServices: SecurityService, private router: Router) { }
   currency: string;
  userSession: Object;

  ngOnInit() {
    
    if(sessionStorage.getItem("userDetails") == null){
      this.router.navigate(['']);
    }else{
      this.userSession = JSON.parse(sessionStorage.getItem("userDetails"));
      console.log(this.userSession);
      
    }
    this.currency = myGlobals.CURRENCY;
  }

}

