import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs/';
import { map } from 'rxjs/operators';

import { Gigs } from './gig.model';
import { Venues } from './venue.model';
import { AuthService } from 'src/app/auth/auth.service';
import { analytics } from 'firebase';
import { identifierModuleUrl, IfStmt } from '@angular/compiler';
import { UIService } from './ui.service'

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
  private updateDriverGigs: Gigs; 
  private punterGigs: Gigs;
  private runningGigs: Gigs;
  private runningPricingGig: Gigs; 

    // //
    searchTermViaService = new Subject<string>();
    @Output() searchTerm: EventEmitter<string> = new EventEmitter();
    // //

    //
    returnedItem: any;
    //



constructor(private db: AngularFirestore,
            private authServices: AuthService,
            private uiservice: UIService
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
      gigBusSeatCapacity: doc.payload.doc.data()['gigBusSeatCapacity'],
      gigID: doc.payload.doc.id,
      gigDriverUserID: doc.payload.doc.data()['gigDriverUserID'],
      gigPromoterUserID: doc.payload.doc.data()['gigPromoterUserID']
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
    this.uiservice.loadingStateChange.next(false);
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
           gigVenue: doc.payload.doc.data()['gigVenue'],
           gigDate: doc.payload.doc.data()['gigDate'],
           gigTotalPrice: doc.payload.doc.data()['gigTotalPrice'],
           gigPunterCount: doc.payload.doc.data()['gigPunterCount'],
           giguserID: doc.payload.doc.data()['userid'],
           gigID: doc.payload.doc.data()['gigID'],
           gigRunningCostPerPunter: doc.payload.doc.data()['gigRunningCostPerPunter'],
           gigBusSeatCapacity: doc.payload.doc.data()['gigBusSeatCapacity'],
           gigDriverUserID: doc.payload.doc.data()['gigDriverUserID'],
           gigPromoterUserID: doc.payload.doc.data()['gigPromoterUserID']
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


  //  this.gigService.runningCostDecrement(gigID);
  totalPunterIncrementandRunningCostDecrement(gigID: string): void {

  this.incrementGigs = this.availableGigs.find(ex => ex.id === gigID);
  const punterCount = this.incrementGigs.gigPunterCount + 1;
  const runningCost = (this.incrementGigs.gigTotalPrice) / ( punterCount );

  console.log("runningCost_" + runningCost)
  this.db.collection('gigs')
    .doc(gigID)
    .set({ gigPunterCount: punterCount }, { merge: true },
      );

  this.db.collection('gigs')
      .doc(gigID)
      .set({ gigRunningCostPerPunter: runningCost }, { merge: true });


    this.runningGigs = this.availableGigs.find(ex => ex.id === gigID);



   this.db.collection('puntersGigs',ref => ref.where('gigID', '==', gigID ))
   .get()
   .toPromise()
   .then(
    snapshots => {
      if (snapshots.size > 0) {
        snapshots.forEach(orderItem => {
          this.db.collection('puntersGigs').doc(orderItem.id).update({ gigPunterCount: punterCount,
                                                                       gigRunningCostPerPunter: runningCost })
        })
      }
    }
   )

}


updateGigWithDriver(gigID: string, driverUserID: string, totalCost: number , costPerPunter: number, BusSeatCapacity: number): void {

  this.updateDriverGigs = this.availableGigs.find(ex => ex.id === gigID);


  this.db.collection('gigs')
    .doc(gigID)
    .set({ gigBestPricePerPunter: costPerPunter,
           gigRunningCostPerPunter: totalCost,
           gigTotalPrice: totalCost,
           gigDriverUserID: driverUserID,
           gigBusSeatCapacity: BusSeatCapacity
           

    }, { merge: true } 
    );

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
                    }).then(res => { 
                      this.updateDocId(res.id);  

                    });
                  }

  }


updateDocId(id){

  return this.db
  .collection('puntersGigs')
  .doc(id)
  .set({ id: id }, { merge: true })

}  


deleteGigForPunter(id: string): void {
  this.db.collection('puntersGigs').doc(id).delete();
}

gigRoleBackGigNumbers(gigID: string, punterCount: number, TotalCost: number){

  punterCount = punterCount -1;
  const runningCost = (TotalCost / punterCount)

  this.db.collection('gigs').doc(gigID).update({ gigPunterCount: punterCount,
                                                 gigRunningCostPerPunter: runningCost });

  }

searchforGigs(gig: Gigs): void {
  this.searchGigsChanged.next(gig);
}

  searchValues(artistName: string ): void{
    this.searchArtistNameChanged.next(artistName);
  }


  calcPrice(price: number,seats: number, gigID: string) {

    this.runningPricingGig = this.availableGigs.find(ex => ex.id === gigID);

  

    console.log(( price / seats) );

    if(this.runningPricingGig.gigRunningCostPerPunter > ( price / seats) ) {

      console.log('new low price... therefore!!!!');

    }
  
  }

}


// runningCostDecrement(gigID: string): void {

//   this.runningGigs = this.availableGigs.find(ex => ex.id === gigID);
//   const runningCost = this.runningGigs.gigTotalPrice / this.runningGigs.gigPunterCount ;

//   this.db.collection('gigs')
//     .doc(gigID)
//     .set({ gigRunningCostPerPunter: runningCost }, { merge: true });

// }
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