import { Pipe, PipeTransform } from '@angular/core'
import { Gigs } from './gig.model';


@Pipe({
  name: 'SearchPipe',
  pure: true
})


export class SearchPipe implements PipeTransform {

  valueForReturning: Gigs[];
  calledAlready: boolean;


transform(value: Gigs[], search: Gigs): Gigs[] {

 

    if (value === undefined || search === undefined) {
         return value;
      }



    if(( search.gigGenre === '' || search.gigGenre == undefined ) 
         && (search.gigVenue.venueCity !== undefined)) { 
         value = value.filter(i => i.gigVenue.venueCity == search.gigVenue.venueCity)
         
         return value;
        }

    if(( search.gigVenue.venueCity === '' || search.gigVenue.venueCity == undefined ) 
          && (search.gigGenre !== undefined)) { 
         value = value.filter(i => i.gigGenre == search.gigGenre)

         return value;
        }

    if(( search.gigVenue.venueCity !== undefined) && (search.gigGenre !== undefined) ) {
         value = value.filter(i => i.gigVenue.venueCity == search.gigVenue.venueCity
                                && i.gigGenre == search.gigGenre)

         return value;        
        }


  
    return value 
   
  }
  
}
