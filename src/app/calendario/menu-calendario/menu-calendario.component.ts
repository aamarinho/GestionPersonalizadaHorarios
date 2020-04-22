import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-calendario',
  templateUrl: './menu-calendario.component.html',
  styleUrls: ['./menu-calendario.component.css']
})
export class MenuCalendarioComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

}
