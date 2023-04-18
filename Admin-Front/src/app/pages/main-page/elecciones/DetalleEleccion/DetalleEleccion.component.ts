import { Component, OnInit } from '@angular/core';
import{donutChartOptions,} from './helpers/donutChartOptions'
import{areaChartOptions} from './helpers/areaChartOptions'
import{barChart} from './helpers/barChart'
import { Color, ScaleType } from '@swimlane/ngx-charts';
import{oneLineBar} from './helpers/oneLineBar'
@Component({
  selector: 'app-DetalleEleccion',
  templateUrl: './DetalleEleccion.component.html',
  styleUrls: ['./DetalleEleccion.component.scss']
})
export class DetalleEleccionComponent  {

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    },
  ];
  view: [number, number] = [900, 400];

  multi: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Partidos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme ='air';

  onSelect(event) {
    console.log(event);
  }
}
