import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ShiftActions from './shift.actions';
import { Shift } from 'src/app/models/shift.model';

export const shiftsFeatureKey = 'shifts';

export interface State extends EntityState<Shift> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Shift> = createEntityAdapter<Shift>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(ShiftActions.addShift, (state, action) =>
    adapter.addOne(action.shift, state)
  ),
  on(ShiftActions.upsertShift, (state, action) =>
    adapter.upsertOne(action.shift, state)
  ),
  on(ShiftActions.addShifts, (state, action) =>
    adapter.addMany(action.shifts, state)
  ),
  on(ShiftActions.upsertShifts, (state, action) =>
    adapter.upsertMany(action.shifts, state)
  ),
  on(ShiftActions.updateShift, (state, action) =>
    adapter.updateOne(action.shift, state)
  ),
  on(ShiftActions.updateShifts, (state, action) =>
    adapter.updateMany(action.shifts, state)
  ),
  on(ShiftActions.deleteShift, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ShiftActions.deleteShifts, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(ShiftActions.loadShifts, (state, action) =>
    adapter.setAll(action.shifts, state)
  ),
  on(ShiftActions.clearShifts, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
