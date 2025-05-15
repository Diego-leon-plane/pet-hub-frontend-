import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor( private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['USER', Validators.required]
    })
  }

  onSubmit() {
    if(this.registerForm.invalid) return 

    const datos = this.registerForm.value

    this.http.post('http://localhost:3200/usuarios', datos).subscribe({
      next: () => {
        alert('Uusario registrado correctamente')
        this.router.navigate(['/login'])
      },
      error: (err) => {
        const mensaje = err.error?.message || 'Error al registrar'
        alert(mensaje)
      }
    })
  }

}
