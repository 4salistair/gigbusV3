import { Component,  OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { GigService } from '../gig.service';
import { AuthService } from '../auth/auth.service';
import { Gigs } from '../gig.model';
import { MatDialog } from '@angular/material/dialog';
import { GigDetailsComponent } from '../gig-details/gig-details.component';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';

@Component({
  selector: 'app-gig-card',
  templateUrl: './gig-card.component.html',
  styleUrls: ['./gig-card.component.css']
})
export class GigCardComponent implements OnInit {
  gigSubscription: Subscription;
  gigs: Gigs[];

  authSubscription: Subscription;
  private isAuth = false;

  gigFilterSubscription: Subscription;
  gigsFiltered: Gigs[];


  constructor( private gigService: GigService,
               private dialog: MatDialog,
               private authService: AuthService
  ) { }

  ngOnInit(): void {




    this.gigSubscription = this.gigService.gigsChanged.subscribe(
      gigs => (this.gigs = gigs)
      );
    this.gigService.fetchGigs();


    this.authSubscription = this.authService.authChange.subscribe(
        authStatus => { (
                  this.isAuth = authStatus);
      });
    this.authService.innitAuthListener();


    this.gigFilterSubscription = this.gigService.filteredGigsChanged.subscribe(
        gigsFiltered =>  (this.gigsFiltered = gigsFiltered)
      );
    this.gigService.fetchGigsForCurrentUser();

  }

  signUp(gig: Gigs): void {

    this.dialog.open(GigDetailsComponent, {
      data: {
        gigArtistName: gig.gigArtistName,
        gigVenueName: gig.gigVenueName,
        gigDate: gig.gigDate
      }
    } );

  }


  addPunterGig(gigID: string): void {

    this.gigService.totalPunterIncrement(gigID);
    this.gigService.puntersGigs(gigID);
    this.gigService.runningCostDecrement(gigID);

}

}
