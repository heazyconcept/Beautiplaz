import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as myGlobals from './globals';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private http: HttpClient) { }
  getState(){
    return this.http.get(myGlobals.URL + '/utilities/State');
  }
  getLocalGovernment(state){
    return this.http.get(myGlobals.URL + '/utilities/LocalGovernment/' + state );
  }
  getServices(){
    return this.http.get(myGlobals.URL + '/utilities/Services');
  }
}
