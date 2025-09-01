import { StorageService } from './../../../auth/services/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8765/";

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getAllCustomers(): Observable<any> {
    return this.http.get(BASIC_URL + `api/v1/customer`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllAccounts(): Observable<any> {
    return this.http.get(BASIC_URL + `api/v1/accounts`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Other methods for managing customers, accounts, etc. can be added here
}