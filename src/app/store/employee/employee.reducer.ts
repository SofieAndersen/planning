import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as EmployeeActions from './employee.actions';
import { Employee } from 'src/app/models';

export const employeesFeatureKey = 'employees';

export interface State extends EntityState<Employee> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(EmployeeActions.addEmployee, (state, action) =>
    adapter.addOne(action.employee, state)
  ),
  on(EmployeeActions.upsertEmployee, (state, action) =>
    adapter.upsertOne(action.employee, state)
  ),
  on(EmployeeActions.addEmployees, (state, action) =>
    adapter.addMany(action.employees, state)
  ),
  on(EmployeeActions.upsertEmployees, (state, action) =>
    adapter.upsertMany(action.employees, state)
  ),
  on(EmployeeActions.updateEmployee, (state, action) =>
    adapter.updateOne(action.employee, state)
  ),
  on(EmployeeActions.updateEmployees, (state, action) =>
    adapter.updateMany(action.employees, state)
  ),
  on(EmployeeActions.deleteEmployee, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(EmployeeActions.deleteEmployees, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(EmployeeActions.loadEmployees, (state, action) =>
    adapter.setAll(action.employees, state)
  ),
  on(EmployeeActions.clearEmployees, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
