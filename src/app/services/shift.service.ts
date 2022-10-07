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
    const shift: Shift = {
      id: `${Date.now()}`,
      name: event.name,
      employeeId: event.employeeId,
      templateId: event.templateId,
      startDate: new Date(`${event.date} ${event.startTime}`),
      endDate: new Date(`${event.date} ${event.endTime}`),
    };
    shifts.push(shift);
    this.updateStorage(shifts);
    return of(shift);
  }

  editShift(shift: Shift, employeeId: string, date: Date): Observable<Shift> {
    const shifts = this.getFromStorage();
    const updatedShift: Shift = {
      ...shift,
      employeeId,
      startDate: this.updateDate(date, new Date(shift.startDate)),
      endDate: this.updateDate(date, new Date(shift.endDate)),
    };
    this.updateStorage(
      shifts.map((shift) =>
        shift.id === updatedShift.id ? updatedShift : shift
      )
    );
    return of(updatedShift);
  }

  private updateDate(newDate: Date, oldDate: Date): Date {
    return new Date(
      `${newDate.toISOString().substring(0, 10)} ${oldDate
        .toISOString()
        .substring(11)}`
    );
  }

  private getFromStorage(): Shift[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private updateStorage(shifts: Shift[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(shifts));
  }
}
