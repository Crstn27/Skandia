import { Component } from '@angular/core';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SideBarItems } from '../../models/sidebar-items-model';

@Component({
  selector: 'shared-appbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.scss'
})
export class AppbarComponent {
  public readonly sidebarItems : SideBarItems[] = [
    {label:'Inicio', icon:'home'},
    {label:'Contratos', icon:'description'},
    {label:'Acciones', icon:'build'},
    {label:'Objetivos', icon:'star'},
    {label:'Herramientas', icon:'attach_money'},
    {label:'Servicio al cliente', icon:'support'}
  ];
}
