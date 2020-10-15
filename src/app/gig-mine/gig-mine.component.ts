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
   Number: number;
   Determinate: number;


    ngOnInit(): void {

      this.GigSubscription = this.gigService.filteredGigsChanged.subscribe(

        filteredGigs => { this.filteredGigs = filteredGigs;
        });
      this.gigService.fetchGigsForCurrentUser();

      this.Number = 9;
     // this.Determinate = 0;
    }

    deleteGig(id): void {
      this.gigService.deleteGigForPunter(id);

    }

    ngOnDestroy( ): void {
        this.GigSubscription.unsubscribe();
    }

  }
