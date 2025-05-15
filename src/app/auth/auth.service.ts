import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"

interface LoginResponse {
    message: string
    token: string
    rol: string
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:3200/auth/login'

    constructor(private http: HttpClient) {}

    private isBrowser(): boolean {
        return typeof window !== 'undefined' && !!window.localStorage
    }

    login(email: string, password: string ): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl, { email, password })
    }

    guardarToken(token: string): void {
        if(this.isBrowser()){
            localStorage.setItem('token', token)
        }
    }

    guardarRol(rol: string): void {
        if(this.isBrowser()){
            localStorage.setItem('rol', rol)
        } 
    }

    obtenerToken(): string | null {
        return this.isBrowser() ? localStorage.getItem('token') : null
    }

    obtenerRol(): string | null {
        return this.isBrowser() ? localStorage.getItem('rol') : null
    }

    carrarSesion(): void {
        if(this.isBrowser()){
            localStorage.removeItem('token')
            localStorage.removeItem('rol')
        }
    }

    estaAutenticado(): boolean {
        return this.isBrowser() && !!localStorage.getItem('token')
    }
}