import { Component,  OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GigService } from '../gig.service';
import { Gigs } from '../gig.model';

@Component({

    selector: 'app-gig-mine',
    templateUrl: './gig-mine.component.html',
    styleUrls: ['./gig-mine.component.css']

  })

  export class GigMineComponent implements OnInit, OnDestroy {

  constructor(
              private gigService: GigService )  { }



   private GigSubscription: Subscription;
   filteredGigs: Gigs[];
   currentGig: Gigs;
   Number: number;
   Determinate: number;


    ngOnInit(): void {

      this.GigSubscription = this.gigService.filteredGigsChanged.subscribe(
        filteredGigs => { this.filteredGigs = filteredGigs;
        });
      this.gigService.fetchGigsForCurrentUser();

    //  this.Number = 9;
     // this.Determinate = 0;
    }

    deleteGig(id): void {

      this.gigService.deleteGigForPunter(id);

      this.currentGig = this.filteredGigs.find(ex => ex.id === id);

      this.gigService.gigRoleBackGigNumbers(this.currentGig.gigID,
                                           this.currentGig.gigPunterCount,
                                           this.currentGig.gigTotalPrice);
      

     

    }

    ngOnDestroy( ): void {
        this.GigSubscription.unsubscribe();
    }

  }
