import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MnpjApiService {

  readonly mnpjAPIUrl = "https://localhost:44394/api";

  constructor(private http: HttpClient) { }

  //Department
  getMnpjDepartmentList():Observable<any[]> {
    return this.http.get<any>(this.mnpjAPIUrl + "/Departments/get-all-departments");
  }

  getMnpjDepartmentListById(id: number|string):Observable<any[]> {
    return this.http.get<any>(this.mnpjAPIUrl + "/Departments/get-department-by-id" + id);
  }

  addMnpjDepartment(data: any){
    return this.http.post(this.mnpjAPIUrl + "/Departments/add-department", data);
  }

  putMnpjDepartment(id: number|string, data: any){
    return this.http.put(this.mnpjAPIUrl + `/Departments/update-department-by-id/${id}`, data);
  }

  deleteMnpjDepartment(id: number| string){
    return this.http.delete(this.mnpjAPIUrl + `/Departments/delete-department-by-id/${id}`);
  }

  //Employee
  getMnpjEmployeeList():Observable<any[]> {
    return this.http.get<any>(this.mnpjAPIUrl + "/Employees/get-all-employees");
  }

  getMnpjEmployeeListById(id: number|string):Observable<any[]> {
    return this.http.get<any>(this.mnpjAPIUrl + "/Employees/get-employee-by-id" + id);
  }

  addMnpjEmployee(data: any){
    return this.http.post(this.mnpjAPIUrl + "/Employees/add-employee-with-departments", data);
  }

  putMnpjEmployee(id: number|string, data: any){
    return this.http.put(this.mnpjAPIUrl + `/Employees/update-employee-by-id/${id}`, data);
  }

  deleteMnpjEmployee(id: number| string){
    return this.http.delete(this.mnpjAPIUrl + `/Employees/delete-employee-by-id/${id}`);
  }

}