import { Pipe, PipeTransform } from '@angular/core';
import { Gigs } from './gig.model';


@Pipe({
  name: 'SearchPipe'
})


export class SearchPipe implements PipeTransform {

  transform(value: Gigs[], artistName: string ): Gigs[] {
  // console.log(.map(=>{} ));
  console.log(artistName);

    // if (value === usearchFilterndefined || filteredGigs === undefined ) {
    //   return value;
    //   }


   // for (const ItemFromValue of value) {
     //   for (const ItemFilteredGig of filteredGigs) {

//              if (ItemFromValue.gigArtistName === 'New Order') {
//                console.log('Elbow');
//                 //   value.splice(value.map((el) => el.gigArtistName).indexOf(ItemFromValue.gigArtistName), 1);
//              }
//      //  }
//  }

    return value;
  }

}
