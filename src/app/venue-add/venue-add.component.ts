import { Component, OnInit } from '@angular/core';
import { GigService } from '../gig.service';
import { UIService } from '../ui.service';
import { Subscription } from 'rxjs';
import { Venues } from '../venue.model';
import { NgForm } from '@angular/forms/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-venue',
  templateUrl: './venue-add.component.html',
  styleUrls: ['./venue-add.component.css']
})
export class AddVenueComponent implements OnInit {
  private  venueMapArray: Venues;

  constructor(

    private gigService: GigService,
    private uiService: UIService,
    private router: Router)
    { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm): void {

     this.venueMapArray = {

      venueName: form.value.venueName,
      venueCity: form.value.venueCity,
      venuePostCode: form.value.venuePostCode

      };

     this.gigService.addVenue(this.venueMapArray);
     this.uiService.showSnackbar('Venue added', null, 3000);
     form.resetForm();
     this.router.navigate(['/track']);
  }

  Reset(form: NgForm): void {
    form.resetForm();
  }

}







