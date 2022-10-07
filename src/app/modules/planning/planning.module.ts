import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningComponent } from './planning.component';
import { CreateShiftDialogComponent } from './components/create-shift-dialog/create-shift-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PlanningComponent, CreateShiftDialogComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class PlanningModule {}
