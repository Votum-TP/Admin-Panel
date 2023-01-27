import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor( private form: FormBuilder,private router : Router) { }

  ngOnInit(): void {
  }

  Login(){
  
  }

}
