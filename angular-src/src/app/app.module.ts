import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

/* ng2-bootstrap*/
import { AccordionModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import {AuthService} from './services/auth.service';
import {ValidateService} from './services/validate.service';
import {AuthGuard} from './guards/auth.guard';
import { CreateComponent } from './components/create/create.component';
import { CompanyComponent } from './components/company/company.component';
import { PostjobsComponent } from './components/postjobs/postjobs.component';

import 'hammerjs';
import { TruncatePipe } from './truncate.pipe';
import { DetailsComponent } from './components/details/details.component';



const appRoutes : Routes = [
  {path: '', component: HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path: 'details/:id', component: DetailsComponent},
  {path: 'profile', component : ProfileComponent,canActivate:[AuthGuard]},
  {path: 'create', component : CreateComponent,canActivate:[AuthGuard]},
  {path: 'postjobs', component : PostjobsComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    NavigationComponent,
    CreateComponent,
    CompanyComponent,
    PostjobsComponent,
    TruncatePipe,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FlashMessagesModule,
    AccordionModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [AuthService,ValidateService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
