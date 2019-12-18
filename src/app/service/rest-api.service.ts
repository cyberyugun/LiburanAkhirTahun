import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  dataLocalStorage: any = {};

  constructor(private http: HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string) {
    return this.http.get(link, { headers: this.getHeaders() }).toPromise();
  }

  post(link: string, body: any) {
    return this.http.post(link, body, { headers: this.getHeaders() }).toPromise();
  }

  put(link: string, body: any) {
    return this.http.put(link, body, { headers: this.getHeaders() }).toPromise();
  }

  delete(link: string) {
    return this.http.delete(link, { headers: this.getHeaders() }).toPromise();
  }

  link_url() {
    return 'http://localhost:8081';
  }

  user_getProfile() {
    return this.http.get(`${this.link_url()}/api-profile`, { headers: this.getHeaders() });
  }
}
