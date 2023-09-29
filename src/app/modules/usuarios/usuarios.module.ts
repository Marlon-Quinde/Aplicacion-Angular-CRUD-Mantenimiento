import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { HomeUsuariosComponent } from './pages/home-usuarios/home-usuarios.component';

import { InicioComponent } from './components/inicio/inicio.component';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeUsuariosComponent, InicioComponent],
  imports: [
    CommonModule,

    //Material Desing
    AngularMaterialModule,
    PrimeNgModule,
    ReactiveFormsModule,

    //Router
    UsuariosRoutingModule,
  ],
  providers: [],
})
export class UsuariosModule {}
