import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {MnpjApiService} from 'src/app/mnpj-api.service'

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.css']
})
export class ShowEmployeeComponent implements OnInit {

  employeeList$!:Observable<any[]>;
  departmentsList$!:Observable<any[]>;
  departmentsList:any=[];

  //Map to display data asscociate with foreign key
  departmentsMap: Map<number, string> = new Map();
  constructor (private service: MnpjApiService) { }

  ngOnInit(): void {
      this.employeeList$ = this.service.getMnpjEmployeeList();// mnpj-api.service.ts
      this.departmentsList$ = this.service.getMnpjDepartmentList();
      this.refreshDepartmentsMap();
  }

  modalTitle: string = "";
  activateAddEditEmployeeComponent: boolean = false;
  employee: any;
  
  modalAdd(){
    this.employee = {
      id : 0,
      firstName: null,
      lastName: null,
      position: null,
      title: null,
      image: null,
      delete: false,
      departmentId: null
    }
    this.modalTitle = "Add Employee";
    this.activateAddEditEmployeeComponent = true;
    console.log(this);
  }

  delete(item: any){
    if(confirm(`Are you sure you want to delete ${item.id}`))
    this.service.deleteMnpjEmployee(item.id).subscribe(res =>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if (showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }

      setTimeout(function () {
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = "none";
        }
      }, 3000);

      this.departmentsList$ = this.service.getMnpjEmployeeList();
      this.ngOnInit();
    })
  }

  modalEdit(item: any){
    this.employee = item;
    this.modalTitle = "Edit Employee";
    this.activateAddEditEmployeeComponent = true;
  }

  modalClose(){
    this.activateAddEditEmployeeComponent = false;
    this.employeeList$ = this.service.getMnpjEmployeeList();
  }

  refreshDepartmentsMap() { 
    this.service.getMnpjDepartmentList().subscribe (data => {
      this.departmentsList = data;
      for(let i = 0; i < data.length; i++){
        this.departmentsMap.set(this.departmentsList[i].id, this.departmentsList[i].nameDepartment);
      }
    })
  }
}