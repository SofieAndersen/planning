import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  take,
} from 'rxjs';
import {
  Shift,
  Employee,
  ShiftTemplate,
  CreateShiftEvent,
} from 'src/app/models';
import { ShiftTemplateService } from 'src/app/services/shift-template.service';
import { selectAllEmployees, selectAllShifts, State } from 'src/app/store';
import { getEmployees } from 'src/app/store/employee/employee.actions';
import {
  createShift,
  editShift,
  getShifts,
} from 'src/app/store/shift/shift.actions';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { CreateShiftDialogComponent } from './components/create-shift-dialog/create-shift-dialog.component';

interface EmployeeWithSchedule extends Employee {
  schedule: Shift[][];
}

export interface PlanningWeekView {
  dates: Date[];
  employees: EmployeeWithSchedule[];
}

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  shifts$: Observable<Shift[]>;
  employees$: Observable<Employee[]>;
  templates$: Observable<ShiftTemplate[]>;

  view$: Observable<PlanningWeekView>;

  private date$ = new BehaviorSubject<Date>(new Date());
  readonly weekSize = 7;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog,
    shiftTemplateService: ShiftTemplateService
  ) {
    this.shifts$ = store.select(selectAllShifts);
    this.employees$ = store.select(selectAllEmployees);
    // TODO: should also use store
    this.templates$ = shiftTemplateService.getTemplates();
    this.view$ = combineLatest([
      this.shifts$,
      this.employees$,
      this.date$.pipe(map((date) => this.getWeekDates(date))),
    ]).pipe(
      map(([shifts, employees, dates]) => ({
        dates,
        employees: employees.map((employee) =>
          this.getEmployeeSchedule(employee, shifts, dates)
        ),
      }))
    );
  }

  ngOnInit(): void {
    this.store.dispatch(getShifts());
    this.store.dispatch(getEmployees());
  }

  onCreate(): void {
    combineLatest([this.employees$, this.templates$])
      .pipe(take(1))
      .subscribe(([employees, templates]) => {
        this.dialog
          .open(CreateShiftDialogComponent, {
            width: '500px',
            data: { employees, templates },
          })
          .afterClosed()
          .pipe(
            take(1),
            filter((payload) => !!payload)
          )
          .subscribe((shift: CreateShiftEvent) => {
            this.store.dispatch(createShift({ shift }));
          });
      });
  }

  onPrevious(): void {
    const date = this.date$.value;
    this.date$.next(new Date(date.setDate(date.getDate() - this.weekSize)));
  }

  onNext(): void {
    const date = this.date$.value;
    this.date$.next(new Date(date.setDate(date.getDate() + this.weekSize)));
  }

  drop(
    event: CdkDragDrop<Shift[]>,
    employeeId: string,
    scheduleIndex: number
  ): void {
    this.view$.pipe(take(1)).subscribe((view) => {
      if (event.previousContainer.id !== event.container.id) {
        const shift = event.previousContainer.data[event.previousIndex];
        const date = view.dates[scheduleIndex];
        this.store.dispatch(editShift({ shift, date, employeeId }));
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    });
  }

  trackById(_: number, obj: Employee | Shift): string {
    return obj.id;
  }

  private getWeekDates(date: Date): Date[] {
    return [...Array(this.weekSize)].map((_, index) =>
      this.getDateFromStartOfWeek(date, index)
    );
  }

  private getDateFromStartOfWeek(date: Date, day: number): Date {
    const curr = new Date(date);
    // + 1 for monday start of the week
    const firstDayOfWeek = curr.getDate() - curr.getDay() + 1;
    return new Date(curr.setDate(firstDayOfWeek + day));
  }

  private getEmployeeSchedule(
    employee: Employee,
    shifts: Shift[],
    dates: Date[]
  ): EmployeeWithSchedule {
    const employeeShifts: Shift[] = shifts.filter(
      (shift) => shift.employeeId === employee.id
    );
    return {
      ...employee,
      schedule: employeeShifts.reduce(
        (acc: Shift[][], curr: Shift) => {
          const dateIndex = dates.findIndex(
            (date) =>
              new Date(curr.startDate).toDateString() === date.toDateString()
          );
          // only add dates that are in current display range
          if (dateIndex !== -1) {
            if (!acc[dateIndex]) {
              acc[dateIndex] = [];
            }
            acc[dateIndex].push(curr);
          }
          return acc;
        },
        [...Array(this.weekSize)].map(() => [])
      ),
    };
  }
}
