import { Component, OnInit } from '@angular/core';
import { ErrorLoginComponent } from 'src/app/modal-error/error-login/error-login.component';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errEmail = false;
  errPass = false;
  errCPass = false;
  check = false;
  checkNama = false;
  checkPassword = true;
  checkCPassword = true;

  hide = true;
  hidea=true;
  title = 'Login';
  email = '';
  name = '';
  password = '';
  cpassword = '';
  message = "";
  url = this.rest.link_url();

  constructor(
    private router: Router,
    private rest: RestApiService,
    public data: DataService,
    public dialog: MatDialog
  ) {
    this.registerForm = new FormGroup({
      name:new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      cpassword: new FormControl()
    });
  }

  ngOnInit() { }

  async register(form: NgForm) {
    this.message = "";

    let EMAIL_REGEXP = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

    if (this.name != ''||this.email != '' || this.password != '' || this.cpassword != '') {
      if (this.email && EMAIL_REGEXP.test(this.email)) {
        this.errEmail = false;
        this.errPass = false;
        this.errCPass = false;
        this.check = false;
        this.checkPassword = false;
        this.checkCPassword=false;
        try {
          const data = await this.rest.post(
            `${this.url}/api-accounts/signup`,
            {
              name: form.value.name,
              email: form.value.email,
              password: form.value.password,
              cpassword: form.value.cpassword
            },
          );
          if (data['success']) {
            this.router.navigate(['/auth/login']);
          } else {
            if (this.registerForm.get('name').errors==null &&this.registerForm.get('email').errors === null && this.registerForm.get('password').errors === null && this.registerForm.get('cpassword').errors === null) {
              const dialogRef = this.dialog.open(ErrorLoginComponent, {
                data:'Register Failed',
                width: '90%'
              });
              this.data.error(data['message']);
            }
          }
        } catch (error) {
          if (error['error']) {
            
            const dialogRef = this.dialog.open(ErrorLoginComponent, {
              data:'Register Failed',
              width: '90%'
            });
          }
          this.data.error(error['message']);
        }
      } else {
        this.errEmail = true;
        this.check = true;
        if (this.password == '') { this.errPass = true; this.checkPassword = true; }
        if (this.cpassword == '') {this.errCPass = true; this.checkCPassword = true}
      }
    } else {
      this.errPass = true;
      this.errCPass = true;
      this.errEmail = true;
      this.check = true;
      this.checkNama = true
      this.checkPassword = true;
      this.checkCPassword=true;
    }
  }
  checkEmail() {
    (this.email == '') ? this.check = false : this.check = true;
    (this.email != '') ? this.errEmail = false : this.errEmail = true;
  }

  checkName() {
    (this.name == '') ? this.checkNama = false : this.checkNama = true;
  }
  checkPass() {
    (this.password != '') ? this.errPass = false : this.errPass = true;
    (this.password == '') ? this.checkPassword = false : this.checkPassword = true;
  }
  checkCPass() {
    (this.cpassword != '') ? this.errCPass = false : this.errCPass = true;
    (this.cpassword == '') ? this.checkCPassword = false : this.checkCPassword = true;
  }

}
