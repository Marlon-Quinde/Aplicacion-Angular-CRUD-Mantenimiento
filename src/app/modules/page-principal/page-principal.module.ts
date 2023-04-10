import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { HomeInicioComponent } from './pages/home-inicio/home-inicio.component';
import { PagePrincipalRoutingModule } from './page-principal-routing.module';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';



@NgModule({
  declarations: [
    HomeInicioComponent,
    MenuBarComponent
  ],
  imports: [
    CommonModule,


    //Material Design
    PrimeNgModule,
    AngularMaterialModule,

    //Router
    PagePrincipalRoutingModule
  ],
  exports:[
    HomeInicioComponent
  ]
})
export class PagePrincipalModule { }
