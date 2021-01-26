import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { employees } from './data.service';


export interface UserData {
  name: string;
  email: string;
  age: string;
  department: [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'wiproAssignment';
  displayedColumns: string[] = ['name', 'email', 'age', 'department'];
  dataSource: MatTableDataSource<UserData>;
  employeeData:any=employees
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filterForm: FormGroup;
  employeesData:any=employees
  departmentList: any=[];

  constructor(private formBuilder:FormBuilder) {
    this.dataSource = new MatTableDataSource(this.employeeData);
    console.log(this.dataSource.filteredData.length)
  }

  ngOnInit(){
    this.filterForm=this.formBuilder.group({
      department:[''],
      search:['']
    })
    console.log(this.employeesData)
    this.employeesData.forEach(element => {
      element.departments.forEach(elements => {
        let index=this.departmentList.findIndex(x=>x===elements) 
        if(index===-1){
          this.departmentList.push(elements)       
        }
      });
    });
    console.log(this.departmentList)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  

  reset(){
    this.filterForm.reset()
    this.dataSource=this.employeesData
  }
}
