import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseurl: string = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  register(regemp: any) {
    return this.http.post(this.baseurl + "/register", regemp);
  }

  login(logindetails: any) {
    return this.http.post<any>(this.baseurl + "/login", logindetails);
  }

  getallemp() {
    return this.http.get(this.baseurl + "/employees");
  }

  edit(id: any) {
    return this.http.get<any>(this.baseurl + '/employees/'+ id);
  }

  delete(id: any) {
    return this.http.delete<any>(this.baseurl + '/employees/'+ id);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
