import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message = '';
  messageType = '';
  url = this.rest.link_url();
  // user: any;
  user: any = {};
  nameUser = '';
  keyUser = '';
  companyName = '';
  token: any;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
        this.messageType = '';
      }
    });
  }

  error(message) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message) {
    this.messageType = 'warning';
    this.message = message;
  }

  // get profile
  async getProfile() {
    if (localStorage.getItem('token') !== null) {
      await this.rest.user_getProfile().subscribe((data) => {
        if (data['success']) {
          this.token = localStorage.getItem('token');
          this.user = data['user'];
          this.nameUser = this.user['name'].replace(
            /\w\S*/g,
            function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
          this.keyUser = this.user['name'].toUpperCase().slice(0, 1);
        }
      });
    }
  }
}
