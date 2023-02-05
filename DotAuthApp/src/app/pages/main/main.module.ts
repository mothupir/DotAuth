import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { AccessComponent } from 'src/app/components/access/access.component';
import { AssignComponent } from 'src/app/components/assign/assign.component';


@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    AccessComponent,
    AssignComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
