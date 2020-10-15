import { Component, OnInit } from '@angular/core';
import { GigService } from '../gig.service';
import { Subscription } from 'rxjs';
import { Gigs } from '../gig.model';
import { NgForm } from '@angular/forms/forms';

@Component({
  selector: 'app-gig-add',
  templateUrl: './gig-add.component.html',
  styleUrls: ['./gig-add.component.css']
})
export class GigAddComponent implements OnInit {
  private  gigMapArray: Gigs;

  constructor(
    private gigService: GigService,
  ) { }

  ngOnInit(): void {
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

      };

    this.gigService.addGig(this.gigMapArray);
  //   this.uiService.showSnackbar('Gig added', null, 3000);
    form.resetForm();
  }

  Reset(form: NgForm): void {
    form.resetForm();
  }
}
