import { Injectable } from '@angular/core';
import { Employee } from './model/employee.model';

@Injectable()
export class EmployeeService {
  public candidateData: Employee[];
  constructor() {
    this.candidateData = [{ "id": 11,  "name": "Ash",  "department": "Finance", "joining_date": "8/10/2016" },
    { "id": 12, "name": "John", "department": "HR", "joining_date": "18/01/2011" },
    { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": "28/11/2019" },
    { "id": 14, "name": "Vish", "department": "Development", "joining_date": "7/07/2017" },
    { "id": 15, "name": "Barry", "department": "Operations", "joining_date": "19/08/2014" },
    { "id": 16, "name": "Ady", "department": "Finance", "joining_date": "5/10/2014" },
    { "id": 17, "name": "Gare", "department": "Development", "joining_date": "6/04/2014" },
    { "id": 18, "name": "Hola", "department": "Development", "joining_date": "8/12/2010" },
    { "id": 19, "name": "Ola", "department": "HR", "joining_date": "7/05/2011"},
    { "id": 20, "name": "Kim", "department": "Finance", "joining_date": "20/10/2010" }]
  }

  /** Get Candidate Data */
  public getCandidateData() : any[]{
    return this.candidateData;
  }

  // We can get candidate data from API also and return observable data 
}
