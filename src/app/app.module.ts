import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './auth/auth.service';
import { GigService } from './gig.service';
import { UIService } from './ui.service';

import { PunterAlreadyOnGig } from './punterAlreadyOnGig.pipe';

import { GigAddComponent } from './gig-add/gig-add.component';
import { GigCardComponent } from './gig-card/gig-card.component';
import { GigDetailsComponent } from './gig-details/gig-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GigMineComponent } from './gig-mine/gig-mine.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GigAddComponent,
    GigCardComponent,
    GigDetailsComponent,
    LoginComponent,
    SignupComponent,
    PunterAlreadyOnGig,
    GigMineComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule],
  providers: [GigService, AuthService, UIService, { provide: MaterialModule, useValue: [] }],
  bootstrap: [AppComponent]
})
export class AppModule { }