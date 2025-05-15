import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mascotas',
  imports: [ CommonModule, FormsModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {
  mascotas: any[] = []

  constructor(private mascotasService: MascotasService){}

  ngOnInit(): void {
    this.obtenerMascotas()
  }

  obtenerMascotas(){
    this.mascotasService.obtenerMascotas().subscribe({
      next: (data) => this.mascotas = data,
      error: (error) => console.log('Error al obtener mascotas:', error )
    })
  }
}
