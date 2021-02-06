import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
// import { UIService } from 'src/app/shared/ui.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingSub: Subscription;

  constructor(private authService: AuthService, ) { }

  ngOnInit(): void {

    // this.loadingSub = this.uiService.loadingStateChagne
    // .subscribe(isLoading => this.isLoading = isLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm): void  {

     this.authService.registerUser({

      email: form.value.email,
      password: form.value.password,

    });

  }

  ngOnDestroy(): void {
    if (this.loadingSub ) {
      this.loadingSub.unsubscribe();
    }
  }
}
