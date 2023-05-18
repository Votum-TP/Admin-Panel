import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPermissionGuard } from '../guards/login-permission.guard';
const routes: Routes = [
  {path:'',loadChildren: ()=> import('./login/login.module').then(m=>m.LoginModule)},
  {path: 'login', loadChildren: ()=> import('./login/login.module').then(m=>m.LoginModule)},
  {path:'Votum',
  component: MainPageComponent, canActivate:[LoginPermissionGuard],
  children:[
    {
      path: 'proceso', loadChildren:()=> import('./main-page/proceso/proceso.module').then(m=>m.ProcesoModule)
    },
    {
      path: 'registro', loadChildren:()=> import('./main-page/registro/registro.module').then(m=>m.RegistroModule)
    },
    {
      path: 'elecciones', loadChildren:()=> import('./main-page/elecciones/elecciones.module').then(m=>m.EleccionesModule)
    },
    {
      path:'elecciones/detalle/:idEleccion',loadChildren:()=>import('./main-page/elecciones/DetalleEleccion/DetalleEleccion.module').then(m=>m.DetalleEleccionModule)
    },
    {
      path:'elecciones/auditarVoto',loadChildren:()=>import('./main-page/elecciones/AuditarVotos/auditarVotos-routing.module').then(m=>m.AuditarVotosRoutingModule)
    },
    {
      path:'administradores',loadChildren:()=>import('./main-page/admins/admins-routing.module').then(m=>m.AdminsRoutingModule)
    },
    {
      path:'administradores/CrearAdministrador',loadChildren:()=>import('./main-page/admins/administradores/administradores-routing.module').then(m=>m.AdministradoresRoutingModule)
    }
  ]
  
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
