import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromShift from './shift/shift.reducer';
import * as fromEmployee from './employee/employee.reducer';

export interface State {
  [fromShift.shiftsFeatureKey]: fromShift.State;
  [fromEmployee.employeesFeatureKey]: fromEmployee.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromShift.shiftsFeatureKey]: fromShift.reducer,
  [fromEmployee.employeesFeatureKey]: fromEmployee.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const selectShiftState = createFeatureSelector<fromShift.State>(
  fromShift.shiftsFeatureKey
);

export const selectAllShifts = createSelector(
  selectShiftState,
  fromShift.selectAll
);

export const selectEmployeeState = createFeatureSelector<fromEmployee.State>(
  fromEmployee.employeesFeatureKey
);

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  fromEmployee.selectAll
);
