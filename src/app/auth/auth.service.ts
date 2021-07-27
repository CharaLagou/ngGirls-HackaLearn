import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  /** Method to get authenticated user */
  getUser$() {
    return this.httpClient.get('.auth/me');
  }

  /** Method to get a custom hello for the authenticated user */
  getHello$(name:string) {
    // Post request example
    // return this.httpClient.post(`api/HelloWorld`,{});
    // Get hello text from api
    return this.httpClient.get(`api/HttpTrigger?name=${name}`, {responseType: 'text'});

  }
}
