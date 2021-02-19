import { Component,  OnDestroy,  OnInit, Inject } from '@angular/core';
import { Subscription} from 'rxjs';
import { GigService } from '../gig.service';
import { AuthService } from '../auth/auth.service';
import { Gigs } from '../gig.model';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { GigPriceConfirmationComponent } from './gig-price-confirmation/gig-price-confirmation.component'

@Component({
  selector: 'app-gig-price',
  templateUrl: './gig-price.component.html',
  styleUrls: ['./gig-price.component.css']
})
export class GigPriceComponent implements OnInit,  OnDestroy  {

  gigSubscription: Subscription;
  gigs: Gigs[];

  authSubscription: Subscription;
  private isAuth = false;

  gigFilterSubscription: Subscription;
  gigsFiltered: Gigs[];

  gigCostPerPunter: number;
  gigCurrentCostPerPunter: number;

  driverSubmittedTotalPrice: number;
  driverSubmittedGigSeats: number;
  driverUserID: string;

  isBestPrice: boolean;

  outcome: boolean;

  private fbSubs: Subscription[] = [];

  constructor( private gigService: GigService,
               private dialog: MatDialog,
               private authService: AuthService
            ) 
              { }


  ngOnInit(): void {

    this.fbSubs.push(this.gigSubscription = this.gigService.gigsChanged.subscribe(
      gigs => (this.gigs = gigs)
      ));
    this.gigService.fetchGigs();
  
    this.fbSubs.push(this.authSubscription = this.authService.currentUser.subscribe (

      userID => {(this.driverUserID = userID)}
      
    ))
    this.authService.getUserID();
  
  
  }

  ngOnDestroy(): void {

    this.fbSubs.forEach(sub => { sub.unsubscribe(); });
  
  }

  onSubmit(form: NgForm, gigID: string): void {

 // this.gigService.calcPrice(form.value.gigPrice,form.value.gigSeats,gigID)

 this.driverSubmittedTotalPrice = form.value.gigPrice;
 this.driverSubmittedGigSeats = form.value.gigSeats
 this.gigCostPerPunter = (form.value.gigPrice / form.value.gigSeats)
 console.log('new cost ' + this.gigCostPerPunter );

 this.gigsFiltered = this.gigs.filter(i => i.id == gigID)

 this.gigsFiltered.map(gig => { 
                                this.gigCurrentCostPerPunter = gig.gigRunningCostPerPunter   
});
 
 if( (this.gigCurrentCostPerPunter == 0) || 
     (this.gigCurrentCostPerPunter > this.gigCostPerPunter)  ) { 

      this.isBestPrice = true;
      console.log('this.isBestPrice = ' + this.isBestPrice);
      console.log('current price  ' + this.gigCurrentCostPerPunter )
      console.log('new cost ' + this.gigCostPerPunter );

 }
 else{
  this.isBestPrice = false;
 } 


 const dailogRef =  this.dialog.open(GigPriceConfirmationComponent,{
  data: {
         isBestPrice: this.isBestPrice,
         gigCostPerPunter: this.gigCostPerPunter,
         gigCurrentCostPerPunter: this.gigCurrentCostPerPunter
        }
    } );

    dailogRef.afterClosed().subscribe(result => {
      this.outcome = result;
    //  updateGigwithDriver(gigID: string, driverUserID: string, totalCost: number  , costPerPunter: number )
    console.log('The dialog was closed ' + typeof(this.outcome));

    if (this.outcome === true) { 
     
      console.log('gigCurrentCostPerPunter ' + this.gigCostPerPunter ) 
      console.log('form.value.gigPrice' + form.value.gigPrice);
      this.gigService.updateGigWithDriver(gigID, 
                                          this.driverUserID,
                                          this.driverSubmittedTotalPrice, 
                                          this.gigCostPerPunter,
                                          this.driverSubmittedGigSeats 
                                           )

    }

    })

 

  }


 
}

