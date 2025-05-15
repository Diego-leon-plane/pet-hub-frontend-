import { Component, OnInit } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mascotas',
  imports: [CommonModule, FormsModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css'
})
export class MascotasComponent implements OnInit {
  mascotas: any[] = []
  rol: string | null = null 
  mascotaEditando: number | null = null
  nombreEditado: string = ''
  tipoEditado: string = ''

  nuevaMascota = {
    nombre: '',
    tipo: ''
  }

  constructor(private mascotasService: MascotasService, private auth: AuthService){}

  ngOnInit(): void {
    this.rol = this.auth.obtenerRol()
    this.mascotasService.obtenerMascotas().subscribe((data => {
      this.mascotas = data
    }))
  }

  registrarMascota(){
    this.mascotasService.crearMascota(this.nuevaMascota).subscribe((mascotaCreada) => {
      this.mascotas.push(mascotaCreada)
      this.nuevaMascota = { nombre: '', tipo: '' } //Limpia el formulario
    })
  }

  eliminarMascota( id: number) {
    if(confirm('¿Seguro que quieres eliminar esta mascota?')){
      this.mascotasService.eliminarMascota(id).subscribe(()=> {
        this.mascotas = this.mascotas.filter(m => m.id !== id)
      })
    }
  }

  editarMascota(mascota: any){
    this.mascotaEditando = mascota.id
    this.nombreEditado = mascota.nombre
    this.tipoEditado = mascota.tipo
  }

  guardarEdicion(){
    if(this.nombreEditado.trim() === '' || this.tipoEditado.trim() === ''){
      alert('Ningun campo puede quedar vacio')
      return
    }

    const mascotaActualizada = {
      nombre: this.nombreEditado,
      tipo: this.tipoEditado
    }

    this.mascotasService.actualizarMascota(this.mascotaEditando!, mascotaActualizada).subscribe(() => {
      this.mascotas = this.mascotas.map(m => m.id === this.mascotaEditando? { ...m, ...mascotaActualizada } : m)
      this.cancelarEdicion()
    })
  }

  cancelarEdicion(){
    this.mascotaEditando = null
    this.nombreEditado = ''
    this.tipoEditado = ''   
  }
}
