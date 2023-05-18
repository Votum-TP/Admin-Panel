import { Component, OnInit } from '@angular/core';
import { AdminsService } from 'src/app/services/administradores/administradores.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html',
  styleUrls: ['./administradores.component.css']
})
export class AdministradoresComponent implements OnInit {

  constructor(private service: AdminsService) { 
    
  }

  ngOnInit() {
  }
  openPopUp(){
    var codigo=$("#codigo-voto").val();
    if($(".codigo-voto").val()!=""){
    this.service.crearAdministrador(codigo.toString())
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
