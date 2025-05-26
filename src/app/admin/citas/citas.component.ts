import { Component, OnInit } from '@angular/core';
import { AdminCitasService } from '../citas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-citas-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {
  citas: any [] = []
  citaSeleccionada: any = null

  constructor(private citasService: AdminCitasService) {}

  ngOnInit(): void {
    this.obtenerCitas()
  }

  obtenerCitas(): void {
    this.citasService.obtenerCitas().subscribe(data => this.citas = data)
  }

  eliminarCita(id: number): void {
    if(confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citasService.eliminarCita(id).subscribe(() => {
        this.citas = this.citas.filter(c => c.id !== id)
      })
    }
  }

  editarCita(cita: any):void {
    const fechaOriginal = new Date(cita.fecha)
    const fechaFormateada = fechaOriginal.toISOString().split('T')[0]

    this.citaSeleccionada = { ...cita, fecha: fechaFormateada } 
  }

  guardarCambios(): void {
    if(!this.citaSeleccionada) return 

    const fechaOriginal = new Date(this.citaSeleccionada.fecha)
    const fechaFormateada = fechaOriginal.toISOString().split('T')[0]

    const datosEditados = {
      ...this.citaSeleccionada,
      fecha: fechaFormateada
    }

    this.citasService.actualizarCita(this.citaSeleccionada.id, datosEditados).subscribe(() => {
      this.obtenerCitas()
      this.citaSeleccionada = null
    }, error => {
      console.error('Error al actualizar cita', error)
    })
  }

  cancelarEdicion(): void {
    this.citaSeleccionada = null
  }
}
