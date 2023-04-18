import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalleEleccionComponent } from './DetalleEleccion.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DetalleEleccionRoutingModule } from './Detalle-routing.module';


@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    DetalleEleccionRoutingModule
 
  ],
  declarations: [DetalleEleccionComponent],
  
})
export class DetalleEleccionModule { 
  
}
