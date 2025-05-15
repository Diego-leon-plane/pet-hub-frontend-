import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { MascotasComponent } from './mascotas/mascotas.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, 
    MascotasComponent
  ]
})
export class UserModule { }
