import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', loadChildren: ()=> import('./login/login.module').then(m=>m.LoginModule)},
  {path:'',
  component: MainPageComponent, 
  children:[
    {
      path: 'proceso', loadChildren:()=> import('./main-page/proceso/proceso.module').then(m=>m.ProcesoModule)
    },
    {
      path: 'registro', loadChildren:()=> import('./main-page/registro/registro.module').then(m=>m.RegistroModule)
    }
    
    
  ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
