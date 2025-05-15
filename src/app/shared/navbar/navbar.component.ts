import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  rol: string | null = null

  constructor(private router: Router) {}

  ngOnInit(): void {
    if(typeof window !== 'undefined'){
      this.rol = localStorage.getItem('rol')
    }
  }

  logout(){
    if(typeof window !== 'undefined'){
      localStorage.clear()
      this.router.navigate([ '/auth/login'])
    }
  }
}
