import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Shift, CreateShiftEvent } from '../models/shift.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private readonly storageKey = 'shifts';

  constructor() {}

  getShifts(): Observable<Shift[]> {
    return of(this.getFromStorage());
  }

  createShift(event: CreateShiftEvent): Observable<Shift> {
    const shifts = this.getFromStorage();
    const shift: any = {
      id: `${Date.now()}`,
      name: event.name,
      employeeId: event.employeeId,
      templateId: event.templateId,
      startDate: new Date(`${event.date} ${event.startTime}`),
      endDate: new Date(`${event.date} ${event.endTime}`),
    };
    shifts.push(shift);
    localStorage.setItem(this.storageKey, JSON.stringify(shifts));
    return of(shift);
  }

  private getFromStorage(): Shift[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
}
