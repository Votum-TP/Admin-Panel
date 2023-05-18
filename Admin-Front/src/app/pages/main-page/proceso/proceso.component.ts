import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import axios from 'axios';
import * as XLSX from 'xlsx'
import { EleccionService } from 'src/app/services/eleccion/eleccion.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {

  constructor(private service : EleccionService,private router : Router) { }
  public listNumbers1: any;

  ngOnInit(): void {
    this.listNumbers1 = [];
    // this.listNumbers2 = [];

    for (let index = 0; index < 10; index++) {
      this.listNumbers1.push(index);
    }
  }
  name: string= '';
  fileVotantes: any;
  filePartidos: any;
  ExcelDataPartidos: any;
  ExcelDataVotantes: any;
  fileReaderPartidos: any;
  fileReaderVotantes: any;
  numberPage: number = 1 ;
  partidos: any;

  drop($event: CdkDragDrop<number[]>){

    if($event.previousContainer === $event.container){
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }else{
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      );
    }


  }

  firstPage(){
    this.numberPage = 1
    $(".secondPage").addClass("hidden");
    $(".thirdPage").addClass("hidden");

    $(".firstPage").removeClass("hidden");
  }
  secondPage(){
    this.numberPage = 2
    if($('.Nombre').val()==""||$('.Descripcion').val()==""||$('.FechaInicio').val()==""||$('.FechaFin').val()==""){
      $(".popup-title").html("Campos faltantes");
      var mensaje = "Falta completar campo(s) ";
      if($('.Nombre').val()==""){
        mensaje = mensaje + "Nombre,";
      }
      if($('.Descripcion').val()==""){
        mensaje = mensaje + " Descripción,";
      }
      if($('.FechaInicio').val()==""){
        mensaje = mensaje + " Fecha inicio,";
      }
      if($('.FechaFin').val()==""){
        mensaje = mensaje + " FechaFin.";
      }

      if(mensaje.charAt(mensaje.length-1)==","){
        mensaje = mensaje.slice(0, -1) + "."
      }
      $(".popup-description").html(mensaje);
      $(".popup").addClass("active");
      $(".form").addClass("blur");
      
    }else{
      $(".firstPage").addClass("hidden");
      $(".thirdPage").addClass("hidden");
      $(".secondPage").removeClass("hidden");
    }
  }
  secondPageBack(){
    this.numberPage = 2
      $(".firstPage").addClass("hidden");
      $(".thirdPage").addClass("hidden");
      $(".secondPage").removeClass("hidden");
  }
  
  thirdPage(){
    this.numberPage = 3
    var excelNoLeidoPartidos = false;
    var excelNoLeidoVotantes = false;

    //Validacion si los archivos no estan subidos
    if(this.fileVotantes== null || this.filePartidos==null){
      var mensaje = "Falta cargar archivo(s)"
      $(".popup-title").html("Archivo(s) faltante(s)");

      if(this.fileVotantes== null){
        mensaje=mensaje+" votantes pertenecientes a la elección,";
        $(".popup").addClass("active");
        $(".form").addClass("blur");
      }
      if(this.filePartidos== null){
        mensaje=mensaje+" partidos pertenecientes a la elección,";
        $(".popup").addClass("active");
        $(".form").addClass("blur");
      }
      if(mensaje.charAt(mensaje.length-1)==","){
        mensaje = mensaje.slice(0, -1) + "."
      }
      $(".popup-description").html(mensaje);

    }
     
       //Validacion del formato de excel de partidos
       if(!this.ExcelDataPartidos[0].hasOwnProperty('Nombre')||!this.ExcelDataPartidos[0].hasOwnProperty('Descripcion')||!this.ExcelDataPartidos[0].hasOwnProperty('Propuestas')||!this.ExcelDataPartidos[0].hasOwnProperty('Imagen')||!this.ExcelDataPartidos[0].hasOwnProperty('CodigoCandidato')||!this.ExcelDataPartidos[0].hasOwnProperty('NombreRepresentante')){
       $(".popup-title").html("Formato incorrecto");
       $(".popup-description").html("Cargue un excel con el formato indicado para los partidos");
       $(".popup").addClass("active");
       $(".form").addClass("blur");
       excelNoLeidoPartidos = true;
      }else{
        excelNoLeidoPartidos = false;
      }
      console.log(this.ExcelDataPartidos[0]);

      //se valida que si el excel del partido no es leido no debe validar los siguiente
      if(!excelNoLeidoPartidos)
      {
        //Validacion del formato de excel de votantes

          if(!this.ExcelDataVotantes[0].hasOwnProperty('Codigo'))
          {
           $(".popup-title").html("Formato incorrecto");
           $(".popup-description").html("Cargue un excel con el formato indicado para los votantes");
           $(".popup").addClass("active");
           $(".form").addClass("blur");
            excelNoLeidoVotantes = true;
          }else{
            excelNoLeidoVotantes = false;
          }
      }
        
        
      console.log(this.ExcelDataVotantes[0]);

      if(!excelNoLeidoPartidos && !excelNoLeidoVotantes){
        $(".firstPage").addClass("hidden");
        $(".secondPage").addClass("hidden");
  
        $(".thirdPage").removeClass("hidden");
      }
    
  }
  
  getName( name: string){
    this.name = name;
  }
  getFileVotantes( event: any){
    this.fileVotantes = event.target.files[0];
    let fileList = document.getElementById("files-list-votantes")??new HTMLElement;
    fileList.innerHTML = "";
    let reader = new FileReader();
    let listItem = document.createElement("div");
    let fileName =  this.fileVotantes.name;
    $(".votantes-file-name").val(fileName);
    let fileSize = parseInt((this.fileVotantes.size / 1024).toFixed(1));
    listItem.setAttribute("class","file-element");
    listItem.setAttribute("style","background-color: #F0F8FF;position: relative; display: flex; height: 100%;border-radius: 8px;");
    listItem.innerHTML = `<a class="icon-file" style="height: 70px;background-image: url(../../../../assets/file_blue.svg);width: 90px;margin: 25px -30px 0 25px;background-repeat: no-repeat;"></a><div _ngcontent-mvb-c20=""><p _ngcontent-mvb-c20="" class="file-loaded-name" style="word-break: break-word; font-family: Poppins; font-weight: 900; width: 400px; padding: 20px 90px 0px 0px; margin-left: auto;">${fileName}</p><p _ngcontent-mvb-c20="" class="file-loaded-size" style="word-break: break-word;font-family: Poppins;font-weight: 900;color: #95989E;font-size: 0.85em;">${fileSize}KB</p></div><a class="icon-file" style="height: 80px;background-image: url(../../../../assets/check_blue.svg);width: 70px;background-repeat: no-repeat;position: absolute;top: 10px;right: -30px;"></a>`;
    if ( fileSize  >= 1024) {
      fileSize =parseInt((fileSize / 1024).toFixed(1)) ;
      listItem.innerHTML = `<a class="icon-file" style="height: 70px;background-image: url(../../../../assets/file_blue.svg);width: 90px;margin: 25px -30px 0 25px;background-repeat: no-repeat;"></a><div _ngcontent-mvb-c20=""><p _ngcontent-mvb-c20="" class="file-loaded-name" style="word-break: break-word; font-family: Poppins; font-weight: 900;width: 400px; padding: 20px 90px 0px 0px; margin-left: auto;">${fileName}</p><p _ngcontent-mvb-c20="" class="file-loaded-size" style="word-break: break-word;font-family: Poppins;font-weight: 900; color: #95989E;font-size: 0.85em; ;">${fileSize.toString()}MB</p></div><a class="icon-file" style="height: 80px;background-image: url(../../../../assets/check_blue.svg);width: 70px;background-repeat: no-repeat;position: absolute;top: 10px;right: -30px;"></a>`;
    }
    fileList.appendChild(listItem);
    $(".votantes-upload").addClass("hidden");
    $(".votantes-remove").removeClass("hidden");
    $(".button-next-container").removeClass("hidden");

    this.fileReaderVotantes = new FileReader();
    this.fileReaderVotantes.readAsBinaryString(this.fileVotantes);

    //Lectura de excel de votantes
    this.fileReaderVotantes.onload = () =>{
    var workbook = XLSX.read(this.fileReaderVotantes.result,{type:'binary'});
    var SheetNames = workbook.SheetNames;
    this.ExcelDataVotantes = XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames[0]])
    if(this.ExcelDataVotantes.length >= 5)
      {
        $(".drag-drop-row").attr("style","overflow-y: scroll;height: "+55*7+"px")
      }
    } 
  }
  removeFileVotantes(){
      this.fileReaderVotantes = null;
      $(".votantes-file-name").val("");
      $(".votantes-remove").addClass("hidden");
      $(".votantes-upload").removeClass("hidden");
      let fileList = document.getElementById("files-list-votantes")??new HTMLElement;
      fileList.firstElementChild?.remove();
      this.fileVotantes =null;
      $(".inputfile").val("");
  }

  getFilePartidos( event: any){
    this.filePartidos = event.target.files[0];
    let fileList = document.getElementById("files-list-partidos")??new HTMLElement;
    fileList.innerHTML = "";
    let reader = new FileReader();
    let listItem = document.createElement("div");
    let fileName =  this.filePartidos.name;
    $(".partidos-file-name").val(fileName);
    let fileSize = parseInt((this.filePartidos.size / 1024).toFixed(1));
    listItem.setAttribute("class","file-element");
    listItem.setAttribute("style","background-color: #F0F8FF;position: relative; display: flex; height: 100%;border-radius: 8px;");
    listItem.innerHTML = `<a class="icon-file" style="height: 70px;background-image: url(../../../../assets/file_blue.svg);width: 90px;margin: 25px -30px 0 25px;background-repeat: no-repeat;"></a><div _ngcontent-mvb-c20=""><p _ngcontent-mvb-c20="" class="file-loaded-name" style="word-break: break-word; font-family: Poppins; font-weight: 900; width: 400px; padding: 20px 90px 0px 0px; margin-left: auto;">${fileName}</p><p _ngcontent-mvb-c20="" class="file-loaded-size" style="word-break: break-word;font-family: Poppins;font-weight: 900;color: #95989E;font-size: 0.85em;">${fileSize}KB</p></div><a class="icon-file" style="height: 80px;background-image: url(../../../../assets/check_blue.svg);width: 70px;background-repeat: no-repeat;position: absolute;top: 10px;right: -30px;"></a>`;
    if ( fileSize  >= 1024) {
      fileSize =parseInt((fileSize / 1024).toFixed(1)) ;
      listItem.innerHTML = `<a class="icon-file" style="height: 70px;background-image: url(../../../../assets/file_blue.svg);width: 90px;margin: 25px -30px 0 25px;background-repeat: no-repeat;"></a><div _ngcontent-mvb-c20=""><p _ngcontent-mvb-c20="" class="file-loaded-name" style="word-break: break-word; font-family: Poppins; font-weight: 900;width: 400px; padding: 20px 90px 0px 0px; margin-left: auto;">${fileName}</p><p _ngcontent-mvb-c20="" class="file-loaded-size" style="word-break: break-word;font-family: Poppins;font-weight: 900; color: #95989E;font-size: 0.85em; ;">${fileSize.toString()}MB</p></div><a class="icon-file" style="height: 80px;background-image: url(../../../../assets/check_blue.svg);width: 70px;background-repeat: no-repeat;position: absolute;top: 10px;right: -30px;"></a>`;
    }
    fileList.appendChild(listItem);
    $(".partidos-upload").addClass("hidden");
    $(".partidos-remove").removeClass("hidden");
    $(".button-next-container").removeClass("hidden");

      //Lectura de excel de partidos
      this.fileReaderPartidos = new FileReader();
      this.fileReaderPartidos.readAsBinaryString(this.filePartidos);

      this.fileReaderPartidos.onload = () =>{
      var workbook = XLSX.read(this.fileReaderPartidos.result,{type:'binary'});
      var SheetNames = workbook.SheetNames;
      this.ExcelDataPartidos = XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames[0]])

      if(this.ExcelDataPartidos.length >= 5){
        $(".drag-drop-row").attr("style","overflow-y: scroll;height: "+55*7+"px")
      }
      }
  }
  removeFilePartidos(){
      this.fileReaderPartidos = null
      $(".partidos-file-name").val("");
      $(".partidos-remove").addClass("hidden");
      $(".partidos-upload").removeClass("hidden");
      let fileList = document.getElementById("files-list-partidos")??new HTMLElement;
      fileList.firstElementChild?.remove();
      this.filePartidos =null;
      $(".inputfile").val("");
  }
  openPopUp(){
    $(".popup").addClass("active");
    $(".form").addClass("blur");
  }
  closePopUp(){
    $(".popup").removeClass("active");
    $(".form").removeClass("blur");
    if($(".button-action-pop").val()== 1){
      this.router.navigateByUrl("/Votum/elecciones");
    }
  }

  GuardarEleccion(){
 
    let formData = new FormData();
    let nombre = $(".Nombre").val()?.toString()??"";
    let fechaInicio = $(".FechaInicio").val()?.toString()??"";
    let fechaFin = $(".FechaFin").val()?.toString()??"";
    let description = $('.Descripcion').val()?.toString()??"";
    console.log(description);
    console.log(1);


    formData.append('Nombre',nombre)
    formData.append('FechaInicio',fechaInicio)
    formData.append('FechaFin',fechaFin)
    formData.append('Descripcion',description)
    formData.append('files', this.fileVotantes)
   
   for (let i = 0; i < this.ExcelDataPartidos.length; i++) {
      formData.append('partidos['+i+'].Nombre',this.ExcelDataPartidos[i].Nombre)
      formData.append('partidos['+i+'].Descripcion',this.ExcelDataPartidos[i].Descripcion)
      formData.append('partidos['+i+'].Propuestas',this.ExcelDataPartidos[i].Propuestas)
      formData.append('partidos['+i+'].Imagen',this.ExcelDataPartidos[i].Imagen)
      formData.append('partidos['+i+'].CodigoCandidato',this.ExcelDataPartidos[i].CodigoCandidato)
    }
    console.log(formData);
    
    this.service.postEleccion(formData);

  }


  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
