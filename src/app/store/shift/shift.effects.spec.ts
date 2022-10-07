import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ShiftEffects } from './shift.effects';

describe('ShiftEffects', () => {
  let actions$: Observable<any>;
  let effects: ShiftEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShiftEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ShiftEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
