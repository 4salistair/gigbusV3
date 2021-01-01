import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs/';
import { map } from 'rxjs/operators';

import { Gigs } from './gig.model';
import { Venues } from './venue.model';
import { AuthService } from 'src/app/auth/auth.service';
import { analytics } from 'firebase';

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

  private searchGigs: Gigs[];
  searchGigsChanged = new Subject <Gigs>();

  searchArtistNameChanged = new Subject <string>();

  lookUpValueInDocChange = new Subject <any>();

  userID: string;
  authSubscription: Subscription;

  private incrementGigs: Gigs;
  private punterGigs: Gigs;
  private runningGigs: Gigs;

    // //
    searchTermViaService = new Subject<string>();
    @Output() searchTerm: EventEmitter<string> = new EventEmitter();
    // //

    //
    returnedItem: any;
    //



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
      gigGenre: doc.payload.doc.data()['gigGenre'],
      gigVenue: doc.payload.doc.data()['gigVenue'],
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

searchforGigs(gig: Gigs): void {
  this.searchGigsChanged.next(gig);
}

  searchValues(artistName: string ): void{
    this.searchArtistNameChanged.next(artistName);
  }

}

// lookUpValueInDoc(collectName: string, documentID: string, fieldName: string ): void {

//   const filter = this.db.doc(collectName + '/' + documentID);

//   filter
//    .snapshotChanges()
//    .pipe(map(docData => {
//     return docData.payload.data()[fieldName]; }
//     )
//     )
//     .subscribe( ( returnedItem: any) => {
//              this.returnedItem =  returnedItem;
//              console.log('venue in function' + this.returnedItem);
//              this.db.collection(collectName + '/' + documentID).add(this.returnedItem);
//             // this.lookUpValueInDocChange.next([...this.returnedItem]);
//              }
//             );

             

//         }
//  // return this.returnedItem;


// fetchVenueForCurrentGig(VenueID: string): void {

//   // this.authServices.getUserID();
 
 
//    const filter = this.db.doc('venues' + '/' + VenueID);
 
//    this.db
//    .collection('venues' + '/' + VenueID)
//    .snapshotChanges()
//    .pipe(map(docData => {
//      return docData.map(doc => {
//      return {
//        id: doc.payload.doc.id,
//        venueCity: doc.payload.doc.data()['venueCity'],
//        venueName: doc.payload.doc.data()['venueName'],
//        venuePostCode: doc.payload.doc.data()['venuePostCode'],
//        };
//      });
//     })
//    )
//    .subscribe((venue: Venues[]) => {
//      this.availableVenues =  venue;
//      this.venuesChanged.next([...this.availableVenues]);
//      });
 
//   }