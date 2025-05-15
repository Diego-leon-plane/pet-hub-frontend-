import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.http.post<any>('http://localhost:3200/auth/login', credentials).subscribe({
      next: (res) => {
        localStorage.setItem('token',res.token)
        localStorage.setItem('rol', res.rol)
        if(res.rol === 'ADMIN'){
          this.router.navigate(['/admin'])
        } else{
          this.router.navigate(['/user/'])
        }
      },
      error: (err) => {
        alert('Credenciales inválidas')
      }
    });
  }
}
