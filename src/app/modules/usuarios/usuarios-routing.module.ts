import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeUsuariosComponent } from './pages/home-usuarios/home-usuarios.component';
import { InicioComponent } from './components/inicio/inicio.component';
//import { MantenimientoUsuariosComponent } from './components/mantenimiento-usuarios/mantenimiento-usuarios.component';
//import { MantenimientoPerfilesComponent } from './components/mantenimiento-perfiles/mantenimiento-perfiles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeUsuariosComponent,
    children: [
      {
        path: '',
        component: InicioComponent,
        pathMatch: 'full',
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import(
            './components/mantenimiento-usuarios/mantenimiento-usuarios.module'
          ).then((m) => m.MantenimientoUsuariosModule),
      },
      {
        path: 'perfiles',
        loadChildren: () =>
          import(
            './components/mantenimiento-perfiles/mantenimiento-perfiles.module'
          ).then((m) => m.MantenimientoPerfilesModule),
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./components/clientes/clientes.module').then(
            (m) => m.ClientesModule
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
