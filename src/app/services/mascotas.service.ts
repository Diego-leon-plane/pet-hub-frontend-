import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MascotasService {
    private apiUrl = 'http://localhost:3200/mascotas'

    constructor(private http: HttpClient){}

    obtenerMascotas(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl)
    }
    crearMascota(mascota: { nombre: string, tipo:string }):Observable<any> {
        return this.http.post<any>(this.apiUrl, mascota)
    }

    eliminarMascota(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    actualizarMascota(id: number, mascota: { nombre: string, tipo: string }): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, mascota)
    }
}