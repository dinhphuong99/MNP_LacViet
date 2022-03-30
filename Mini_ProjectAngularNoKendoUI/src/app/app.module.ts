import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmployeeComponent } from './employee/show-employee/show-employee.component';
import { AddEditEmployeeComponent } from './employee/add-edit-employee/add-edit-employee.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDepartmentComponent } from './department/show-department/show-department.component';
import { AddEditDepartmentComponent } from './department/add-edit-department/add-edit-department.component';

import { MnpjApiService } from './mnpj-api.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';




@NgModule({
  declarations: [// có duôi component
    AppComponent,
    EmployeeComponent,
    ShowEmployeeComponent,
    AddEditEmployeeComponent,
    DepartmentComponent,
    ShowDepartmentComponent,
    AddEditDepartmentComponent
  ],
  imports: [//có đuôi Module
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, ButtonsModule, BrowserAnimationsModule, GridModule
  ],
  providers: [MnpjApiService],//Noi thêm sevice
  bootstrap: [AppComponent]
})
export class AppModule { }