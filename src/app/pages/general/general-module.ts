import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing-module';
import { General } from './general';
import { Home } from './home/home';


@NgModule({
  declarations: [
    General,
    Home
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule
  ]
})
export class GeneralModule { }
