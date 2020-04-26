import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-calendario',
  templateUrl: './menu-calendario.component.html',
  styleUrls: ['./menu-calendario.component.css']
})
export class MenuCalendarioComponent implements OnInit {

  tipo=window.sessionStorage.getItem('tipo');

  constructor(private router:Router) { }

  ngOnInit() {
  }

  irACalendario(){
    window.sessionStorage.setItem('calendariousuario',window.sessionStorage.getItem('email'));
    this.router.navigate(['/calendario']);
  }

}
