import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthComponent} from './auth.component';
import { MaterialAppModule } from '../ngmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorLoginComponent } from '../modal-error/error-login/error-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    AuthComponent,
    ErrorLoginComponent,
    ForgotPasswordComponent],
  entryComponents: [
    ErrorLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialAppModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
