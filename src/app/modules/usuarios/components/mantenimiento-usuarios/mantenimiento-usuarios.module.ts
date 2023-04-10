import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarUsuariosComponent } from './pages/mostrar-usuarios/mostrar-usuarios.component';
import { MantenimientoUsuariosRoutingModule } from './mantenimiento-usuarios-routing.module';
import { PrimeNgModule } from '../../../../prime-ng/prime-ng.module';
import { AngularMaterialModule } from '../../../../angular-material/angular-material.module';
import { ModificarUsuariosComponent } from './pages/modificar-usuarios/modificar-usuarios.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgregarUsuariosComponent } from './pages/agregar-usuarios/agregar-usuarios.component';



@NgModule({
  declarations: [
    MostrarUsuariosComponent,
    ModificarUsuariosComponent,
    AgregarUsuariosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    //PrimeNg y Angular
    PrimeNgModule,
    AngularMaterialModule,

    //Router
    MantenimientoUsuariosRoutingModule
  ]
})
export class MantenimientoUsuariosModule { }
