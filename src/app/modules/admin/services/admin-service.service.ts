import { StorageService } from './../../../auth/services/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const BASIC_URL = "http://localhost:8765/";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  getAuditLogs(): Observable<any> {
    return this.http.get(BASIC_URL + `api/v1/audit/log`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getNotifications(): Observable<any> {
    // This is a placeholder endpoint. In a real-world scenario, you would
    // create an endpoint on your backend NotificationService to fetch notifications.
    return this.http.get(BASIC_URL + `api/v1/notifications/all`, {
      headers: this.createAuthorizationHeader()
    });
  }
}