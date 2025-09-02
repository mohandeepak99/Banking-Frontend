import { StorageService } from './../../../auth/services/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


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
  
/** 
  updateProfile(profileData: any): Observable<any> {
    return this.http.put(BASIC_URL + "api/v1/customer/update", profileData, {
      headers: this.createAuthorizationHeader()
    });
  }*/
  updateProfile(profileData: any): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.put(BASIC_URL + `api/v1/customer/update/${userId}`, profileData, {
      headers: this.createAuthorizationHeader()
    });
  }

/** Return all accounts; optionally filter by contactId client-side */
getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(BASIC_URL + "api/v1/accounts", {
      headers: this.createAuthorizationHeader(),
    });
  }
  
  /** Fetch accounts belonging to the logged-in user */
  getAccountsByUser(): Observable<any[]> {
    const userId = StorageService.getUserId();
    return this.getAccounts().pipe(
      map((profiles) => profiles.filter((p: any) => `${p.contactId}` === `${userId}`))
    );
  }
  

 /** Fetch a single account by its account number */
 getAccountByNumber(accountNumber: string): Observable<any> {
    return this.http.get(
      BASIC_URL + `api/v1/accounts/accountNumber/${accountNumber}`,
      { headers: this.createAuthorizationHeader() }
    );
  }
  

  /** Transaction history for the logged-in user 
  getTransactions(): Observable<any[]> {
    const userId = StorageService.getUserId();
    return this.http.get<any[]>(
      BASIC_URL + `api/v1/payments/history?userId=${userId}`,
      { headers: this.createAuthorizationHeader() }
    );
  }*/
 
  getTransactions(): Observable<any> {
    const userId = StorageService.getUserId();
    return this.http.get(BASIC_URL + `api/v1/payments/history/${userId}`, {
      headers: this.createAuthorizationHeader()
    });
  }
  
  doPayment(paymentRequest: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/v1/payments/doPayment", paymentRequest, {
      headers: this.createAuthorizationHeader()
    });
  }
}