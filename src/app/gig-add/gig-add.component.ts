import { Component, OnInit, OnDestroy } from '@angular/core';
import { GigService } from '../gig.service';
import { UIService } from '../ui.service';
import { Subscription } from 'rxjs';
import { Gigs } from '../gig.model';
import { Venues } from '../venue.model';
import { NgForm } from '@angular/forms/forms';

///
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {ElementRef, ViewChild} from '@angular/core'; // ? Component
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
///

@Component({
  selector: 'app-gig-add',
  templateUrl: './gig-add.component.html',
  styleUrls: ['./gig-add.component.css']
})



export class GigAddComponent implements OnInit {
  private gigMapArray: Gigs;
  venues: Venues[];
  private venuesSubscription: Subscription;


///
visible = true;
selectable = true;
removable = true;
separatorKeysCodes: number[] = [ENTER, COMMA];
genreCtrl = new FormControl();
filteredGenres: Observable<string[]>;
Genres: string[] = [];
allGenres: string[] = ['Hip-Hop', 'Funk', 'Soul', 'House', 'Techno'];

@ViewChild('genresInput') genresInput: ElementRef<HTMLInputElement>;
@ViewChild('auto') matAutocomplete: MatAutocomplete;

///

  constructor(
    private gigService: GigService,
    private uiService: UIService
    )
  {
///

  this.filteredGenres = this.genreCtrl.valueChanges.pipe(
  startWith(null),
  map((genre: string | null) => genre ? this._filter(genre) : this.allGenres.slice()));

///

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Genre
    if ((value || '').trim()) {
      this.Genres.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.genreCtrl.setValue(null);
  }

  remove(genre: string): void {
    const index = this.Genres.indexOf(genre);

    if (index >= 0) {
      this.Genres.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Genres.push(event.option.viewValue);
    this.genresInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(genres => genres.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {

    this.venuesSubscription = this.gigService.venuesChanged.subscribe(
      venues => ( this.venues = venues )
    );

    this.gigService.fetchVenues();
   // this.venues.map((el) => el.venueName)

  }

  onSubmit(form: NgForm): void {

    this.gigMapArray = {
      gigArtistName: form.value.gigArtistName,
      gigDate: form.value.gigDate,
      gigDescription: form.value.gigDescription,
      gigVenueName: form.value.gigVenueName,
      gigPunterCount: 0,
      gigRunningCostPerPunter: form.value.gigTotalPrice,
      gigTotalPrice: form.value.gigTotalPrice,
      gigGenre: form.value.gigGenre,

      };

    console.log(this.gigMapArray.gigArtistName);
    this.gigService.addGig(this.gigMapArray);
    this.uiService.showSnackbar('Gig added', null, 3000);
    form.resetForm();
  }

  Reset(form: NgForm): void {
    form.resetForm();
  }

  OnDestroy(): void {
    this.venuesSubscription.unsubscribe;
  }

}

