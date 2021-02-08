import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavToggle =  new EventEmitter<void>();
  @Output() searchToggle =  new EventEmitter<boolean>();

  isAuth = false;
  authSubscription: Subscription;
  authTypeSubscription: Subscription
  isSearch = false;
  userID: string;
  authType: string;

  constructor(private authServices: AuthService) { }

  ngOnInit(): void {

    this.authSubscription = this.authServices.authChange.subscribe(authStatus => {
    this.isAuth = authStatus;
    this.authServices.addUserType();


    this.authTypeSubscription= this.authServices.authType.subscribe(authType =>{
      this.authType = authType} )
      
    });
  }

  onToggleSidenav(): void {
   this.sideNavToggle.emit();
  }

  onToggleSearch(): void {
    this.isSearch = !this.isSearch;
  }

  onToggleWhenLoginOrSignup(): void {
    this.isSearch = false;
  }

  onLogout(): void  {
    this.authServices.logout();
  }

  ngOnDestroy(): void  {
    this.authSubscription.unsubscribe();
  }

}
