import { LOCALE_ID,NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { PrimeNgModule } from './prime-ng/prime-ng.module';

import { AppRouterModule } from './app-router.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';


//Idioma
import  localeEs  from "@angular/common/locales/es-EC";
import { registerLocaleData } from "@angular/common";
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //Material Design
    PrimeNgModule,
    AngularMaterialModule,


    //Rutas
    AppRouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
