import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,

    CommonModule,
    AuthRoutingModule,

    //Material y PrimeNg
    AngularMaterialModule,
    PrimeNgModule
  ]
})
export class AuthModule { }
