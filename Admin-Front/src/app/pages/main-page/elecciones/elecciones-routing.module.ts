<<<<<<< HEAD
import { EleccionesComponent } from './elecciones.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: EleccionesComponent}
];
=======
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];
>>>>>>> be75b004aedbd172099b953a5fcbefd3ca1c1048

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EleccionesRoutingModule { }
