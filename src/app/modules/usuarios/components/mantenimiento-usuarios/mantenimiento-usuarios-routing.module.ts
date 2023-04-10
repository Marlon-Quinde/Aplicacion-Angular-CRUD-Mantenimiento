import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MostrarUsuariosComponent } from './pages/mostrar-usuarios/mostrar-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: MostrarUsuariosComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes)
  ],
  exports:[
    RouterModule
  ]
})
export class MantenimientoUsuariosRoutingModule { }
