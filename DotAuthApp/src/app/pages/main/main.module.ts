import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AccessComponent } from 'src/app/components/access/access.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    MainComponent,
    AccessComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ButtonModule,
    DialogModule,
    CardModule,
    TooltipModule,
    InputTextModule,
    AccordionModule,
    FormsModule,
    CheckboxModule,
    MenubarModule,
    ConfirmDialogModule,
    ToastModule
  ]
})
export class MainModule { }
