import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 
import { MnpjApiService } from 'src/app/mnpj-api.service';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.component.html',
  styleUrls: ['./add-edit-department.component.css']
})
export class AddEditDepartmentComponent implements OnInit {

  departmentList$!: Observable<any[]>;
  
  constructor(private service: MnpjApiService) { };
 @Input() 
  department: any; 
  id: number = 0; 
  nameDepartment: string = ""; 
  deleted: boolean = false;

  ngOnInit(): void {
  this.id = this.department.id; 
  this.nameDepartment = this.department.nameDepartment; 
  this.deleted = this.department.deleted;
  this.departmentList$ = this.service.getMnpjDepartmentList();
  }

  addDepartment(){
    var department = {
      id : this.id,
      nameDepartment: this.nameDepartment,
      deleted: this.deleted
    }

    var department1 = {
      nameDepartment: department.nameDepartment,
      deleted: department.deleted
    }

    console.log(department, department1);

    this.service.addMnpjDepartment(department1).subscribe(res=>{
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

  updateDepartment(){
    var department = {
      id : this.id,
      nameDepartment: this.nameDepartment,
      deleted: this.deleted,
    }
    var id: number = this.id;

    var department1 = {
      nameDepartment: department.nameDepartment,
      deleted: department.deleted,
    }

    this.service.putMnpjDepartment(id ,department1).subscribe(res=>{
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