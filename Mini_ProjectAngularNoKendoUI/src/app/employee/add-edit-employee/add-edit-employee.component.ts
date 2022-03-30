import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
import { MnpjApiService } from 'src/app/mnpj-api.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeList$!: Observable<any[]>; 
  deleteList$!: Observable<any[]>; 
  departmentList$!: Observable<any[]>;
  
  constructor(private service: MnpjApiService) { };
  @Input() 
  employee: any; 
  id: number = 0; 
  firstName: string = ""; 
  lastName: string = ""; 
  deleted: boolean = false;
  position : string = "";
  title : string = "";
  avatarPath : string = "";
  departmentId!: number;
  ngOnInit(): void {
  this.id = this.employee.id; 
  this.firstName = this.employee.firstName; 
  this.lastName = this.employee.lastName;
  this.deleted = this.employee.deleted;
  this.position = this.employee.position; 
  this.title = this.employee.title; 
  this.avatarPath = this.employee.avatarPath;
  this.departmentId = this.employee.departmentId;
  this.employeeList$ = this.service.getMnpjEmployeeList(); 
  this.departmentList$ = this.service.getMnpjDepartmentList();
  }

  addEmployee(){
    var employee = {
      id : this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      deleted: this.deleted,
      position: this.position,
      title: this.title,
      avatarPath:this.avatarPath,
      departmentId: this.departmentId
    }

    var employee1 = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      deleted: employee.deleted,
      position: employee.position,
      title: employee.title,
      avatarPath:employee.avatarPath,
      departmentId: employee.departmentId
    }

    console.log(employee, employee1);

    this.service.addMnpjEmployee(employee1).subscribe(res=>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = "block";
      }

      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = "none";
        }
      }, 3000);

    })
  }

  updateEmployee(){
    var employee = {
      id : this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      deleted: this.deleted,
      position: this.position,
      title: this.title,
      avatarPath:this.avatarPath,
      departmentId: this.departmentId
    }
    var id: number = this.id;

    var employee1 = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      deleted: employee.deleted,
      position: employee.position,
      title: employee.title,
      avatarPath:employee.avatarPath,
      departmentId: employee.departmentId
    }

    this.service.putMnpjEmployee(id ,employee1).subscribe(res=>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }

      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = "none";
        }
      }, 3000);

    })
  }
}