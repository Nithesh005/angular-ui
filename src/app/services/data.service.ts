import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userKey = 'userData';

  setUserInfo(name: string, email: string) {
    const userInfo: User = { name, email };
    localStorage.setItem(this.userKey, JSON.stringify(userInfo));
  }

  getUserInfo(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  getUserName(): string {
    const user = this.getUserInfo();
    return user ? user.name : '';
  }

  getUserEmail(): string {
    const user = this.getUserInfo();
    return user ? user.email : '';
  }

  clearUserInfo() {
    localStorage.removeItem(this.userKey);
  }
}
