import { StorageService } from './../../../auth/services/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8765/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getProfile(): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL + `api/v1/customer/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put(BASIC_URL + "api/v1/customer/update", profileData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTransactions(): Observable<any> {
    // This endpoint may need adjustment based on your PaymentService implementation for transaction history.
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL + `api/v1/payments/history?userId=${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  doPayment(paymentRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/v1/payments/doPayment", paymentRequest, {
      headers: this.createAuthorizationHeader()
    });
  }
}