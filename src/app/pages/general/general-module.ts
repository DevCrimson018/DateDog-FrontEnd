import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing-module';
import { General } from './general';
import { Home } from './home/home';
import { FormsModule } from '@angular/forms'; // ← Añade esta importación


@NgModule({
  declarations: [
    General,
    Home
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormsModule
  ]
})
export class GeneralModule { }
