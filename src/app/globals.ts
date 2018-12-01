// export const URL ='http://beauty.osigla.com.ng/api';
export const URL ='http://localhost:8585/api';
export const CURRENCY = "₦";
export const GOOGLEAPI = "AIzaSyDfyluuX23k6ouPTn3E1h3Z9DT_ODwQXe4";
export const GOOGLEURL = "https://maps.googleapis.com/maps/api/geocode/json";
export interface ApiResponse {
    StatusCode: string;
    StatusMessage: string;
  }
  export interface Users {
    Id: number;
    FullName: string;
    EmailAddress: string;
    PhoneNumber: string;
    Password: string;
    PasswordConfirm: string;
    UserAddress: string;
    State: string;
    LocalGovernment: string;
    Role: string;
    DateCreated: Date;
    IsVendor: boolean;
    Longitude: string;
    Latitude: string;
    Vendor: Vendor;
  }
  export interface Vendor {
     Id: number;
     UserId: number;
     BusinessName: string;
     BankName: string;
     AccountName: string;
     AccountNumber: string;
     ServiceRendered: number;
     CreatedBy: number;
     DateCreated: Date;
     ModifiedBy: number;
     DateModified: Date;
  }
  export interface googleGeometry{
    geometry: _geometrylocation;
  }
  export interface _geometrylocation{
    location: _location;
  }
  export interface _location{
    lng: string;
    lat: string;
  }
  export interface GoogleResponse{
    status: string;
    results: Array<googleGeometry>;
  }


 