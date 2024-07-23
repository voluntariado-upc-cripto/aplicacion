import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', loadChildren:() => import('./modules/sesion/sesion.module').then(m=>m.SesionModule)},
  {path: 'login', loadChildren:() => import('./modules/sesion/sesion.module').then(m=>m.SesionModule)},
  {path: 'administrador', loadChildren:() => import('./modules/administrador/administrador.module').then(m=>m.AdministradorModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
