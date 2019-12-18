import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorLoginComponent } from 'src/app/modal-error/error-login/error-login.component';
import { MatDialog } from '@angular/material';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errEmail = false;
  errPass = false;
  check = false;
  checkPassword = true;

  hide = true;
  title = 'Login';
  email = '';
  password = '';
  message = "";
  url = this.rest.link_url();

  constructor(
    private router: Router,
    private rest: RestApiService,
    public data: DataService,
    public dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() { }

  async login(form: NgForm) {
    console.log(form);
    
    this.message = "";

    let EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (this.email != '' || this.password != '') {
      if (this.email && EMAIL_REGEXP.test(this.email)) {
        this.errEmail = false;
        this.errPass = false;
        this.check = false;
        this.checkPassword = false;
        try {
          const data = await this.rest.post(
            `${this.url}/api-login`,
            {
              email: form.value.email,
              password: form.value.password,
            },
          );
          if (data['success']) {
            localStorage.setItem('token', data['token']);
            this.router.navigate(['/']);
            await this.data.getProfile();
          } else {
            if (this.loginForm.get('email').errors === null && this.loginForm.get('password').errors === null) {
              const dialogRef = this.dialog.open(ErrorLoginComponent, {
                width: '90%'
              });
              this.data.error(data['message']);
            }
          }
        } catch (error) {
          if (error['error']) {
            const dialogRef = this.dialog.open(ErrorLoginComponent, {
              width: '90%'
            });
          }
          this.data.error(error['message']);
        }
      } else {
        this.errEmail = true;
        this.check = true;
        if (this.password == '') { this.errPass = true; this.checkPassword = true; }
      }
    } else {
      this.errPass = true;
      this.errEmail = true;
      this.check = true;
      this.checkPassword = true;
    }
  }
  checkEmail() {
    (this.email == '') ? this.check = false : this.check = true;
    (this.email != '') ? this.errEmail = false : this.errEmail = true;
  }
  checkPass() {
    (this.password != '') ? this.errPass = false : this.errPass = true;
    (this.password == '') ? this.checkPassword = false : this.checkPassword = true;
  }
}