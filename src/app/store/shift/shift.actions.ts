import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Shift, CreateShiftEvent } from 'src/app/models/shift.model';

export const getShifts = createAction('[Shift/API] Get Shifts');

export const createShift = createAction(
  '[Shift/API] Create Shift',
  props<{ shift: CreateShiftEvent }>()
);

export const editShift = createAction(
  '[Shift/API] Edit Shift',
  props<{ shift: Shift; employeeId: string; date: Date }>()
);

export const loadShifts = createAction(
  '[Shift/API] Load Shifts',
  props<{ shifts: Shift[] }>()
);

export const addShift = createAction(
  '[Shift/API] Add Shift',
  props<{ shift: Shift }>()
);

export const upsertShift = createAction(
  '[Shift/API] Upsert Shift',
  props<{ shift: Shift }>()
);

export const addShifts = createAction(
  '[Shift/API] Add Shifts',
  props<{ shifts: Shift[] }>()
);

export const upsertShifts = createAction(
  '[Shift/API] Upsert Shifts',
  props<{ shifts: Shift[] }>()
);

export const updateShift = createAction(
  '[Shift/API] Update Shift',
  props<{ shift: Update<Shift> }>()
);

export const updateShifts = createAction(
  '[Shift/API] Update Shifts',
  props<{ shifts: Update<Shift>[] }>()
);

export const deleteShift = createAction(
  '[Shift/API] Delete Shift',
  props<{ id: string }>()
);

export const deleteShifts = createAction(
  '[Shift/API] Delete Shifts',
  props<{ ids: string[] }>()
);

export const clearShifts = createAction('[Shift/API] Clear Shifts');
