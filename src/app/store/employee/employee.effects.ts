import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import * as EmployeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {
  loadEmployees$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.getEmployees),
      switchMap(() =>
        this.employeeService
          .getEmployees()
          .pipe(
            map((employees) => EmployeeActions.loadEmployees({ employees }))
          )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}
