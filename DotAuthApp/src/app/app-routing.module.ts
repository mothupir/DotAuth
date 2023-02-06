import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { 
    path: 'access',
    loadChildren: () => import('./pages/main/main.module').then(module => module.MainModule),
    title: 'Dot Auth | Access'
  },
  { 
    path: '',
    component: HomeComponent,
    title: 'Dot Auth | Home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
