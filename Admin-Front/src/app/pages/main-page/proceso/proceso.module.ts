import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesoRoutingModule } from './proceso-routing.module';
import { ProcesoComponent } from './proceso.component';


@NgModule({
  declarations: [
    ProcesoComponent
  ],
  imports: [
    CommonModule,
    ProcesoRoutingModule
  ]
})
export class ProcesoModule { }
