import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule
  ]
})
export class EmployeeModule { }
