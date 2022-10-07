import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningComponent } from './planning.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PlanningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanningRoutingModule {}
