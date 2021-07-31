import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";
import { fromEvent, Subject } from 'rxjs';

import { EmployeeService } from '../employee.service';
import { Employee, Department } from '../model/employee.model';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild("search", { static: true }) search: ElementRef;
  public showEmployeeList: boolean;
  public candidateData: Employee[];
  public departmentData: Department[];
  public direction: number;
  public isDesc: boolean;
  public column: string;
  /** Obserbable for stop subscribing subscriptions */
  private destroy: Subject<boolean>;


  constructor(private employeeService: EmployeeService) {
    this.candidateData = [];
    this.destroy = new Subject<boolean>();
    this.showEmployeeList = true;
    this.isDesc = false;
    this.column = "";
  }

  ngOnInit(): void {
    this.getDepartment();

    /**Below code use for the filter on search text  */
    fromEvent(this.search.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).pipe(takeUntil(this.destroy)).subscribe((search: any) => {
      this.searchByName(search.target.value);
    })
  }

  /** This method used for get department~ */
  public getDepartment(): void {
    this.candidateData = this.employeeService.candidateData;
  }

  /** This method use for get more than 2 year experience candidate */
  public getExperienceCadidate(): void {
    this.candidateData = [];
    this.employeeService.candidateData.forEach(element => {
      let dateParts = element.joining_date.split("/");
      let dateObject = new Date(+dateParts[2], Number(dateParts[1]) - 1, +dateParts[0]);

      let month = (new Date().getFullYear() - Number(new Date(dateObject).getFullYear())) * 12;
      month -= dateObject.getMonth();
      month += new Date().getMonth();
      if (month > 24) {
        // 24 means 2 year , so if candidate have 25 month experience it means more than 2 year so will dispaly that record
        this.candidateData.push(element);
      }
    });
  }

  /** This method used for search employee by name */
  public searchByName(search: string): void {
    this.candidateData = this.employeeService.candidateData.filter(h => h.name.trim().toLowerCase().includes(search.trim().toLowerCase()))
  }

 /** This method used for count employee of the department*/ 
  public distinctDepartmentWithEmployeeCount(): void {
    this.showEmployeeList = !this.showEmployeeList;
    var list = [...new Set(this.employeeService.candidateData.map(item => item.department))];
    this.departmentData = [];
    list.forEach((element: string) => {
      let employeeCount = this.employeeService.candidateData.filter(h => h.department == element).length
      this.departmentData.push({ department: element, employee_count: employeeCount });
    });
  }

  /** This method use for remove development department candidate */
  public removeDevelopmenetDepCanidate(): void {
    this.candidateData = this.employeeService.candidateData.filter(h => h.department != "Development");
  }

  /** This method use for sorting */
  public sorting(property: any) {
    this.isDesc = !this.isDesc;   
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.candidateData.sort(function (a, b) {
      if (property == "joining_date") {
        let aSplit = a.joining_date.split("/");
        let aDate = new Date(+aSplit[2], Number(aSplit[1]) - 1, +aSplit[0]);

        let bSplit = b.joining_date.split("/");
        let bDate = new Date(+bSplit[2], Number(bSplit[1]) - 1, +bSplit[0]);

        if (new Date(aDate).getTime() < new Date(bDate).getTime()) {
          return -1 * direction;
        }
        else if (new Date(aDate).getTime() > new Date(bDate).getTime()) {
          return 1 * direction;
        }
        else {
          return 0;
        }
      } else {
        if (a[property] < b[property]) {
          return -1 * direction;
        }
        else if (a[property] > b[property]) {
          return 1 * direction;
        }
        else {
          return 0;
        }
      }
    });
  }

  /** This method use for refresh candidate list */
  public refreshData(): void {
    this.search.nativeElement.value = "";
    this.showEmployeeList = true;
    this.candidateData = this.employeeService.candidateData;
  }

  /** This Method is used for destory memory while page is destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

}
