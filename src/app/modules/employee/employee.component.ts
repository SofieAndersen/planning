import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models';
import { selectAllEmployees, State } from 'src/app/store';
import { getEmployees } from 'src/app/store/employee/employee.actions';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private store: Store<State>) {
    this.employees$ = store.select(selectAllEmployees);
  }

  ngOnInit(): void {
    this.store.dispatch(getEmployees());
  }

  trackByEmployee(_: number, employee: Employee): string {
    return employee.id;
  }
}
