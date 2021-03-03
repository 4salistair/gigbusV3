import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { GigService } from '../gig.service';
import { AuthService } from '../auth/auth.service';
import { Gigs } from '../gig.model';
import { MatDialog } from '@angular/material/dialog';
import { GigDetailsComponent } from '../gig-details/gig-details.component'
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UIService } from '../ui.service';



@Component({
  selector: 'app-gig-card',
  templateUrl: './gig-card.component.html',
  styleUrls: ['./gig-card.component.css']
})
export class GigCardComponent implements OnInit, OnDestroy {
  gigSubscription: Subscription;
  gigs: Gigs[];

  authSubscription: Subscription;
  private isAuth = false;

  gigFilterSubscription: Subscription;
  gigsFiltered: Gigs[];

  searchSubscription: Subscription;
  searchFiltered: Gigs;
  gigName: string[];

  searchTermSubscription: Subscription;
  searchTerm: string;

  searchArtistNameSubscription: Subscription;
  ArtistName: string;

  gigIDFromURL: string;
  singleGigFromURL: Gigs;

  spinnerSubscription: Subscription;
  Isloading: boolean;


  private fbSubs: Subscription[] = [];

  constructor( private gigService: GigService,
               private dialog: MatDialog,
               private authService: AuthService,
               private activatedRoute: ActivatedRoute,
               private uiServive: UIService
  ) { 

    this.activatedRoute.queryParams.subscribe(params => {
    let gigID = params['id'];

  
    
    
    if(gigID) {
   
       this.gigIDFromURL = gigID;
    
    }
  });
  }

  ngOnInit(): void {


    this.fbSubs.push(this.gigSubscription = this.gigService.gigsChanged.subscribe(
      gigs => (this.gigs = gigs)

    
      ));
    this.gigService.fetchGigs();

  

    this.fbSubs.push(this.authSubscription = this.authService.authChange.subscribe(
        authStatus => { (
                  this.isAuth = authStatus);
      }));
    this.authService.innitAuthListener();


    this.fbSubs.push(this.gigFilterSubscription = this.gigService.filteredGigsChanged.subscribe(
        gigsFiltered =>  (this.gigsFiltered = gigsFiltered)
      ));
    this.gigService.fetchGigsForCurrentUser();


    this.fbSubs.push(this.searchSubscription = this.gigService.searchGigsChanged.subscribe(
      searchFiltered => (this.searchFiltered = searchFiltered
      )
    ));


    this.fbSubs.push(this.searchArtistNameSubscription = this.gigService.searchArtistNameChanged.subscribe(
        ArtistName => (this.ArtistName = ArtistName
      )
    ));


    this.fbSubs.push(this.spinnerSubscription = this.uiServive.loadingStateChange.subscribe(
      Isloading => ( this.Isloading = Isloading)

      ) 
     )

  }


  signUp(gig: Gigs): void {

    const dailogRef = this.dialog.open(GigDetailsComponent, {
      data: {
              gigArtistName: gig.gigArtistName, 
              gigVenueCity: gig.gigVenue.venueCity,
              gigVenueName: gig.gigVenue.venueName,
              gigDate: gig.gigDate  
     
        }
    } );

 //  this.dialog.open(GigDetailsComponent);
      
      //{
      // data: {
      //   gigArtistName: gig.gigArtistName, 
      //   gigDate: gig.gigDate  
      // }
   // }
   //  );



  }


  addPunterGig(gigID: string): void {

    this.gigService.puntersGigs(gigID);
    this.gigService.totalPunterIncrementandRunningCostDecrement(gigID);
    this.uiServive.showSnackbar('Your on this, track this Gigs progress using the MyGigs Menu Option',null,3000);
   
  //  this.gigService.runningCostDecrement(gigID);

}

ngOnDestroy(): void {

  this.fbSubs.forEach(sub => { sub.unsubscribe(); });

}

}
