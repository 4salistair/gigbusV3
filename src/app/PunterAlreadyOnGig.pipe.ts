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


transform( value: Gigs[], filteredGigs: Gigs[] ): Gigs[] {



    if (value === undefined || filteredGigs === undefined) {
        return value;
        }


    for (const ItemFromValue of value) {
             for (const ItemFilteredGig of filteredGigs) {

                  if (ItemFromValue.id === ItemFilteredGig.gigID) {
                       value.splice(value.map((el) => el.gigArtistName).indexOf(ItemFromValue.gigArtistName), 1);
                  }
            }
      }

    return value;

    }
  }
