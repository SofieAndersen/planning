import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return of([
      { id: '1', name: 'Jose Haley' },
      { id: '2', name: 'Adan Ellis' },
      { id: '3', name: 'Issac Brown' },
      { id: '4', name: 'Kaeden Khan' },
      { id: '5', name: 'Draven Brooks' },
      { id: '6', name: 'Ariel Bird' },
      { id: '7', name: 'Clinton Wolfe' },
      { id: '8', name: 'Victoria Sexton' },
      { id: '9', name: 'Tatiana King' },
      { id: '10', name: 'Lillie Sherman' },
      { id: '11', name: 'Steven Mccall' },
      { id: '12', name: 'Helena Forbes' },
    ]);
  }
}
