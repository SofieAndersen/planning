import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, Subject, takeUntil } from 'rxjs';
import {
  CreateShiftEvent,
  Employee,
  Shift,
  ShiftTemplate,
} from 'src/app/models';

export interface CreateShiftDialogData {
  employees: Employee[];
  templates: ShiftTemplate[];
}

@Component({
  selector: 'app-create-shift-dialog',
  templateUrl: './create-shift-dialog.component.html',
  styleUrls: ['./create-shift-dialog.component.scss'],
})
export class CreateShiftDialogComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<
      CreateShiftDialogComponent,
      CreateShiftEvent
    >,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CreateShiftDialogData
  ) {
    this.createForm = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      template: [null, Validators.required],
      name: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      employee: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.patchFormBasedOnTemplate();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAdd(): void {
    const {
      name,
      employee: employeeId,
      template: templateId,
      startTime,
      endTime,
      date,
    } = this.createForm.value;
    this.dialogRef.close({
      name,
      employeeId,
      templateId,
      startTime,
      endTime,
      date,
    });
  }

  trackById(_: number, obj: Shift | Employee): string {
    return obj.id;
  }

  private patchFormBasedOnTemplate(): void {
    this.createForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((values) => !!values.template)
      )
      .subscribe((values) => {
        const template = this.data.templates.find(
          (template) => template.id === values.template
        );
        this.createForm.patchValue(
          {
            name: values.name || template?.name,
            startTime: values.startTime || template?.startTime,
            endTime: values.endTime || template?.endTime,
          },
          { emitEvent: false }
        );
      });
  }
}
