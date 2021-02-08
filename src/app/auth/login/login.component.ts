import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms/';
import { AuthService } from '../auth.service';
import { UIService } from '../../ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;
  isLoading$: Observable<boolean>;

  private currentUser: Subscription;

  constructor( private authServices: AuthService,
               private uiService: UIService
            ) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChange.subscribe( 
      isLoading => this.isLoading = isLoading);
    


    this.loginForm = new FormGroup({
      email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required]
    })

    });
  }

  onSubmit(form: NgForm): void {
    this.authServices.login({
    email: form.value.email,
    password: form.value.password
  });

}




ngOnDestroy(): void {
  this.loadingSubs.unsubscribe();
  this.authServices.addUserType()




}





}
