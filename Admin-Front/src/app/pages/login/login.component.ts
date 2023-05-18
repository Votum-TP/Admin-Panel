import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
    Creamos los controles
  */
 public login = this.form.group({
   
 })


  constructor( private form: FormBuilder,private service: LoginService) { }

  ngOnInit(): void {
  }

  Login(){
    if($('.CodigoAlumno').val()==""||$('.Contrasena').val()==""){
      $(".popup-title").html("Campos faltantes");
      var mensaje = "Falta completar campo(s) ";
      if($('.CodigoAlumno').val()==""){
        mensaje = mensaje + "Codigo de alumno,";
      }
      if($('.Contrasena').val()==""){
        mensaje = mensaje + " Contraseña,";
      }
      if(mensaje.charAt(mensaje.length-1)==","){
        mensaje = mensaje.slice(0, -1) + "."
      }
      $(".popup-description").html(mensaje);
      $(".popup").addClass("active");
      $(".form").addClass("blur");
      
    }else{
      this.service.IniciarSesion($('.CodigoAlumno').val().toString(),$('.Contrasena').val().toString());
    }
  }
  closePopUp(){
    $(".popup").removeClass("active");
    $(".form").removeClass("blur");
  }
}
