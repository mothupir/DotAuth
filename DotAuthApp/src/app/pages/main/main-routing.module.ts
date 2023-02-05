import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignComponent } from 'src/app/components/assign/assign.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', 
    component: MainComponent, children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'access',
        component: AssignComponent
      },
      {
        path: 'assign',
        component: AssignComponent
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
