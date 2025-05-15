import { Routes } from '@angular/router';
import { MascotasComponent } from './mascotas/mascotas.component';
import { CitasComponent } from './citas/citas.component';


export const routes: Routes = [
    {path: 'mascotas', component: MascotasComponent },
    {path: 'citas', component: CitasComponent}
]