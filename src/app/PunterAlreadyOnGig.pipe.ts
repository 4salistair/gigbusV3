import { Pipe, PipeTransform } from '@angular/core';
import { Gigs } from './gig.model';

@Pipe({
      name: 'PunterAlreadyOnGig',
      pure: true
})

 export class PunterAlreadyOnGig implements PipeTransform {

 count: number;
 resultArray: Gigs[];
 gigDataPush: Gigs[];
    transform( value: Gigs[], filteredGigs: Gigs[], searchGigs: Gigs ): Gigs[] {

    if (value === undefined || filteredGigs === undefined ) {
        return value;
        }

        console.log(searchGigs.gigArtistName);

    for (const ItemFromValue of value) {
             for (const ItemFilteredGig of filteredGigs) {

                  if (ItemFromValue.id === ItemFilteredGig.gigID) {
                       value.splice(value.map((el) => el.gigArtistName).indexOf(ItemFromValue.gigArtistName), 1);
                  }
            }
      }

    

      for (const ItemFromValue of value) {

                 if (ItemFromValue.gigArtistName.search(searchGigs.gigArtistName) == -1) {
                    value.splice(value.map((el) => el.gigArtistName).indexOf(ItemFromValue.gigArtistName), 1);
                 }

           
      }


    return value;

    }
  }
