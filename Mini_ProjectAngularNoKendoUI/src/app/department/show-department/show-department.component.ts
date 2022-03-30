import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {MnpjApiService} from 'src/app/mnpj-api.service'

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.css']
})

export class ShowDepartmentComponent implements OnInit {

  departmentsList$!:Observable<any[]>;

  constructor (private service: MnpjApiService) { }

  ngOnInit(): void {
      this.departmentsList$ = this.service.getMnpjDepartmentList();
  }

  modalTitle: string = "";
  activateAddEditDepartmentComponent: boolean = false;
  department: any;
  
  modalAdd(){
    this.department = {
      id : 0,
      nameDepartment: null,
      delete: false
    }
    this.modalTitle = "Add Department";
    this.activateAddEditDepartmentComponent = true;
    console.log(this);
  }

  delete(item: any){
    if(confirm(`Are you sure you want to delete ${item.id}`))
    this.service.deleteMnpjDepartment(item.id).subscribe(res =>{
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

      this.departmentsList$ = this.service.getMnpjDepartmentList();
      this.ngOnInit();
    })
  }

  modalEdit(item: any){
    this.department = item;
    this.modalTitle = "Edit Department";
    this.activateAddEditDepartmentComponent = true;
  }

  modalClose(){
    this.activateAddEditDepartmentComponent = false;
    this.departmentsList$ = this.service.getMnpjDepartmentList();
  }
}