import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
  private static readonly TOKEN = 'token';
  private static readonly USER = 'user';

  constructor() {}

  private static isLocalStorageAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }

  static saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(StorageService.TOKEN);
      window.localStorage.setItem(StorageService.TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(StorageService.USER);
      window.localStorage.setItem(StorageService.USER, JSON.stringify(user));
    }
  }

  static getToken(): string {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(StorageService.TOKEN) || '';
    }
    return '';
  }

  static getUser(): any {
    if (this.isLocalStorageAvailable()) {
      const userString = localStorage.getItem(StorageService.USER);
      return userString ? JSON.parse(userString) : {};
    }
    return {};
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user?.userRole || '';
  }

  static getUserId(): string {
    const user = this.getUser();
    return user?.userId || '';
  }

  static isAdminLoggedIn(): boolean {
    const role = this.getUserRole();
    return role === 'ADMIN';
  }

  static isManagerLoggedIn(): boolean {
    const role = this.getUserRole();
    return role === 'MANAGER';
  }

  static isCustomerLoggedIn(): boolean {
    const role = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static logout(): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(StorageService.TOKEN);
      window.localStorage.removeItem(StorageService.USER);
    }
  }

  static isLoggedIn(): boolean {
    return this.getToken() !== '';
  }
}