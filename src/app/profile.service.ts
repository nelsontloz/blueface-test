import { Injectable } from '@angular/core';

export interface IProfile {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public user: IProfile;

  constructor() {}

  getProfileUser(): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            firstName: 'Michael',
            lastName: 'Collins',
            username: 'michael.collins',
            email: 'michael.collins@blueface.com',
            age: 30,
          };
          resolve(this.user);
        } else {
          reject({ error: 'Profile not found' });
        }
      }, Math.random() * 100);
    });
  }

  setName(firstName: string, lastName: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            ...this.user,
            firstName,
            lastName,
          };
          resolve(this.user);
        } else {
          reject({ error: 'Invalid name' });
        }
      }, Math.random() * 100);
    });
  }

  setEmail(email: string): Promise<IProfile> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.round(Math.random())) {
          this.user = {
            ...this.user,
            email,
          };
          resolve(this.user);
        } else {
          reject({ error: 'Invalid email' });
        }
      }, Math.random() * 100);
    });
  }
}
