import { Component, OnInit } from '@angular/core';
import{donutChartOptions,} from './helpers/donutChartOptions'
import{areaChartOptions} from './helpers/areaChartOptions'
import{barChart} from './helpers/barChart'
import { Color, ScaleType } from '@swimlane/ngx-charts';
import{oneLineBar} from './helpers/oneLineBar'
import { EleccionService } from 'src/app/services/eleccion/eleccion.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-DetalleEleccion',
  templateUrl: './DetalleEleccion.component.html',
  styleUrls: ['./DetalleEleccion.component.scss']
})
export class DetalleEleccionComponent implements OnInit {

  single :any;
  eleccion : any;
  idEleccion:any;
  constructor(private _route: ActivatedRoute,private service : EleccionService,private router : Router){
  this._route.params.subscribe(param =>{
    this.idEleccion =param['idEleccion'];
     this.service.GetEleccion(param['idEleccion']).subscribe( eleccion =>{
      console.log(eleccion);
      this.single = eleccion.Partidos
      this.eleccion = eleccion;
      $(".title").html(eleccion.Nombre);
      $(".descripcion").html(eleccion.Descripcion);
      $(".fecha").html(eleccion.FechaInicio + " - "+ eleccion.FechaFin);
    
      if(eleccion.Estado == "terminado"){
        var buttonAction= $(".button-action-eleccion");
        buttonAction.remove();
      }else
      if(eleccion.Estado ==  "no iniciado"){
        
        var buttonAction= $(".button-action-eleccion");
        buttonAction.html("Iniciar");
        buttonAction.addClass("button-iniciar");

      }else
      if(eleccion.Estado ==  "iniciado"){
        var buttonAction= $(".button-action-eleccion");
        buttonAction.html("Finalizar");
        buttonAction.addClass("button-finalizar");
      }
 
    })
    })
  }

  ngOnInit(): void {
    
  }
  closePopUp(){
    $(".popup").removeClass("active");
    $(".form").removeClass("blur");
    this.router.navigateByUrl("/Votum/elecciones");
  }
  cambiarEstado(){
    if(this.eleccion.Estado ==  "no iniciado"){
        
     this.service.iniciarEleccion( this.idEleccion);

    }else
    if(this.eleccion.Estado ==  "iniciado"){
      
      this.service.finalizarEleccion( this.idEleccion);
    }
  }
  // single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   },
  //     {
  //     "name": "UK",
  //     "value": 6200000
  //   },
  // ];
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
