import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarPerfilesComponent } from './pages/mostrar-perfiles/mostrar-perfiles.component';
import { ModificarPerfilesComponent } from './pages/modificar-perfiles/modificar-perfiles.component';
import { AgregarPerfilesComponent } from './pages/agregar-perfiles/agregar-perfiles.component';
import { MantenimientoPerfilesRoutingModule } from './mantenimiento-perfiles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';



@NgModule({
  declarations: [
    MostrarPerfilesComponent,
    ModificarPerfilesComponent,
    AgregarPerfilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //PrimeNg y Angular
    PrimeNgModule,
    AngularMaterialModule,

    //Router
    MantenimientoPerfilesRoutingModule
  ]
})
export class MantenimientoPerfilesModule { }
