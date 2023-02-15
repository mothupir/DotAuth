import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from 'src/app/components/access/access.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', 
    component: MainComponent, children: [
      {
        path: '',
        component: AccessComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
