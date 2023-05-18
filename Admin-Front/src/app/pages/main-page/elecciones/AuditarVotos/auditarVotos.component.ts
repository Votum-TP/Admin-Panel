import { Component, OnInit } from '@angular/core';
import { VotosService } from 'src/app/services/votos/votos.service';

@Component({
  selector: 'app-auditarVotos',
  templateUrl: './auditarVotos.component.html',
  styleUrls: ['./auditarVotos.component.css']
})
export class AuditarVotosComponent implements OnInit {

  constructor(private service: VotosService) { 
    
  }

  ngOnInit() {
  }
  openPopUp(){
    var codigo=$("#codigo-voto").val();
    if($(".codigo-voto").val()!=""){
    this.service.GetVoto(codigo.toString()).subscribe( voto =>{
      console.log(voto);
      if(voto.Code == 200){
        $(".popup-voto").addClass("active");
        let preview = document.getElementById("preview")??new HTMLElement;
        if(!$(".preview").hasClass('preview-completed')){
          $(".preview").addClass('preview-completed')
          let listItem = document.createElement("img");
          listItem.setAttribute("src",voto.Imagen);
          listItem.setAttribute("class","logo-partido");
          listItem.setAttribute("style","height: 10rem;");
          preview.prepend(listItem);
        }else{
          $(".logo-partido").attr("src",voto.Imagen);
        }
        $("#nombre-eleccion").html("Eleccion: "+voto.Eleccion);
        $("#nombre-partido").html("Partido: "+voto.Partido);
        $("#codigo-alumno").html("Codigo de Votante: "+voto.CodigoAlumno);
        $("#fecha-voto").html("Hora de sufragio: "+voto.FechaHoraRegistro);
      }else{
        $(".popup").addClass("active");
        $(".popup-title").html("El voto no se encontró");
        $(".popup-description").html("Ingrese un código válido");
      }
    })
  }else{
    $(".popup").addClass("active");
    $(".popup-title").html("Campo vacío");
    $(".popup-description").html("Ingrese un código válido");

  }
    $(".form").addClass("blur");
  }
  closePopUp(){
    $(".popup-voto").removeClass("active");
    $(".popup").removeClass("active");
    $(".form").removeClass("blur");
  }
}
