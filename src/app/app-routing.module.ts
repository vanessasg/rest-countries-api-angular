// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CountryInfoComponent } from './country-info/country-info.component';

const routes: Routes = [
  { path: 'countries', component: MainComponent },
  { path: 'countries/:code', component: CountryInfoComponent }, // dettaglio
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: '**', redirectTo: '/countries' }, // fallback per route sconosciute
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
