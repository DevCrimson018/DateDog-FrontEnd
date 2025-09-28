import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedsComponent } from './breeds.component/breeds.component';
import { CitiesComponent } from './cities.component/cities.component';
import { ProvincesComponent } from './provinces.component/provinces.component';
import { CountriesComponent } from './countries.component/countries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewsModule } from "../views/views-module";



@NgModule({
  declarations: [
    BreedsComponent,
    CitiesComponent,
    ProvincesComponent,
    CountriesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ViewsModule
],
  exports: [
    BreedsComponent,
    CitiesComponent,
    ProvincesComponent,
    CountriesComponent
  ],
})
export class ComboBoxesModule { }
