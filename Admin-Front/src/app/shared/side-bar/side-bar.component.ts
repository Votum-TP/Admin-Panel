import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  registroNavigate(){
    this.router.navigate(['/Votum/registro']);
  }
  procesoNavigate(){
    this.router.navigate(['/Votum/proceso']);
  }
  eleccionesNavigate(){
    this.router.navigate(['/Votum/elecciones']);
  }
  cerrarSesionNavigate(){
    this.router.navigate(['/']);
  }
}
