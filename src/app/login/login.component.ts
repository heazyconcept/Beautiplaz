import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _securityServices: SecurityService, private router: Router) { }
  LoginModel = new loginData("","");

  ngOnInit() {

  }
  Login(){
    
    this._securityServices.login(this.LoginModel)
    .subscribe(
      (data) => {
        console.log(data);
        
        if(data.StatusCode == "00"){
          this.router.navigate(['dashboard']);
        }else{
          swal("Error", data.StatusMessage, "error");
        }

      },
      (error) => {
        console.log(error);
      }
    );

  }

}
export class loginData{
  constructor(
    public EmailAddress: string,
    public Password: string,
  ){}
}
