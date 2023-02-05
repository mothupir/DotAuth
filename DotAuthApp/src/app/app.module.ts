import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccessComponent } from './components/access/access.component';
import { AssignComponent } from './components/assign/assign.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    ProfileComponent,
    AccessComponent,
    AssignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
