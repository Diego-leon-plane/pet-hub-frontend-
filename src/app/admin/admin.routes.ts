import { Routes } from '@angular/router';
import { CitasComponent } from './citas/citas.component';
import { MascotasComponent } from './mascotas/mascotas.component';

export const routes: Routes = [
    {path: 'citas', component: CitasComponent},
    {path: 'mascotas', component: MascotasComponent}
]