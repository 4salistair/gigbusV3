import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs/';
import { map } from 'rxjs/operators';

import { Gigs } from './gig.model';
import { Venues } from './venue.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class GigService {

  private availableGigs: Gigs[] = [];
  gigsChanged = new Subject<Gigs[]>();

  private availableVenues: Venues[] = [];
  venuesChanged = new Subject<Venues[]>();

  private filteredGigs: Gigs[] = [];
  filteredGigsChanged = new Subject<Gigs[]>();
  userID: string;
  authSubscription: Subscription;

  private incrementGigs: Gigs;
  private punterGigs: Gigs;
  private runningGigs: Gigs;


constructor(private db: AngularFirestore,
            private authServices: AuthService,
           ) { }

addGig(gig: Gigs): void {
      this.db.collection('gigs').add(gig);
  }

addVenue(venue: Venues): void {
      this.db.collection('venues').add(venue);
}

fetchGigs(): void {
  this.db
  .collection('gigs')
  .snapshotChanges()
  .pipe(map(docData => {
    return docData.map(doc => {
    return {
      id: doc.payload.doc.id,
      gigArtistName: doc.payload.doc.data()['gigArtistName'],
      gigDescription: doc.payload.doc.data()['gigDescription'],
      gigVenueName: doc.payload.doc.data()['gigVenueName'],
      gigDate: doc.payload.doc.data()['gigDate'],
      gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
      gigRunningCostPerPunter: doc.payload.doc.data()['gigRunningCostPerPunter'],
      gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
      gigID: doc.payload.doc.id
      };
    });
   })
  )
  .subscribe((Gig: Gigs[]) => {
    this.availableGigs =  Gig;
    this.gigsChanged.next([...this.availableGigs]);
    });
}


fetchVenues(): void {
  this.db
  .collection('venues')
  .snapshotChanges()
  .pipe(map(docData => {
    return docData.map(doc => {
    return {
      id: doc.payload.doc.id,
      venueCity: doc.payload.doc.data()['venueCity'],
      venueName: doc.payload.doc.data()['venueName'],
      venuePostCode: doc.payload.doc.data()['venuePostCode'],
      };
    });
   })
  )
  .subscribe((venue: Venues[]) => {
    this.availableVenues =  venue;
    this.venuesChanged.next([...this.availableVenues]);
    });
}




    fetchGigsForCurrentUser(): void {

      this.authServices.getUserID();

      this.authSubscription = this.authServices.currentUser.subscribe(
         userID => {(userID = userID);
                    this.userID = userID;
                    const filter = this.db.collection('puntersGigs', ref => ref.where('userid', '==', userID ));

                    filter
      .snapshotChanges()
      .pipe(map(docData => {
       return docData.map(doc => {
        return {
           id: doc.payload.doc.id,
           gigArtistName: doc.payload.doc.data()['gigArtistName'],
           gigDescription: doc.payload.doc.data()['gigDescription'],
           gigVenueName: doc.payload.doc.data()['gigVenueName'],
           gigDate: doc.payload.doc.data()['gigDate'],
           gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
           gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
           giguserID: doc.payload.doc.data()['userid'],
           gigID: doc.payload.doc.data()['gigID'],
           gigRunningCostPerPunter: doc.payload.doc.data()['gigRunningCostPerPunter']
           };
         });
       })
       )
       .subscribe((filteredGigs: Gigs[]) => {
       this.filteredGigs =  filteredGigs;
       this.filteredGigsChanged.next([...this.filteredGigs]);
       });
     });
  }


totalPunterIncrement(gigID: string): void {

  this.incrementGigs = this.availableGigs.find(ex => ex.id === gigID);
  const punterCount = this.incrementGigs.gigPunterCount ++;

  this.db.collection('gigs')
    .doc(gigID)
    .set({ gigPunterCount: punterCount }, { merge: true });

}

puntersGigs(gigID: string): void {

  this.punterGigs = this.availableGigs.find(ex => ex.id === gigID);

  this.authServices.getUserID();
  this.authSubscription = this.authServices.currentUser.subscribe(
  userID => {(userID = userID);
             this.userID = userID;
            });


  if (this.userID) {
                    this.db.collection('puntersGigs').add({
                    ...this.punterGigs,
                    userid: this.userID
                    });
                  }

  }

runningCostDecrement(gigID: string): void {

  this.runningGigs = this.availableGigs.find(ex => ex.id === gigID);
  const runningCost = this.runningGigs.gigTotalPrice / this.runningGigs.gigPunterCount ;

  this.db.collection('gigs')
    .doc(gigID)
    .set({ gigRunningCostPerPunter: runningCost }, { merge: true });

}

deleteGigForPunter(id: string): void {

  this.db.collection('puntersGigs').doc(id).delete();
}

}
