import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, Subscription } from 'rxjs';
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
      type: form.value.userType

    });

  }

  ngOnDestroy(): void {
    if (this.loadingSub ) {
      this.loadingSub.unsubscribe();
    }
  }
}
