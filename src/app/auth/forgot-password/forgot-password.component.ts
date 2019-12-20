import { Component, OnInit } from '@angular/core';
import { ErrorLoginComponent } from 'src/app/modal-error/error-login/error-login.component';
import { NgForm, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm: FormGroup;
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
    this.forgotForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() { }

  async forgot(form: NgForm) {
    console.log(form);

    this.message = "";

    let EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (this.email != '' ) {
      if (this.email && EMAIL_REGEXP.test(this.email)) {
        this.errEmail = false;
        this.errPass = false;
        this.check = false;
        this.checkPassword = false;
        try {
          const data = await this.rest.post(
            `${this.url}/api-accounts/forgot-password`,
            {
              email: form.value.email,
            },
          );
          if (data['success']) {
            this.router.navigate(['/']);
          } else {
            if (this.forgotForm.get('email').errors === null && this.forgotForm.get('password').errors === null) {
              const dialogRef = this.dialog.open(ErrorLoginComponent, {
                data:'Your Email not be found',
                width: '90%'
              });
              this.data.error(data['message']);
            }
          }
        } catch (error) {
          if (error['error']) {
            const dialogRef = this.dialog.open(ErrorLoginComponent, {
              data:'Your Email not be found',
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
