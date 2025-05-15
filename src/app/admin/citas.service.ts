import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root'})

export class AdminCitasService {
    private apiUrl = 'http://localhost:3200/citas'

    constructor(private http: HttpClient) {}

    obtenerCitas(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl)
    }

    eliminarCita(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    actualizarCita(id: number, cita: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, cita)
    }
}