import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CitasService {

    private apiUrl = 'http://localhost:3200/citas'

    constructor(private http: HttpClient) {}

    listarCitas(): Observable<any> {
        return this.http.get<any>(this.apiUrl)
    }

    crearCita(cita: { mascota_id: number | null, fecha: string, descripcion: string }): Observable<any> {
        return this.http.post<any>(this.apiUrl, cita)
    }

    actualizarCita(id: number, cita: { mascota_id: number | null, fecha: string, descripcion: string }): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, cita)
    }

    eliminarCita(id: number): Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}/${id}`)
    }
}