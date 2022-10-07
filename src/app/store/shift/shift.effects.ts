import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { ShiftService } from 'src/app/services/shift.service';
import * as ShiftActions from './shift.actions';

@Injectable()
export class ShiftEffects {
  loadShifts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.getShifts),
      switchMap(() =>
        this.shiftService
          .getShifts()
          .pipe(map((shifts) => ShiftActions.loadShifts({ shifts })))
      )
    )
  );

  createShift$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ShiftActions.createShift),
      switchMap((payload) =>
        this.shiftService
          .createShift(payload.shift)
          .pipe(map((shift) => ShiftActions.addShift({ shift })))
      )
    )
  );

  constructor(private actions$: Actions, private shiftService: ShiftService) {}
}
