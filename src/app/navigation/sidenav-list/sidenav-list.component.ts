import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();

  isAuth = false;
  authSubscription: Subscription;
  constructor(private authServices: AuthService) { }



  ngOnInit(): void {

    this.authSubscription = this.authServices.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    } );
  }

  OnClose(): void  {

    this.closeSidenav.emit();

  }
  OnLogout(): void  {
    this.OnClose();
    this.authServices.logout();
  }

  ngOndestroy(): void  {
    this.authSubscription.unsubscribe();
  }
}

