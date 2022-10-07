import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PlanningRoutingModule } from './planning-routing.module';
import { PlanningComponent } from './planning.component';
import { CreateShiftDialogComponent } from './components/create-shift-dialog/create-shift-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [PlanningComponent, CreateShiftDialogComponent],
  imports: [
    CommonModule,
    PlanningRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    DragDropModule,
  ],
})
export class PlanningModule {}
