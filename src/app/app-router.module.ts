import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthTokenGuard } from './shared/guard/auth-token.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./modules/page-principal/page-principal.module').then( m => m.PagePrincipalModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then( m => m.UsuariosModule ),
    //canActivate: [AuthTokenGuard]
  },
  {
    path: '404' ,
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
