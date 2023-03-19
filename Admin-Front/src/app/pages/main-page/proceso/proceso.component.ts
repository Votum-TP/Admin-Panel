import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import axios from 'axios';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.css']
})
export class ProcesoComponent implements OnInit {

  constructor() { }
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
  ExcelData: any;
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
    $(".secondPage").addClass("hidden");
    $(".thirdPage").addClass("hidden");

    $(".firstPage").removeClass("hidden");
  }
  secondPage(){
    
    if($('.Nombre').val()==""||$('.Descripcion').val()==""||$('.fechaInicio').val()==""||$('.fechaFin').val()==""){
      $(".popup-title").html("Campos faltantes");
      var mensaje = "Falta completar campo(s) ";
      if($('.Nombre').val()==""){
        mensaje = mensaje + "Nombre,";
      }
      if($('.Descripcion').val()==""){
        mensaje = mensaje + " Descripción,";
      }
      if($('.fechaInicio').val()==""){
        mensaje = mensaje + " Fecha inicio,";
      }
      if($('.fechaFin').val()==""){
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
      $(".firstPage").addClass("hidden");
      $(".thirdPage").addClass("hidden");
      $(".secondPage").removeClass("hidden");
  }
  thirdPage(){
    if(this.fileVotantes== null || this.filePartidos==null){
      $(".popup-title").html("Archivo(s) faltante(s)");

      if(this.fileVotantes== null){
        $(".popup-description").html("Falta cargar el archivo de votantes pertenecientes a la elección");
        $(".popup").addClass("active");
        $(".form").addClass("blur");
      }
      if(this.filePartidos== null){
        $(".popup-description").html("Falta cargar el archivo de partidos pertenecientes a la elección");
        $(".popup").addClass("active");
        $(".form").addClass("blur");
      }
    }
    //Lectura de excel de partidos
    let fileReaderPartidos = new FileReader();
    fileReaderPartidos.readAsBinaryString(this.filePartidos);
    fileReaderPartidos.onload = (e) =>{
      var workbook = XLSX.read(fileReaderPartidos.result,{type:'binary'});
      var SheetNames = workbook.SheetNames;
      console.log(SheetNames);
      this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames[0]])
      console.log(this.ExcelData);
      if(this.ExcelData.length >= 5){
        $(".drag-drop-row").attr("style","overflow-y: scroll;height: "+55*7+"px")
      }
    }
    //Validacion del formato de excel de partidos

    if(!this.ExcelData.hasOwnProperty('Nombre')||!this.ExcelData.hasOwnProperty('Descripcion')||!this.ExcelData.hasOwnProperty('Propuestas')||!this.ExcelData.hasOwnProperty('Imagen')||!this.ExcelData.hasOwnProperty('CodigoCandidato')||!this.ExcelData.hasOwnProperty('NombreRepresentante')){
      $(".popup-title").html("Formato incorrecto");
      $(".popup-description").html("Cargue un excel con el formato indicado para los partidos");
      $(".popup").addClass("active");
      $(".form").addClass("blur");
    }
    //Lectura de excel de votantes

    let fileReaderVotantes = new FileReader();
    fileReaderVotantes.readAsBinaryString(this.filePartidos);
    fileReaderVotantes.onload = (e) =>{
      var workbook = XLSX.read(fileReaderVotantes.result,{type:'binary'});
      var SheetNames = workbook.SheetNames;
      console.log(SheetNames);
      this.ExcelData = XLSX.utils.sheet_to_json(workbook.Sheets[SheetNames[0]])
      console.log(this.ExcelData);
      if(this.ExcelData.length >= 5){
        $(".drag-drop-row").attr("style","overflow-y: scroll;height: "+55*7+"px")
      }
    }
    //Validacion del formato de excel de votantes

    if(!this.ExcelData.hasOwnProperty('Codigo')){
      $(".popup-title").html("Formato incorrecto");
      $(".popup-description").html("Cargue un excel con el formato indicado para los electores");
      $(".popup").addClass("active");
      $(".form").addClass("blur");
    }

    $(".firstPage").addClass("hidden");
    $(".secondPage").addClass("hidden");

    $(".thirdPage").removeClass("hidden");
   
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
    console.log(this.fileVotantes);
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
  }
  removeFileVotantes(){
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
    console.log(this.filePartidos);
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
  }
  removeFilePartidos(){
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
  }

  GuardarEleccion(){
 
    alert();
    let formData = new FormData();

    formData.append('Nombre',"prueba")
    formData.append('FechaInicio',"22/10/1999")
    formData.append('FechaFin',"23/10/1999")
    formData.append('files', this.fileVotantes)
   
   for (let i = 0; i < this.ExcelData.length; i++) {
      formData.append('partidos['+i+'].Nombre',this.ExcelData[i].Nombre)
      formData.append('partidos['+i+'].Descripcion',this.ExcelData[i].Descripcion)
      formData.append('partidos['+i+'].Propuestas',this.ExcelData[i].Propuestas)
      formData.append('partidos['+i+'].Imagen',this.ExcelData[i].Imagen)
      formData.append('partidos['+i+'].CodigoCandidato',this.ExcelData[i].CodigoCandidato)
    }

    // formData.append('name',file)

    var response =  axios({
    url: "https://localhost:7101/api/Elecciones/CrearEleccion",
    method: "POST",
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  }).then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error);
  });
  }

}
