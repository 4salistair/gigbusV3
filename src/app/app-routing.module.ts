import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GigCardComponent } from './gig-card/gig-card.component';
import { GigAddComponent } from './gig-add/gig-add.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';
import { GigMineComponent} from './gig-mine/gig-mine.component';

const routes: Routes = [
  { path: '', component: GigCardComponent },
  { path: 'addgigs', component: GigAddComponent},
  { path: 'login', component: LoginComponent},
  { path: 'mygigs', component: GigMineComponent},
  { path: 'signup', component: SignupComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
