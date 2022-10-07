import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShiftTemplate } from '../models/shift-template.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftTemplateService {
  constructor() {}

  getTemplates(): Observable<ShiftTemplate[]> {
    return of([
      { id: '1', name: 'Morning', startTime: '07:00', endTime: '12:00' },
      { id: '3', name: 'Afternoon', startTime: '13:00', endTime: '19:00' },
      { id: '2', name: 'All day', startTime: '07:00', endTime: '19:00' },
    ]);
  }
}
