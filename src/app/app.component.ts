import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public router: Router,
    public data:DataService
  ){
    this.matIconRegistry.addSvgIcon(
      "visibility",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/svg/visibility-24px.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "visibility_off",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/icons/svg/visibility_off-24px.svg")
    );

    this.data.getProfile();
  }

  get token() {
    return localStorage.getItem('token');
  }

  Logout(){
    localStorage.clear();
    window.location.replace('/');
  }
}
