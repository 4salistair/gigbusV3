import { Component, OnInit } from '@angular/core';



import { GigService } from '../gig.service';
import { UIService } from '../ui.service';
import { from, Subscription } from 'rxjs';
import { Gigs } from '../gig.model';
import { Venues } from '../venue.model';
import { NgForm } from '@angular/forms/forms';


import { Subject } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  venues: Venues[];
  private venuesSubscription: Subscription;
  private gigSearchArray: Gigs;

  gigName: string;

  searchTerm$ = new Subject<string>();



  constructor(
    private gigService: GigService,
    private uiService: UIService,


    ) {



     }

  ngOnInit(): void {
    this.venuesSubscription = this.gigService.venuesChanged.subscribe(
      venues => ( this.venues = venues )
    );
    this.gigService.fetchVenues();
  }
  onSubmit(form: NgForm): void {

    
    this.gigService.fetchGigs();

    this.gigName = form.value.gigArtistName;


    this.gigSearchArray = {
      gigArtistName: form.value.gigArtistName,
      gigGenre: form.value.gigGenre,
      gigVenue:  {venueCity: form.value.venueCity},
      gigDate: form.value.gigDate
      };

    this.gigService.searchforGigs(this.gigSearchArray);

  }

  searchPass(value: string): void {

    console.log('value ' + value);
    this.gigService.searchValues(value);
  }

  // searchGig(): void {
  //   this.gigService.searchforGigs(this.gigSearchArray);
  //   console.log(this.gigSearchArray.gigArtistName);
  //   // console.log('Search' +  this.gigSearchArray.map(el => {console.log(el.gigArtistName); } ));
  // }

}
