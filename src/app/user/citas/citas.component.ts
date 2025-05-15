import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MascotasService } from '../../services/mascotas.service';

@Component({
  selector: 'app-citas',
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {

  citas: any[] = []
  mascotas: any [] = []
  nuevaCita = { mascota_id: null, fecha: '', descripcion: ''} 

  constructor(private citasService: CitasService, private mascotasService: MascotasService){}

  ngOnInit(): void {
    this.listarCitas()
    this.listarMascotas()
  }

  listarMascotas(){
    this.mascotasService.obtenerMascotas().subscribe({
      next: (data) => {
        this.mascotas = data
      },
      error: (error) => {
        console.log('Error al obtener mascotas: ' , error)
      }
    })
  }

  obtenerNombreMascota(id: number): string{
    const mascota = this.mascotas.find(m => m.id === id)
    return mascota ? mascota.nombre : 'Mascota no encontrada'
  }

  listarCitas(): void {
    this.citasService.listarCitas().subscribe({
      next: (data) => {
        this.citas = data 
      }, 
      error: (error) => {
        console.log('Error al obtener las citas: ', error)
      }
    })
  }

  registrarCita(): void {
    this.citasService.crearCita(this.nuevaCita).subscribe({
      next: (data) => {
        this.listarCitas()
        this.nuevaCita = { mascota_id: null, fecha: '', descripcion: '' } //Resetea el formulario
      },
      error: (error) => {
        console.log('Error al crear cita: ', error)
      }
    })
  }

}
