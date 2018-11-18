import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../security.service';
import { UtilitiesService } from '../utilities.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private _securityServices: SecurityService, private _utilitiesServices : UtilitiesService) { }
  Lgas: Object;
  Banks = [ 
    "Access Bank",
    "Citibank",
    "Diamond Bank",
    "Dynamic Standard Bank",
    "Ecobank Nigeria",
    "Fidelity Bank Nigeria",
    "First Bank of Nigeria",
    "First City Monument Bank",
    "Guaranty Trust Bank",
    "Heritage Bank Plc",
    "Keystone Bank Limited",
    "Providus Bank Plc",
    "Skye Bank",
    "Stanbic IBTC Bank Nigeria Limited",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank Nigeria Limited",
    "Union Bank of Nigeria",
    "United Bank for Africa",
    "Unity Bank Plc",
    "Wema Bank",
    "Zenith Bank"
];
  onChange(stateChange) {
    let stringToSplit = stateChange;
    let stateArray = stringToSplit.split(":");
    let stateString = stateArray[1].trim();
    this._utilitiesServices.getLocalGovernment(stateString)
    .subscribe(
      (data) => {
        this.Lgas = data;
      },
      (error) => {
        console.log(error);
      }
    )
}
  
  states: Object;
  allServices: Object; 
  ngOnInit() {
    this._utilitiesServices.getState()
    .subscribe(
      (data) => {
        this.states = data;
      },
      (error) => {
        console.log(error);
      }
    );
    this._utilitiesServices.getServices()
    .subscribe(
      (data)=> {
        this.allServices = data;
      },
      (error) => {
        console.log(error);
        
      }
    );
    
  }
 
  vendorModel = new Vendor(0,0,"","","","",0,0,new Date(),0,new Date());
  usersModel = new Users(1, "", "", "", "", "", "", "", "", "", new Date(),false, this.vendorModel);

  registerCustomer(){
    if(this.usersModel.Password != this.usersModel.PasswordConfirm){
      swal('Error', 'Password Mismath', 'error');
      return;
    }
    this._securityServices.register(this.usersModel)
    .subscribe(
      (data) => {
        console.log(data);
        if(data.StatusCode == "00"){
          swal("Success", "You have registered successfully", "success");
        }else{
          swal("Error", data.StatusMessage, "error");
        }

      },
      (error) => {
        console.log(error);
      }
    );

  }
  registerVendor(){
    if(this.usersModel.Password != this.usersModel.PasswordConfirm){
      swal('Error', 'Password Mismath', 'error');
      return;
    }
    this.usersModel.IsVendor = true;
    this._securityServices.register(this.usersModel)
    .subscribe(
      (data) => {
        console.log(data);
        if(data.StatusCode == "00"){
          swal("Success", "You have registered successfully", "success");
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
export class Users {
  constructor (
  public Id: number,
  public FullName: string,
  public EmailAddress: string,
  public PhoneNumber: string,
  public Password: string,
  public PasswordConfirm: string,
  public UserAddress: string,
  public State: string,
  public LocalGovernment: string,
  public Role: string,
  public DateCreated: Date,
  public IsVendor: boolean,
  public Vendor: Vendor
  ){};

}
export class Vendor {
  constructor (
  public Id: number,
  public UserId: number,
  public BusinessName: string,
  public BankName: string,
  public AccountName: string,
  public AccountNumber: string,
  public ServiceRendered: number,
  public CreatedBy: number,
  public DateCreated: Date,
  public ModifiedBy: number,
  public DateModified: Date,

  ){}
}

