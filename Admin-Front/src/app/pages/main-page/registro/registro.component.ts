import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"
import axios from 'axios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  name: string= '';
  file: any;
  getName( name: string){
    this.name = name;
  }
  getFile( event: any){
    alert();
    this.file = event.target.files[0];
    let fileList = document.getElementById("files-list")??new HTMLElement;
    fileList.innerHTML = "";
    let reader = new FileReader();
    let listItem = document.createElement("div");
    let fileName =  this.file.name;
    console.log(this.file);
    $(".file-name").val(fileName);
    let fileSize = parseInt((this.file.size / 1024).toFixed(1));
    listItem.setAttribute("class","file-element");
    listItem.setAttribute("style","background-color: #F0F8FF;position: relative; display: flex; height: 100%;border-radius: 8px;");
    listItem.innerHTML = `<a class="icon-file" style="height: 80px;background-image: url(../../../../assets/file_blue.svg);width: 90px;margin: 25px -30px 0 25px;background-repeat: no-repeat;"></a><div _ngcontent-mvb-c20=""><p _ngcontent-mvb-c20="" class="file-loaded-name" style="word-break: break-word; font-family: Poppins; font-weight: 900; width: 400px; padding: 20px 90px 0px 0px; margin-left: auto;">${fileName}</p><p _ngcontent-mvb-c20="" class="file-loaded-size" style="word-break: break-word;font-family: Poppins;font-weight: 900;color: #95989E;font-size: 0.85em;">${fileSize}KB</p></div><a class="icon-file" style="height: 80px;background-image: url(../../../../assets/check_blue.svg);width: 70px;background-repeat: no-repeat;position: absolute;top: 10px;right: -30px;"></a>`;
    if ( fileSize  >= 1024) {
      fileSize =parseInt((fileSize / 1024).toFixed(1)) ;
      listItem.innerHTML = `<a class="icon-file" style="height: 80px;background-image: url(../../../../assets/file_blue.svg);width: 90px;margin: 25px -30px 0 25px;background-repeat: no-repeat;"></a><div _ngcontent-mvb-c20=""><p _ngcontent-mvb-c20="" class="file-loaded-name" style="word-break: break-word; font-family: Poppins; font-weight: 900;width: 400px; padding: 20px 90px 0px 0px; margin-left: auto;">${fileName}</p><p _ngcontent-mvb-c20="" class="file-loaded-size" style="word-break: break-word;font-family: Poppins;font-weight: 900; color: #95989E;font-size: 0.85em; ;">${fileSize.toString()}MB</p></div><a class="icon-file" style="height: 80px;background-image: url(../../../../assets/check_blue.svg);width: 70px;background-repeat: no-repeat;position: absolute;top: 10px;right: -30px;"></a>`;
    }
    fileList.appendChild(listItem);
    $(".button-upload").addClass("hidden");
    $(".remove-file").removeClass("hidden");
   
  }
  removeFile(){
      $(".file-name").val("");
      $(".remove-file").addClass("hidden");
      $(".button-upload").removeClass("hidden");
      let fileList = document.getElementById("files-list")??new HTMLElement;
      fileList.firstElementChild?.remove();
      this.file =null;
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
  uploadFile(){
    
    if(this.file != null ||this.file != "" ){
     
        let formData = new FormData();
        formData.append('ArchivoExcel',this.file)
        // formData.append('name',file)
        var response =  axios({
        url: "https://localhost:7101/api/Votantes/CargarParticipantes",
        method: "POST",
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(function (response) {
        console.log(response);
        if(response.data.code == 200){
          $(".popup-title").html("¡Guardado exitoso!");

        }else{
          $(".popup-title").html("Error en el guardado");
        }
        $(".popup").addClass("active");
        $(".form").addClass("blur");
        $(".popup-description").html(response.data.mensaje);
        
      })
      .catch(function (error) {
        console.log(error);

      });

    }
  }



}
