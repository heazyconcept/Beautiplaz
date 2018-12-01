/// <reference types="@types/googlemaps" />
import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
// import {} from '@types/googlemaps';
import { SecurityService } from '../security.service';
import { UtilitiesService } from '../utilities.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('UserAddress') public searchElement: ElementRef;
  
  constructor(private _securityServices: SecurityService, private _utilitiesServices : UtilitiesService, private _mapsapiloader: MapsAPILoader, private _ngzone: NgZone) { }
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
  vendorModel = new Vendor(0,0,"","","","",0,0,new Date(),0,new Date());
  usersModel = new Users(1, "", "", "", "", "", "", "", "", "", new Date(),"", "", false, this.vendorModel);
  ngOnInit() {
    this._mapsapiloader.load().then(
      () => {
        // console.log(data);
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, 
          {
            types: ["geocode"]
          }
          );
        autocomplete.addListener(
          'pace_changed', 
          () => {
            // console.log(data);
            
            this._ngzone.run(
              () => {
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                // console.log(data);
                if(place.geometry == undefined || place.geometry == null){
                  return;
                }
              }
            )
          }
          )
      }
    )
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
 
  

  registerCustomer(){
    if(this.usersModel.Password != this.usersModel.PasswordConfirm){
      swal('Error', 'Password Mismath', 'error');
      return;
    }
    this._utilitiesServices.getGeolocation(this.searchElement.nativeElement.value)
    .subscribe(
      (data) => {
       
        if(data.status == "OK"){
          let Result = data.results[0];
          this.usersModel.Longitude = Result.geometry.location.lng;
          this.usersModel.Latitude = Result.geometry.location.lat;
          this.usersModel.UserAddress = this.searchElement.nativeElement.value;
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
        }else{
          swal("Error", 'Your address is not valid', "error");
          return;
        }

      }
    )
    
    

  }
  registerVendor(){
    if(this.usersModel.Password != this.usersModel.PasswordConfirm){
      swal('Error', 'Password Mismath', 'error');
      return;
    }
    this._utilitiesServices.getGeolocation(this.searchElement.nativeElement.value)
    .subscribe(
      (data) => {
        if(data.status == "OK"){
          let Result = data.results[0];
          this.usersModel.Longitude = Result.geometry.location.lng;
          this.usersModel.Latitude = Result.geometry.location.lat;
          this.usersModel.IsVendor = true;
          this.usersModel.UserAddress = this.searchElement.nativeElement.value;
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
        }else{
          swal("Error", 'Your address is not valid', "error");
          return;
        }
      },
      (error) => {
        console.log(error);
      }
    )
    

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
  public Longitude: string,
  public Latitude: string,
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

