import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { GigService } from '../gig.service';
import { AuthService } from '../auth/auth.service'
import { Gigs } from '../gig.model';

@Component({
  selector: 'app-gig-track',
  templateUrl: './gig-track.component.html',
  styleUrls: ['./gig-track.component.css']
})


export class GigTrackComponent implements OnInit, OnDestroy {
  gigSubscription: Subscription;
  gigs: Gigs[];

  authTypeSubscription: Subscription;
  UserID: String; 

  authSubscription: Subscription;

  constructor(
              private gigService: GigService,
              private authService: AuthService
  ) { 
    
  }

  ngOnInit(): void {

      this.gigSubscription = this.gigService.gigsChanged.subscribe(
      gigs => (this.gigs = gigs));
      this.gigService.fetchGigs();


     this.authSubscription = this.authService.currentUser.subscribe (
      userID => {(this.UserID = userID)})
      this.authService.getUserID();

  }

  ngOnDestroy(): void {

    this.gigSubscription.unsubscribe;
 //   this.authTypeSubscription.unsubscribe;
  
  }

}
